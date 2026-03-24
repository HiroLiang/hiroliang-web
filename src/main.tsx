import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from '@/App'
import { AppProviders } from '@/components/providers'
import '@/index.css'

const useCustomFont = import.meta.env.VITE_USE_CUSTOM_FONT === 'true'

document.documentElement.dataset.useCustomFont = String(useCustomFont)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </HashRouter>
  </StrictMode>,
)
