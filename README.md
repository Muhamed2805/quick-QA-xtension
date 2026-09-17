# Quick QA

Quick QA is a Manifest V3 Chrome extension that scans the currently open webpage and produces a structured QA report covering SEO, accessibility, links, images, forms, content, and technical checks.

Analysis runs **locally in the browser**. Page content is not sent to external servers, AI APIs, or cloud dashboards.

Status: **v1 complete** — local scan engine, category checks, scoring, JSON export, copy summary, and local history.

## Requirements analysis

Quick QA is a read-only auditor for the active tab. It is aimed at developers, QA engineers, SEO specialists, and site owners who need a fast, understandable report—not a Lighthouse replacement and not a WCAG certification tool.

Product constraints for v1:

- Inspect the current page only; do not mutate the DOM or inject visible page UI.
- Keep permissions minimal (`activeTab`, `scripting`, `storage`).
- Never collect password values or live form input.
- Score 0–100 from weighted checks, plus per-category scores.
- Export JSON and copy a text summary later; keep the export shape extensible for PDF.
- Store only lightweight scan history (domain, URL, timestamp, score, error/warning counts).

## Architecture

The popup is a React app. It asks Chrome for the active tab, then (from M2 onward) injects a **read-only collector** into that tab. The collector returns a serializable page snapshot. Pure check functions run inside the popup (or a dedicated engine module), never as a giant single file.

```
Popup (React)
  → chrome.tabs.query (active tab)
  → chrome.scripting.executeScript (M2+, read-only snapshot)
  → PageSnapshot
  → Rule engine (one function per check)
  → Scoring
  → Report UI / JSON export / local history
```

The service worker stays thin. It does not scrape pages. Later it can own history writes and messaging if the popup needs a durable background task.

### Popup ↔ page communication (v1)

1. User opens the extension action. That user gesture grants **activeTab** on the current tab.
2. Popup calls `chrome.tabs.query({ active: true, currentWindow: true })`.
3. Restricted URLs (`chrome://`, New Tab, Web Store, extension pages) are rejected with a clear message.
4. Popup calls `chrome.scripting.executeScript` with a self-contained read-only collector (`collectPageSnapshot`). The function walks the DOM and returns JSON. It does not write to the page and does not read form values.
5. Checks consume the snapshot only. No extra network requests to page links in v1.

This avoids a persistent content script and avoids `<all_urls>` host permissions.

### QA rule engine

Each rule is a pure function:

```ts
(snapshot: PageSnapshot) => QACheckResult | QACheckResult[]
```

SEO rules (M3) live in `src/checks/seo/` and are listed in `src/checks/registry.ts`. Later categories follow the same pattern. The engine:

1. Runs the registry.
2. Normalizes results (`id`, `category`, `title`, `description`, `severity`, `status`, `currentValue`, `recommendation`, `weight`).
3. Hands the list to the scorer.

Adding a rule means adding a file and registering it—not editing a monolith.

### Scoring

- Informational checks (`status: info`) do not reduce the overall score.
- Weighted checks with `pass` / `warning` / `fail` contribute to a 0–100 score.
- Failures cost more than warnings; weights stay in the rule definition so they can change later without UI rewrites.
- Category scores use the same formula on that category’s weighted checks.
- Overall score is not claimed to match Lighthouse.

Planned formula (implemented):

```
score = round(100 * earned / max)
earned = sum(weight * factor(status))
factor(pass) = 1, factor(warning) = 0.5, factor(fail) = 0, factor(info) = excluded
```

### Chrome permissions

| Permission | When | Why |
|---|---|---|
| `activeTab` | M1 | Read the current tab URL after the user opens the popup; later, temporarily allow `executeScript` on that tab. |
| `scripting` | M2 | Inject the read-only snapshot collector. |
| `storage` | v1 | `chrome.storage.local` for compact scan history. |

Not requested in v1: `<all_urls>`, cookies, webRequest, identity, downloads, or clipboard permission (the Clipboard API works in the popup from a user gesture).

## Folder structure

```
quick-QA-xtension/
├── LICENSE
├── README.md
├── index.html                 # popup document
├── manifest.config.ts
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── popup/                 # React popup entry + shell
│   ├── components/            # Reusable UI
│   ├── features/popup/        # Popup-specific views
│   ├── extension/             # Chrome adapters (tabs, snapshot capture)
│   ├── engine/                # runScan orchestration
│   ├── hooks/
│   ├── types/                 # Shared TypeScript contracts
│   ├── utils/
│   ├── checks/                # registry + one file per rule
│   │   ├── runChecks.ts
│   │   ├── registry.ts
│   │   ├── seo/               # M3+
│   │   ├── accessibility/
│   │   ├── links/
│   │   ├── images/
│   │   ├── forms/
│   │   ├── content/
│   │   └── technical/
│   └── scoring/               # M7
├── public/icons/
└── dist/                      # unpacked extension output
```

## Core TypeScript types

Defined in `src/types/index.ts`:

- `QACheckResult`
- `ScanResult` / `ScanSummary` / `CategorySummary`
- `PageInfo`, `LinkInfo`, `ImageInfo`, `FormInfo`
- `PageSnapshot` and related snapshot types (`src/types/snapshot.ts`)
- `ScanHistoryEntry`
- `ActiveTabInfo` / `TabAccessError`

## Development milestones

| ID | Scope |
|---|---|
| **M1** | Chrome extension foundation + popup UI |
| **M2** | Scanning engine and shared snapshot types |
| **M3** | SEO checks |
| **M4** | Accessibility + image checks |
| **M5** | Links + forms |
| **M6** | Content + technical checks |
| **M7** | Scoring + overview dashboard |
| **M8** | Export + scan history |
| **M9** | Testing + polish + error handling |

Deferred on purpose: broken-link HTTP checks, Lighthouse, AI copy, screenshots, PDF, compare, teams, cloud, custom rules, regression runs, side panel, in-page highlight.

## Getting started

### Prerequisites

- Node.js 20+
- Google Chrome

### Install and build

```bash
npm install
npm run dev
```

`npm run dev` starts Vite in watch mode. Load the unpacked extension from the `dist` folder (CRXJS writes it during `dev` and `build`).

```bash
npm run build
```

### Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `dist` directory.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Watch build for the extension |
| `npm run build` | Typecheck and production build |
| `npm run test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Privacy

- Default mode is local-only.
- No analytics, no remote scan API, no AI calls.
- Form **values** are never collected; only structure (labels, names present/absent, methods).

## License

[MIT](./LICENSE)
