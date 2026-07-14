import { useEffect, useRef, useState } from 'react'

import type { ChatMessage } from '@/features/home/types'

const INTRO_MIN_STREAM_DELAY_MS = 12
const INTRO_MAX_STREAM_DELAY_MS = 34

function getTypingDelay(character: string) {
  if (character === ' ' || character === '\n') {
    return 8
  }

  if ([',', '.', '!', '?'].includes(character)) {
    return 46
  }

  return INTRO_MIN_STREAM_DELAY_MS + Math.floor(Math.random() * (INTRO_MAX_STREAM_DELAY_MS - INTRO_MIN_STREAM_DELAY_MS + 1))
}

export function useHomeIntroMessage(introMessage: string) {
  const [introSeed, setIntroSeed] = useState(0)
  const introMessageIdRef = useRef(crypto.randomUUID())
  const [messages, setMessages] = useState<ChatMessage[]>(() => [])

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
      // 繁中：逐字更新只負責首頁開場訊息，避免混入聊天請求控制流程。
      // English: Character streaming owns only the homepage intro, separate from chat request orchestration.
      // 日本語：文字ストリームはホーム導入文だけを担当し、チャット要求制御とは分離します。
      for (let index = 1; index <= introMessage.length; index += 1) {
        if (cancelled) {
          return
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, getTypingDelay(introMessage[index - 1] ?? ''))
        })

        setMessages((current) =>
          current.map((message) =>
            message.id === introMessageIdRef.current
              ? {
                  ...message,
                  content: introMessage.slice(0, index),
                  status: index === introMessage.length ? 'idle' : 'streaming',
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
  }, [introMessage, introSeed])

  return {
    isIntroStreaming: messages.some(
      (message) => message.id === introMessageIdRef.current && message.status === 'streaming',
    ),
    messages,
    restartIntroMessage: () => setIntroSeed((current) => current + 1),
    setMessages,
  }
}
