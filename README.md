# Hiro Liang Web

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, Zustand, and React Router.

Live site: [hiroliang.com](https://hiroliang.com)

## Features

- Chat-style homepage with slash-command panels
- Shared project detail experience on the homepage and `/project`
- Device-aware Tentserv Chat download page for macOS, Windows, and mobile fallback states
- Lightweight browser games under the `/games` slash-command panel
- English, Traditional Chinese, and Japanese localization for interface copy, project copy, and notes

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- TanStack Query

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

Create `.env.local` if needed.

```env
VITE_API_BASE_URL=
VITE_CHAT_STREAM_URL=
VITE_CHAT_API_KEY=
VITE_CHAT_MODEL=
VITE_USE_CUSTOM_FONT=
```

- `VITE_API_BASE_URL`: Axios API base URL
- `VITE_CHAT_STREAM_URL`: homepage chat SSE endpoint
- `VITE_CHAT_API_KEY`: API key sent in request headers
- `VITE_CHAT_MODEL`: default chat model value
- `VITE_USE_CUSTOM_FONT`: enable bundled `LXGW WenKai Mono TC`

## Project Structure

- `src/pages/`: route-facing thin exports
- `src/components/conversation/`: reusable conversation shell, viewport, message bubble, panel slot, composer, and inline menu render components
- `src/components/ui/`: shared UI primitives such as button, select, and section shell
- `src/features/home/views/`: homepage view composition
- `src/features/home/hooks/`: homepage chat, intro typing, panel transition, and stream placeholder hooks
- `src/features/home/services/`: chat stream, markdown, message, and command services
- `src/features/home/components/chat/`: homepage-specific chat wrappers, command menu, and assistant message rendering
- `src/features/home/components/panels/`: profile, GitHub, notes, and homepage panel composition
- `src/features/home/components/games/`: games menu plus Snake/Gomoku canvas modules
- `src/features/project/`: reusable project selector/details, project catalog, release metadata, route view, and platform detection
- `src/shared/api/`: Axios client, JSON fetch helper, QueryClient, and SSE reader
- `src/shared/markdown/`: markdown rendering and sanitization service
- `src/shared/styles/`: theme services and design token helpers
- `src/styles/`: Tailwind entry, font faces, CSS tokens, base styles, and component shell styles
- `src/stores/preferences/`: persisted locale/theme preference store
- `src/locales/en.ts`: English copy
- `src/locales/zh-TW.ts`: Traditional Chinese copy
- `src/locales/ja.ts`: Japanese copy
- `public/tentserv-releases.json`: local release metadata consumed by the project page
- `dev-doc/site-intro-agent-adapter-prompts.md`: prompt guide for site-intro agent adapter test data

## Notes

- The app uses hash-based routing.
- The homepage remains the primary product surface.
- Some bundled font assets are large and will affect production bundle size when enabled.

## Content and Localization

- Public copy lives in `src/locales/`; keep the three locale files aligned when adding project text, UI labels, or notes.
- `home.experience.notes` should keep the same order and count across `en`, `zh-TW`, and `ja`.
- Note dates use locale-specific formats: `YYYY / MM / DD` for English, `YYYY 年 MM 月 DD 日` for Traditional Chinese, and `YYYY年M月D日` for Japanese.
- The site-intro adapter prompt guide should only describe public site facts. Avoid adding private background, unsupported release claims, download counts, benchmark scores, or security-audit claims that are not present on the site.
