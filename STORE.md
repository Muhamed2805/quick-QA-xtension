# Chrome Web Store — listing copy (v1.0.0)

Use this when you submit the unpacked `dist` build as a ZIP. Do not upload the repository root (there is no `manifest.json` there).

Privacy policy URL after you push this repo:

`https://github.com/Muhamed2805/quick-QA-xtension/blob/main/PRIVACY.md`

## Single purpose

Quick QA audits the currently open webpage for SEO, accessibility, content, and technical issues. Analysis runs locally in the browser.

## Short description (max 132 characters)

Scan the current tab for SEO, accessibility, and technical QA issues. Reports stay on your device.

## Full description

Quick QA is a local webpage auditor for developers, QA engineers, SEO specialists, and site owners.

Open any site, click the extension, and scan the current tab. You get a 0–100 score, category scores (SEO, Accessibility, Links, Images, Forms, Content, Technical), and plain-language findings with recommendations.

What it checks (examples):

- Titles, meta descriptions, canonical, Open Graph, headings, HTTPS
- Labels, language, empty controls, common ARIA mistakes
- Link types and target="_blank" without noopener
- Image alt text, dimensions, and broken images in the DOM
- Form structure without reading field values
- Placeholder copy, heading outline, charset, viewport, timings

What it is not:

- Not Google Lighthouse
- Not a WCAG certification
- Not a cloud dashboard and not an AI service

Privacy: page content is not uploaded. Password and input values are never stored. Optional history keeps only URL, score, and issue counts on your device.

Permissions: activeTab, scripting, and storage — only for the tab you scan and for local history.

## Permission justifications (store form)

- **activeTab** — Identify the tab the user opened the popup on and allow a one-time read of that page.
- **scripting** — Inject a read-only function that snapshots DOM metadata. The page is not changed.
- **storage** — Save a short local scan history the user can clear.

## Screenshots to capture (1280×800 or 640×400)

Take these from a real site (for example example.com plus one shop):

1. Home popup: logo, domain, Scan Current Page, empty or filled history
2. Overview: overall score, category tiles, top issues
3. SEO tab: finding cards (error / warning / pass)
4. Images tab: image table
5. Restricted page: clear error on chrome:// or New Tab

Promo tile: the 128×128 icon in `public/icons/icon-128.png`.

## Package the ZIP

```powershell
cd D:\QuickQAExtention\quick-QA-xtension
npm test
npm run build
Compress-Archive -Path dist\* -DestinationPath quick-qa-1.0.0-store.zip -Force
```

Load-test the ZIP contents by unpacking to a folder and using **Load unpacked** on that folder (it must contain `manifest.json`).

## Store category

Developer tools (or Productivity).
