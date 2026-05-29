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
- Tentserv Chat release metadata: `public/tentserv-releases.json`
- Site-intro agent prompt guide: `dev-doc/site-intro-agent-adapter-prompts.md`

## Current app shape

- The homepage is still the main surface.
- The homepage is chat-first and supports slash-command panels such as `/profile`, `/github`, `/projects`, `/games`, and `/note`.
- Primary projects are Tentgent, Tentserv Chat, and Plant Care.
- `/project` remains a standalone Tentserv Chat release route with device-aware download guidance.
- `/games` currently includes Snake and Gomoku.
- Mobile navbar behavior is controlled in `AppLayout` and is tied to the active scroll container instead of direct navbar drag gestures.

## Implementation notes

- Routing is hash-based.
- Use `useMessages()` for localized strings and keep `src/locales/types.ts` in sync when adding new copy.
- Feature logic should stay inside `src/features/<feature>/`.
- `@/` maps to `src/`.
- The homepage chat stream is handled in `src/features/home/api.ts`.
- When changing public project facts, slash-command behavior, note themes, or download support, update `dev-doc/site-intro-agent-adapter-prompts.md` so generated adapter test data stays aligned with the site.

## Localization guardrails (strict)

- Keep `home.experience.notes` aligned across `en`, `zh-TW`, and `ja`: same order, same count, and equivalent meaning.
- For Traditional Chinese locale (`src/locales/zh-TW.ts`), all `home.experience.notes[*].date` values must use: `YYYY 年 MM 月 DD 日`.
- Do not use slash format (for example, `YYYY / MM / DD`) in `zh-TW` notes.
- When editing any notes content, ensure date formats remain internally consistent per locale before finishing:
  - `zh-TW`: `YYYY 年 MM 月 DD 日`
  - `en`: `YYYY / MM / DD`
  - `ja`: `YYYY年M月D日`
- Keep product names, repository names, slash commands, model/provider names, and protocol names in their established form unless the existing locale already uses a conventional translation.
