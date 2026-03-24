/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_CUSTOM_FONT?: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
