import { useEffect, useState } from 'react'

const STREAMING_BUILDUP_FRAMES = ['loadin', 'loading', 'loading.', 'loading..', 'loading...'] as const

export function useStreamingComposerText(isAnyStreaming: boolean) {
  const [streamingComposerText, setStreamingComposerText] = useState('')

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

  return streamingComposerText
}
