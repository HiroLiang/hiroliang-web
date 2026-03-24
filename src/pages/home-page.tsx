import { type FormEvent, type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { createChatStreamRequest, streamChatReply } from '@/features/home/api'
import { HOME_COMMANDS, formatHomeCommand } from '@/features/home/commands'
import { HomePanelContent } from '@/features/home/components'
import type { ChatMessage, HomeCommand, HomePanelType, PanelPhase } from '@/features/home/types'
import { useMessages } from '@/hooks/use-locale'

const PANEL_TRANSITION_MS = 260
const INTRO_MIN_STREAM_DELAY_MS = 12
const INTRO_MAX_STREAM_DELAY_MS = 34
const STREAMING_BUILDUP_FRAMES = ['loadin', 'loading', 'loading.', 'loading..', 'loading...'] as const

function createMessage(role: ChatMessage['role'], content: string, status: ChatMessage['status'] = 'idle'): ChatMessage {
  return {
    content,
    id: crypto.randomUUID(),
    role,
    status,
  }
}

function getCommand(input: string): HomeCommand | null {
  const firstToken = input.trim().split(/\s+/)[0]

  if (!firstToken.startsWith('/')) {
    return null
  }

  const command = firstToken.slice(1)

  return HOME_COMMANDS.find((item) => item === command) ?? null
}

function bubbleClassName(role: ChatMessage['role'], status: ChatMessage['status']) {
  if (role === 'user') {
    return 'ml-auto border border-accent/40 bg-accent/90 text-accent-foreground'
  }

  if (status === 'error') {
    return 'mr-auto border border-destructive/40 bg-destructive/10 text-foreground'
  }

  return 'mr-auto border border-border/70 bg-secondary/80 text-foreground'
}

function getTypingDelay(character: string) {
  if (character === ' ' || character === '\n') {
    return 8
  }

  if ([',', '.', '!', '?'].includes(character)) {
    return 46
  }

  return INTRO_MIN_STREAM_DELAY_MS + Math.floor(Math.random() * (INTRO_MAX_STREAM_DELAY_MS - INTRO_MIN_STREAM_DELAY_MS + 1))
}

export function HomePage() {
  const t = useMessages()
  const [inputValue, setInputValue] = useState('')
  const [introSeed, setIntroSeed] = useState(0)
  const introMessageIdRef = useRef(crypto.randomUUID())
  const [messages, setMessages] = useState<ChatMessage[]>(() => [])
  const [activePanel, setActivePanel] = useState<HomePanelType | null>(null)
  const [panelPhase, setPanelPhase] = useState<PanelPhase>('idle')
  const [panelResetToken, setPanelResetToken] = useState(0)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingComposerText, setStreamingComposerText] = useState('')
  const [isCommandMenuDismissed, setIsCommandMenuDismissed] = useState(false)
  const [highlightedCommandIndex, setHighlightedCommandIndex] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const scrollViewportRef = useRef<HTMLDivElement | null>(null)
  const sessionIdRef = useRef(crypto.randomUUID())
  const isComposingRef = useRef(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const panelTransitionTargetRef = useRef<HomePanelType | null>(null)

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
  const isIntroStreaming = messages.some(
    (message) => message.id === introMessageIdRef.current && message.status === 'streaming',
  )
  const isAnyStreaming = isStreaming || isIntroStreaming

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const nextIntroId = crypto.randomUUID()
    introMessageIdRef.current = nextIntroId

    setMessages([
      {
        content: '',
        id: nextIntroId,
        role: 'assistant',
        status: 'streaming',
      },
    ])

    let cancelled = false

    async function streamIntro() {
      const fullText = t.home.chat.introMessage

      for (let index = 1; index <= fullText.length; index += 1) {
        if (cancelled) {
          return
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, getTypingDelay(fullText[index - 1] ?? ''))
        })

        setMessages((current) =>
          current.map((message) =>
            message.id === introMessageIdRef.current
              ? {
                  ...message,
                  content: fullText.slice(0, index),
                  status: index === fullText.length ? 'idle' : 'streaming',
                }
              : message,
          ),
        )
      }
    }

    void streamIntro()

    return () => {
      cancelled = true
    }
  }, [introSeed, t.home.chat.introMessage])

  useEffect(() => {
    if (!isAnyStreaming) {
      setStreamingComposerText('')
      return
    }

    let cancelled = false

    async function runStreamingComposer() {
      for (const frame of STREAMING_BUILDUP_FRAMES) {
        if (cancelled) {
          return
        }

        setStreamingComposerText(frame)

        await new Promise((resolve) => {
          window.setTimeout(resolve, 130)
        })
      }

      while (!cancelled) {
        const randomFrame =
          STREAMING_BUILDUP_FRAMES[1 + Math.floor(Math.random() * (STREAMING_BUILDUP_FRAMES.length - 1))]

        setStreamingComposerText(randomFrame)

        await new Promise((resolve) => {
          window.setTimeout(resolve, 150 + Math.floor(Math.random() * 180))
        })
      }
    }

    void runStreamingComposer()

    return () => {
      cancelled = true
    }
  }, [isAnyStreaming])

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

  useEffect(() => {
    const viewport = scrollViewportRef.current
    if (!viewport) {
      return
    }

    viewport.scrollTo({
      behavior: 'smooth',
      top: viewport.scrollHeight,
    })
  }, [activePanel, isStreaming, messages, panelPhase, panelResetToken])

  function schedulePanelIdle() {
    timeoutRef.current = window.setTimeout(() => {
      setPanelPhase('idle')
      timeoutRef.current = null
    }, PANEL_TRANSITION_MS)
  }

  function openPanel(panel: HomePanelType) {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    panelTransitionTargetRef.current = panel

    if (!activePanel) {
      setActivePanel(panel)
      setPanelPhase('opening')
      schedulePanelIdle()
      return
    }

    if (activePanel === panel && panelPhase !== 'closing') {
      return
    }

    setPanelPhase('closing')
    timeoutRef.current = window.setTimeout(() => {
      const nextPanel = panelTransitionTargetRef.current

      if (!nextPanel) {
        setActivePanel(null)
        setPanelPhase('idle')
        timeoutRef.current = null
        return
      }

      setActivePanel(nextPanel)
      setPanelPhase('opening')
      schedulePanelIdle()
    }, PANEL_TRANSITION_MS)
  }

  async function closeActivePanel() {
    if (!activePanel) {
      return
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    panelTransitionTargetRef.current = null
    setPanelPhase('closing')

    await new Promise<void>((resolve) => {
      timeoutRef.current = window.setTimeout(() => {
        setActivePanel(null)
        setPanelPhase('idle')
        timeoutRef.current = null
        resolve()
      }, PANEL_TRANSITION_MS)
    })
  }

  function resetToIntroState() {
    panelTransitionTargetRef.current = null
    setActivePanel(null)
    setPanelPhase('idle')
    setPanelResetToken((current) => current + 1)
    setIntroSeed((current) => current + 1)
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

    const command = getCommand(nextValue)
    resetComposer()

    if (command) {
      if (command === 'clean') {
        resetToIntroState()
        return
      }

      if (command === 'projects') {
        setPanelResetToken((current) => current + 1)
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

  return (
    <section className="flex min-h-0 flex-1 overflow-hidden">
      <div className="crt-shell flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(180deg,rgba(18,28,14,0.94)_0%,rgba(10,22,12,0.96)_100%)] shadow-[0_30px_120px_rgba(0,0,0,0.42)]">
        <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5" ref={scrollViewportRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={[
                  'max-w-[88%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-[0_10px_40px_rgba(0,0,0,0.28)]',
                  bubbleClassName(message.role, message.status),
                ].join(' ')}
              >
                <p className="whitespace-pre-wrap">
                  {message.content || (message.status === 'streaming' ? t.home.chat.streaming : '')}
                </p>
              </div>
            ))}

            <div
              aria-hidden={!activePanel}
              className={[
                'origin-center overflow-hidden transition-all duration-300 ease-out',
                activePanel ? 'pointer-events-auto' : 'pointer-events-none',
                panelPhase === 'closing' || !activePanel
                  ? 'max-h-0 scale-y-0 opacity-0'
                  : 'max-h-[9999px] scale-y-100 opacity-100',
              ].join(' ')}
            >
              {activePanel ? <HomePanelContent panel={activePanel} resetToken={panelResetToken} /> : null}
            </div>
          </div>
        </div>

        <form className="border-t border-border/70 px-4 py-4 sm:px-5" onSubmit={handleSubmit}>
          <div className="relative">
            {isCommandMenuOpen ? (
              <div className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] rounded-[1.4rem] border border-border/80 bg-background/95 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur">
                <div className="space-y-1">
                  {filteredCommands.map((command, index) => {
                    const isHighlighted = index === highlightedCommandIndex

                    return (
                      <button
                        key={command}
                        className={[
                          'flex w-full items-center justify-between rounded-[1rem] px-3 py-2 text-left text-sm transition-colors',
                          isHighlighted ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-secondary',
                        ].join(' ')}
                        onClick={() => applyCommandSelection(command)}
                        onMouseEnter={() => setHighlightedCommandIndex(index)}
                        type="button"
                      >
                        <span>{formatHomeCommand(command)}</span>
                        <span
                          className={[
                            'text-[11px] uppercase tracking-[0.18em]',
                            isHighlighted ? 'text-accent-foreground/80' : 'text-muted-foreground',
                          ].join(' ')}
                        >
                          command
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            <div className="flex items-end gap-3 rounded-[1.5rem] border border-border/70 bg-secondary/65 p-3">
              <textarea
                ref={textareaRef}
                className="min-h-24 flex-1 resize-none rounded-[1.2rem] border border-border/70 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                disabled={isAnyStreaming}
                onChange={(event) => {
                  setInputValue(event.target.value)
                  setIsCommandMenuDismissed(false)
                }}
                onCompositionEnd={() => {
                  isComposingRef.current = false
                }}
                onCompositionStart={() => {
                  isComposingRef.current = true
                }}
                onKeyDown={handleTextareaKeyDown}
                placeholder={isAnyStreaming ? streamingComposerText : t.home.chat.inputPlaceholder}
                rows={3}
                value={inputValue}
              />
              <Button className="h-11 px-6" disabled={isAnyStreaming || !inputValue.trim()} type="submit">
                {isAnyStreaming ? t.home.chat.streaming : t.home.chat.send}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
