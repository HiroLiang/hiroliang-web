# Hiro Liang Web

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, Zustand, and React Router.

Live site: [hiroliang.com](https://hiroliang.com)

## Features

- Chat-style homepage with slash-command panels
- Shared project detail experience on the homepage and `/project`
- Lightweight browser games under `/games`
- Traditional Chinese and English localization

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router

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
- `src/locales/en.ts`: English copy
- `src/locales/zh-TW.ts`: Traditional Chinese copy

## Notes

- The app uses hash-based routing.
- The homepage remains the primary product surface.
- Some bundled font assets are large and will affect production bundle size when enabled.
