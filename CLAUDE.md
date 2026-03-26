# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

No dedicated test runner is configured yet.

## Environment

Use `.env.local` when needed.

```env
VITE_API_BASE_URL=
VITE_CHAT_STREAM_URL=
VITE_CHAT_API_KEY=
VITE_CHAT_MODEL=
VITE_USE_CUSTOM_FONT=
```

- `VITE_API_BASE_URL`: base URL for the Axios client
- `VITE_CHAT_STREAM_URL`: SSE endpoint used by homepage chat
- `VITE_CHAT_API_KEY`: sent as `X-Chat-Api-Key`
- `VITE_CHAT_MODEL`: default model name sent with chat requests
- `VITE_USE_CUSTOM_FONT`: `true` to use bundled `LXGW WenKai Mono TC`

## Architecture

- Entry: `src/main.tsx`
- Router: `src/router/index.tsx`
- Layout: `src/layouts/app-layout.tsx`
- State: `src/stores/app-store.ts`
- Locales: `src/locales/`
- Home feature: `src/features/home/`
- Shared UI: `src/components/`

## Current app shape

- The homepage is still the main surface.
- The homepage is chat-first and supports slash-command panels such as `/profile`, `/github`, `/projects`, `/games`, and `/note`.
- `/project` remains a standalone project detail route.
- `/games` currently includes Snake and Gomoku.
- Mobile navbar behavior is controlled in `AppLayout` and is tied to the active scroll container instead of direct navbar drag gestures.

## Implementation notes

- Routing is hash-based.
- Use `useMessages()` for localized strings and keep `src/locales/types.ts` in sync when adding new copy.
- Feature logic should stay inside `src/features/<feature>/`.
- `@/` maps to `src/`.
- The homepage chat stream is handled in `src/features/home/api.ts`.
