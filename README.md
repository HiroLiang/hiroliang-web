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

- `src/pages/home-page.tsx`: homepage chat flow and slash-command handling
- `src/pages/project-page.tsx`: standalone project route
- `src/layouts/app-layout.tsx`: shared layout and mobile navbar behavior
- `src/features/home/components.tsx`: homepage panels and shared content sections
- `src/features/home/games.tsx`: games menu and game entry switching
- `src/features/home/api.ts`: chat streaming request handling
- `src/features/home/use-tentserv-releases.ts`: release metadata lookup for Tentserv Chat downloads
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
