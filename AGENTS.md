# AGENTS.md

Guidance for Codex when working in this repository.

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
- App providers: `src/app/providers.tsx`
- State: `src/stores/preferences/` with `src/stores/app-store.ts` as a compatibility export
- Locales: `src/locales/`
- Home feature: `src/features/home/`
  - Views: `src/features/home/views/`
  - Components: `src/features/home/components/chat/`, `panels/`, `games/`
  - Services: `src/features/home/services/`
  - Hooks: `src/features/home/hooks/`
- Project feature: `src/features/project/` with project components, catalog, platform detection, and release metadata
- Reusable conversation render surface: `src/components/conversation/`
- Shared services/styles: `src/shared/api/`, `src/shared/markdown/`, `src/shared/styles/`, `src/shared/utils/`
- Shared UI primitives: `src/components/ui/`
- Global CSS modules: `src/styles/` imported by `src/index.css`
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
- Keep route files in `src/pages/` thin; put implementation in feature `views/`, `components/`, `hooks/`, and `services/`.
- Put reusable conversation rendering in `src/components/conversation/`; keep home-only slash commands, panels, and chat orchestration inside `src/features/home/`.
- Keep reusable project UI and project release logic in `src/features/project/`; Home may compose the feature through `src/features/project/index.ts`.
- `@/` maps to `src/`.
- The homepage chat stream is implemented in `src/features/home/services/chat-stream.service.ts`; `src/features/home/api.ts` is a compatibility export.
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
