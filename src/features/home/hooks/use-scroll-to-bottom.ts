import { type RefObject, useEffect } from 'react'

export function useScrollToBottom(ref: RefObject<HTMLElement | null>, dependencyKey: string) {
  useEffect(() => {
    const viewport = ref.current
    if (!viewport) {
      return
    }

    viewport.scrollTo({
      behavior: 'smooth',
      top: viewport.scrollHeight,
    })
  }, [dependencyKey, ref])
}
