import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from '@/App'
import { AppProviders } from '@/app/providers'
import { appEnv } from '@/shared/config/env'
import { applyThemeMode, getInitialThemeMode } from '@/shared/styles/theme'
import '@/index.css'

const initialThemeMode = getInitialThemeMode()

document.documentElement.dataset.useCustomFont = String(appEnv.useCustomFont)
applyThemeMode(initialThemeMode)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </HashRouter>
  </StrictMode>,
)
