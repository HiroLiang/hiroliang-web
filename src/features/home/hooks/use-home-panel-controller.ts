import { useEffect, useRef, useState } from 'react'

import type { HomePanelType, PanelPhase } from '@/features/home/types'

const PANEL_TRANSITION_MS = 260

export function useHomePanelController() {
  const [activePanel, setActivePanel] = useState<HomePanelType | null>(null)
  const [panelPhase, setPanelPhase] = useState<PanelPhase>('idle')
  const [panelResetToken, setPanelResetToken] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const panelTransitionTargetRef = useRef<HomePanelType | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function clearPanelTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function schedulePanelIdle() {
    timeoutRef.current = window.setTimeout(() => {
      setPanelPhase('idle')
      timeoutRef.current = null
    }, PANEL_TRANSITION_MS)
  }

  function openPanel(panel: HomePanelType) {
    clearPanelTimeout()
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

    clearPanelTimeout()
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

  function resetPanelState() {
    clearPanelTimeout()
    panelTransitionTargetRef.current = null
    setActivePanel(null)
    setPanelPhase('idle')
    setPanelResetToken((current) => current + 1)
  }

  function requestPanelReset() {
    setPanelResetToken((current) => current + 1)
  }

  return {
    activePanel,
    closeActivePanel,
    openPanel,
    panelPhase,
    panelResetToken,
    requestPanelReset,
    resetPanelState,
  }
}
