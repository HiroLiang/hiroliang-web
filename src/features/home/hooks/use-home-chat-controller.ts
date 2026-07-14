import { type FormEvent, type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

import { HOME_COMMANDS, formatHomeCommand } from '@/features/home/data/home-commands'
import { useHomeIntroMessage } from '@/features/home/hooks/use-home-intro-message'
import { useHomePanelController } from '@/features/home/hooks/use-home-panel-controller'
import { useScrollToBottom } from '@/features/home/hooks/use-scroll-to-bottom'
import { useStreamingComposerText } from '@/features/home/hooks/use-streaming-composer-text'
import type { HomeChatController } from '@/features/home/models/home-chat-controller'
import { createMessage } from '@/features/home/services/chat-message.service'
import { createChatStreamRequest, streamChatReply } from '@/features/home/services/chat-stream.service'
import { getHomeCommand } from '@/features/home/services/home-command.service'
import type { HomeCommand } from '@/features/home/types'
import { useMessages } from '@/hooks/use-locale'

export function useHomeChatController(): HomeChatController {
  const t = useMessages()
  const [inputValue, setInputValue] = useState('')
  const { isIntroStreaming, messages, restartIntroMessage, setMessages } = useHomeIntroMessage(
    t.home.chat.introMessage,
  )
  const {
    activePanel,
    closeActivePanel,
    openPanel,
    panelPhase,
    panelResetToken,
    requestPanelReset,
    resetPanelState,
  } = useHomePanelController()
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCommandMenuDismissed, setIsCommandMenuDismissed] = useState(false)
  const [highlightedCommandIndex, setHighlightedCommandIndex] = useState(0)
  const scrollViewportRef = useRef<HTMLDivElement | null>(null)
  const sessionIdRef = useRef(crypto.randomUUID())
  const isComposingRef = useRef(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const filteredCommands = useMemo(() => {
    if (!inputValue.startsWith('/')) {
      return []
    }

    const query = inputValue.slice(1).trim().toLowerCase()
    if (!query) {
      return [...HOME_COMMANDS]
    }

    return HOME_COMMANDS.filter((command) => command.startsWith(query))
  }, [inputValue])

  const isCommandMenuOpen = inputValue.startsWith('/') && !isCommandMenuDismissed && filteredCommands.length > 0
  const isAnyStreaming = isStreaming || isIntroStreaming
  const streamingComposerText = useStreamingComposerText(isAnyStreaming)
  const lastMessage = messages.at(-1)
  const scrollDependencyKey = [
    activePanel ?? 'none',
    isStreaming,
    lastMessage?.id ?? 'none',
    lastMessage?.content.length ?? 0,
    messages.length,
    panelPhase,
    panelResetToken,
  ].join(':')

  useScrollToBottom(scrollViewportRef, scrollDependencyKey)

  useEffect(() => {
    if (!isCommandMenuOpen) {
      setHighlightedCommandIndex(0)
      return
    }

    setHighlightedCommandIndex((current) => {
      if (current < filteredCommands.length) {
        return current
      }

      return 0
    })
  }, [filteredCommands, isCommandMenuOpen])

  function resetToIntroState() {
    resetPanelState()
    restartIntroMessage()
  }

  function resetComposer() {
    setInputValue('')
    setIsCommandMenuDismissed(false)
    setHighlightedCommandIndex(0)
  }

  function focusComposer() {
    window.requestAnimationFrame(() => {
      textareaRef.current?.focus()
    })
  }

  function applyCommandSelection(command: HomeCommand) {
    setInputValue(formatHomeCommand(command))
    setIsCommandMenuDismissed(true)
    setHighlightedCommandIndex(0)

    focusComposer()
  }

  async function sendMessage(content: string) {
    const userMessage = createMessage('user', content)
    const assistantMessage = createMessage('assistant', '', 'streaming')

    setMessages((current) => [...current, userMessage, assistantMessage])
    setIsStreaming(true)

    try {
      let hasReply = false
      let lastReply = ''

      for await (const partial of streamChatReply(createChatStreamRequest(content, sessionIdRef.current))) {
        hasReply = true
        lastReply = partial
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? {
                  ...message,
                  content: partial,
                  status: 'streaming',
                }
              : message,
          ),
        )
      }

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: hasReply ? lastReply : t.home.chat.errorFallback,
                status: hasReply ? 'idle' : 'error',
              }
            : message,
        ),
      )
    } catch (error) {
      console.error('Homepage chat stream failed:', error)
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: t.home.chat.errorFallback,
                status: 'error',
              }
            : message,
        ),
      )
    } finally {
      setIsStreaming(false)
      focusComposer()
    }
  }

  async function submitCurrentValue() {
    const nextValue = inputValue.trim()
    if (!nextValue) {
      return
    }

    const command = getHomeCommand(nextValue)
    resetComposer()

    if (command) {
      if (command === 'clean') {
        resetToIntroState()
        return
      }

      if (command === 'projects') {
        requestPanelReset()
      }

      openPanel(command)
      return
    }

    if (nextValue.startsWith('/')) {
      setMessages((current) => [...current, createMessage('assistant', t.home.chat.unknownCommand, 'error')])
      return
    }

    await closeActivePanel()
    await sendMessage(nextValue)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitCurrentValue()
  }

  async function handleTextareaKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.nativeEvent.isComposing ||
      isComposingRef.current ||
      ('keyCode' in event && event.keyCode === 229)
    ) {
      return
    }

    if (event.key === 'ArrowDown' && isCommandMenuOpen) {
      event.preventDefault()
      setHighlightedCommandIndex((current) => (current + 1) % filteredCommands.length)
      return
    }

    if (event.key === 'ArrowUp' && isCommandMenuOpen) {
      event.preventDefault()
      setHighlightedCommandIndex((current) => (current - 1 + filteredCommands.length) % filteredCommands.length)
      return
    }

    if (event.key === 'Escape' && isCommandMenuOpen) {
      event.preventDefault()
      setIsCommandMenuDismissed(true)
      setHighlightedCommandIndex(0)
      return
    }

    if (event.key !== 'Enter' || event.shiftKey) {
      return
    }

    event.preventDefault()

    if (isCommandMenuOpen) {
      const highlightedCommand = filteredCommands[highlightedCommandIndex]
      if (highlightedCommand) {
        const formattedCommand = formatHomeCommand(highlightedCommand)
        if (inputValue.trim() !== formattedCommand) {
          applyCommandSelection(highlightedCommand)
          return
        }
      }
    }

    await submitCurrentValue()
  }

  return {
    activePanel,
    applyCommandSelection,
    filteredCommands,
    handleComposerChange: (value: string) => {
      setInputValue(value)
      setIsCommandMenuDismissed(false)
    },
    handleCompositionEnd: () => {
      isComposingRef.current = false
    },
    handleCompositionStart: () => {
      isComposingRef.current = true
    },
    handleSubmit,
    handleTextareaKeyDown,
    highlightedCommandIndex,
    inputValue,
    isAnyStreaming,
    isCommandMenuOpen,
    messages,
    panelPhase,
    panelResetToken,
    scrollViewportRef,
    setHighlightedCommandIndex,
    streamingComposerText,
    textareaRef,
  }
}
