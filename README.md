# Hiro Liang Web

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

The site currently centers on two main experiences:

- A chat-style homepage with slash-command panels such as `/profile`, `/github`, `/projects`, and `/note`
- A project detail flow that highlights featured work such as Tentserv Chat and Plant Care

## Tech stack

- React 19
- TypeScript
- Vite (`rolldown-vite`)
- Tailwind CSS
- Zustand
- React Router

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Environment variables

This project uses Vite environment variables. Create a local env file such as `.env.local` when needed.

### Chat streaming

The homepage can send normal chat messages to a streaming API.

Required to enable chat streaming:

```env
VITE_CHAT_STREAM_URL=
VITE_CHAT_API_KEY=
VITE_CHAT_MODEL=
```

Behavior:

- If these values are configured, regular chat input will call the streaming API.
- Slash commands such as `/profile` and `/projects` are handled locally in the UI.
- Unknown slash commands return a local error message instead of calling the API.

### Font toggle

Use the bundled `LXGW WenKai Mono TC` font:

```env
VITE_USE_CUSTOM_FONT=true
```

Use the default monospace fallback stack:

```env
VITE_USE_CUSTOM_FONT=false
```

If `VITE_USE_CUSTOM_FONT` is unset, the app also falls back to the default stack:

```text
'Courier New', 'IBM Plex Mono', 'Menlo', monospace
```

Bundled font assets live under [src/assets/fonts](/Users/hiroliang/Projects/hiro-liang-web/src/assets/fonts).

## App behavior

### Homepage chat

- The initial assistant intro is streamed locally for a terminal-like feel.
- Typing `/` opens the local command menu.
- Sending a normal message closes any open slash-command panel first, then starts chat streaming.

### Projects

- The `/projects` panel and the standalone `/project` route share the same project detail content.
- Tentserv Chat includes environment-aware download actions for macOS and Windows.
- Mobile layouts are intended to allow the full project detail content to scroll.

## Project structure

- [src/pages/home-page.tsx](/Users/hiroliang/Projects/hiro-liang-web/src/pages/home-page.tsx): homepage chat flow and slash-command handling
- [src/pages/project-page.tsx](/Users/hiroliang/Projects/hiro-liang-web/src/pages/project-page.tsx): standalone project detail page
- [src/features/home/components.tsx](/Users/hiroliang/Projects/hiro-liang-web/src/features/home/components.tsx): homepage panels and shared project detail UI
- [src/features/home/api.ts](/Users/hiroliang/Projects/hiro-liang-web/src/features/home/api.ts): chat streaming request and SSE parsing
- [src/locales/en.ts](/Users/hiroliang/Projects/hiro-liang-web/src/locales/en.ts): English copy
- [src/locales/zh-TW.ts](/Users/hiroliang/Projects/hiro-liang-web/src/locales/zh-TW.ts): Traditional Chinese copy

## Notes

- The project uses hash-based routing.
- Some bundled font files are large; production asset size will increase when custom fonts are enabled in the UI.
