# OneStopShop

A responsive product search application built with **React 18**, **Material UI**, and the **SearchSpring Search API**. Designed as a polished frontend assessment submission with production-ready code architecture, custom design system, and thoughtful UX details.

---

## Features

### Core Functionality

- **Live product search** — debounced input (450ms) triggers API calls as you type; hitting Enter or clicking Search fetches immediately
- **Pagination** — previous/next buttons plus numbered page controls (with ellipsis for large ranges); disabled states on first/last page
- **Cart management** — Add to Cart button per product; inline quantity increment/decrement controls; live cart badge in the header
- **Price display** — shows sale price; if `msrp` exists and exceeds `price`, the original is shown crossed out with a calculated discount % badge on the card

### UX & Design

- **Hero banner** — full-width dark editorial section with animated rotating headline words, floating fashion photo cards, category shortcut pills, ambient colour blobs, and a perks bar (Free Shipping / Premium Quality / Easy Returns)
- **Category pills** — clicking any pill in the hero triggers a real search and smooth-scrolls to results with correct header offset
- **Skeleton loading** — 12 placeholder cards shimmer while results are fetched, matching the exact card layout
- **Clear button** — a ✕ icon appears inside the search bar whenever there is text; clears the input and resets results in one click
- **Empty state** — contextual illustration and message depending on whether the user has searched or just landed
- **Smooth scroll** — header-aware scroll utility reads the sticky header's actual rendered height via `getBoundingClientRect()` so results are never obscured

### Technical Highlights

- **`new URL()` API** for building all search endpoints — parameters set via `searchParams.set()` for proper encoding and URL sanity
- **Code splitting** — components split across dedicated files; Vite `manualChunks` separates vendor, MUI, and app bundles
- **No Bootstrap** — replaced entirely with a custom CSS design system using CSS variables (`--ink`, `--accent`, `--paper`, etc.)
- **MUI icons** throughout — `StorefrontIcon`, `SearchIcon`, `CloseIcon`, `ShoppingCartIcon`, `AddIcon`, `RemoveIcon`, `AddShoppingCartIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `SearchOffIcon`, `TravelExploreIcon`, and more
- **Inlined SVG favicon** — embedded as a `data:` URI directly in `index.html` to bypass all browser favicon caching issues; orange-red rounded square with white MUI Storefront icon
- **`manifest.json`** — updated with app name, SVG icon, `theme_color: #e8421a`, and `background_color` matching the design tokens

---

## Project Structure

```
onestopshop/
├── public/
│   ├── index.html          # CRA entry — inlined SVG favicon, manifest link
│   ├── favicon.ico         # Standalone ico icon (orange-red rounded square)
│   └── manifest.json       # PWA manifest — name, icons, theme colour
│
├── src/
│   ├── App.js             # Root component — state, fetch logic, scroll utility
│   ├── index.js            # ReactDOM render entry point
│   ├── index.css           # Full custom design system (CSS variables, animations)
│   │
│   ├── components/
│   │   ├── Header.jsx      # Sticky header — logo, search bar, clear button, cart badge
│   │   ├── HeroBanner.jsx  # Editorial hero — rotating text, photo cards, category pills
│   │   ├── ProductGrid.jsx # Grid wrapper — renders cards or skeletons
│   │   ├── ProductCard.jsx # Individual card — image, name, price, MSRP, cart controls
│   │   ├── SkeletonCard.jsx # MUI Skeleton loading placeholder
│   │   ├── PaginationBar.jsx # Prev/next + numbered page buttons
│   │   └── EmptyState.jsx  # No-results and initial landing state
│   │
│   └── utils/
│       └── buildSearchURL.js  # URL builder using native JS URL class
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

Verify with:

```bash
node -v
npm -v
```

### Installation

1. Clone or download the project, then navigate into the folder:

```bash
cd athos-product-search
```

2. Install dependencies:

```bash
npm install
```

### Running in Development

```bash
npm start
```

Create React App starts a dev server. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Bundles are split into:

- `vendor` — React + ReactDOM
- `mui` — MUI component and icon libraries + Emotion
- `index` — application code

### Previewing the Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally so you can verify the production build before deploying.

---

## 🔌 API

This app uses the [SearchSpring Search API](https://searchspring.zendesk.com/hc/en-us/sections/115000119223-Search-API).

| Parameter       | Value      | Description                |
| --------------- | ---------- | -------------------------- |
| `siteId`        | `scmq7n`   | Site identifier            |
| `q`             | user input | Search keyword             |
| `resultsFormat` | `native`   | Returns JSON results       |
| `page`          | number     | Page number for pagination |

**Example request:**

```
https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=jeans&resultsFormat=native&page=2
```

All URLs are constructed via the native `URL` class in `src/utils/buildSearchURL.js` — no string concatenation, full parameter encoding guaranteed.

---

## Design System

All design tokens live as CSS custom properties in `src/index.css`:

| Token            | Value     | Usage                                  |
| ---------------- | --------- | -------------------------------------- |
| `--ink`          | `#0f0e11` | Primary text, dark backgrounds         |
| `--ink-muted`    | `#6b6876` | Secondary text, placeholders           |
| `--paper`        | `#faf9f7` | Page background                        |
| `--card-bg`      | `#ffffff` | Card surfaces                          |
| `--accent`       | `#e8421a` | Brand colour — buttons, prices, badges |
| `--accent-dark`  | `#c33410` | Hover state for accent                 |
| `--accent-light` | `#fdeee9` | Tinted backgrounds                     |

**Fonts:** `DM Serif Display` (headings) + `DM Sans` (body) — loaded from Google Fonts.

---

## Dependencies

| Package                              | Purpose                                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| `react` / `react-dom`                | UI framework                                                 |
| `@mui/material`                      | Component library — Button, InputBase, Badge, Skeleton, etc. |
| `@mui/icons-material`                | MUI icon set                                                 |
| `@emotion/react` / `@emotion/styled` | MUI's CSS-in-JS peer dependencies                            |
| `lodash`                             | `debounce` for search input throttling                       |

**Dev:**

| Package                | Purpose                    |
| ---------------------- | -------------------------- |
| `vite`                 | Build tool and dev server  |
| `@vitejs/plugin-react` | React Fast Refresh support |

---

## Notes

- The SearchSpring API does not require authentication headers for this `siteId`
- Favicon is embedded as an inline `data:` URI to avoid Chrome's aggressive favicon caching — no separate file request needed
- `scroll-margin-top` is set on the results container so browser-native anchor navigation also clears the sticky header correctly
- Cart state is local (React state only) — intentionally not persisted, as this is a search UI assessment
