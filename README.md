<div align="center">

# 🎨 Color Explorer

**Pick a color, convert it, build palettes, and check accessibility, all in one place.**

[![CI](https://github.com/mutkukucuk/COLOR-EXPLORER/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/mutkukucuk/COLOR-EXPLORER/actions/workflows/ci.yml)
[![Deploy](https://github.com/mutkukucuk/COLOR-EXPLORER/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/mutkukucuk/COLOR-EXPLORER/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)

[**Live demo →**](https://mutkukucuk.github.io/COLOR-EXPLORER/)

</div>

---

## Overview

Color Explorer is a fast, client-side web app for working with color. It accepts any CSS color, shows it in every common format, generates harmonious palettes in a perceptually uniform color space, and checks text and background pairs against WCAG contrast guidelines. The whole view lives in the URL, so sharing a color is as simple as sharing a link.

## Features

| | Feature | Details |
|---|---|---|
| 🎯 | **Picker & conversions** | Native picker or free-text input (`#ff8800`, `rgb(…)`, `hsl(…)`, `oklch(…)`, `rebeccapurple`). Copy **HEX**, **RGB**, **HSL** or **OKLCH** in one click. |
| 🌈 | **Palette generator** | Complementary, analogous, triadic, tints and shades. Hue math runs in **OKLCH** and results are gamut-mapped to sRGB. |
| ♿ | **Contrast checker** | Live WCAG 2.x ratio with **AA / AAA** pass/fail for normal and large text, plus a preview and a swap button. |
| 🔗 | **Save & share** | Save palettes in your browser. The full state is kept in the URL hash, so any view can be shared. |
| 🌓 | **Light & dark** | Follows your system theme. Responsive from phone to desktop. |

## Tech stack

- **[React 19](https://react.dev)** + **[TypeScript](https://www.typescriptlang.org)** for the UI
- **[Vite](https://vite.dev)** for dev server and production builds
- **[culori](https://culorijs.org)** for color parsing, conversion, gamut mapping and WCAG math
- **[Vitest](https://vitest.dev)** + **[Testing Library](https://testing-library.com)** for unit and component tests
- **[Oxlint](https://oxc.rs)** for linting
- **GitHub Actions** + **GitHub Pages** for CI and hosting

## Getting started

**Prerequisites:** Node.js `20.19+` or `22.12+`

```sh
git clone https://github.com/mutkukucuk/COLOR-EXPLORER.git
cd COLOR-EXPLORER
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the codebase with Oxlint |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── lib/            # Pure, framework-free color logic (fully unit-tested)
│   ├── color.ts        # Parse any CSS color → hex; format as HEX/RGB/HSL/OKLCH
│   ├── palette.ts      # Palette generation in OKLCH with gamut mapping
│   ├── contrast.ts     # WCAG contrast ratio, thresholds, readable text color
│   ├── share.ts        # Encode/decode app state to the URL hash
│   └── storage.ts      # Saved palettes in localStorage (fails safely)
├── hooks/          # React state: URL-synced colors, saved palettes, clipboard
├── components/     # UI: picker, conversion table, palette, contrast, saved list
├── App.tsx         # Page layout
└── index.css       # Design tokens (light/dark) and styles
```

### Shareable URLs

State is kept in the hash, so links work on static hosting without a server:

```
https://mutkukucuk.github.io/COLOR-EXPLORER/#c=ff8800&fg=1f2937&bg=ffffff
                                             │        │         └ contrast background
                                             │        └ contrast text
                                             └ base color
```

## Deployment

The app deploys to **GitHub Pages** automatically:

1. Every push to `main` triggers [`deploy.yml`](.github/workflows/deploy.yml).
2. The workflow lints, tests and builds, then publishes `dist/` to Pages.

The Vite `base` is set to `/COLOR-EXPLORER/` for production builds (see [`vite.config.ts`](vite.config.ts)).

> **One-time setup:** in the repository go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Branching & contributing

| Branch | Purpose |
|---|---|
| `main` | Production. Every commit is deployed to GitHub Pages. |
| `develop` | Integration branch for the next release. |
| `feature/*`, `fix/*` | Short-lived branches for individual changes, opened as PRs into `develop`. |

**Workflow**

1. Branch off `develop`: `git checkout -b feature/my-change develop`
2. Commit using [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`, `chore:` …)
3. Make sure `npm run lint && npm test && npm run build` passes
4. Open a pull request into `develop`. CI must be green before merging.
5. Releases are merged from `develop` into `main` and tagged (`vX.Y.Z`).

## Roadmap

- [ ] Color-blindness simulation for palettes
- [ ] Export palettes as CSS variables, Tailwind config or JSON
- [ ] APCA contrast alongside WCAG 2.x
- [ ] Display-P3 wide-gamut support

---

<div align="center">
Made by <a href="https://github.com/mutkukucuk">@mutkukucuk</a>
</div>
