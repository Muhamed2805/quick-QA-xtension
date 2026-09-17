# Manual QA — v1.2.2

Reload the **`dist`** folder after every build. Do not load the repo root.

## Must pass

| # | Page | Expect |
|---|---|---|
| 1 | `https://example.com` | Scan succeeds. Title pass. Often missing OG/Twitter. Score is a number, not `—`. |
| 2 | `https://www.intersport.ba/` | Overview shows Forms vs Accessibility note if Forms is high and Accessibility is lower. Top issues do **not** list both “Heading hierarchy” and “Heading structure”. |
| 3 | `https://www.intersport.ba/` | Empty-link / missing-alt should appear **once** in Top issues, not three times. Hidden/zero-size icon links should not inflate the count. |
| 4 | `chrome://extensions` | Clear “cannot scan” message. No crash. |
| 5 | Chrome New Tab | Clear message. Scan button does not fake a report. |
| 6 | Same site, click **Export JSON** | File downloads. No `visibleText` dump of the page body. `version` is `1.2.2`. |
| 7 | **Copy Summary** | Clipboard has score, category scores, top issues, “not uploaded”. |
| 8 | **Copy Markdown** | Clipboard has `# Quick QA` plus listed errors/warnings. |
| 9 | History | After a scan, home shows domain + score. **Clear** empties the list. |
| 10 | Page does not change | No injected banner, outline, or highlight on the site until you click Highlight. |
| 11 | HTTP site (if you have one) | HTTPS check fails. |
| 12 | Category tabs | Filter chips default to **Issues**. **All** shows passed checks. Search narrows titles. |
| 13 | Hide this check | Removes the rule from the current report and later scans until restored on the home screen. |
| 14 | Print / PDF | Opens an extension report tab; Print can save PDF. |
| 15 | Highlight on page | Temporary outlines + banner; Remove clears them. Page content otherwise unchanged. |
| 16 | Check link statuses | Chrome permission prompt; then a failed/checked count. Cap 40 links. |
| 17 | Open side panel | Wider Quick QA UI. |
| 18 | Compare | After two scans (same site preferred), home shows score deltas. |
| 19 | Shop homepage | Missing skip link is a **warning** only if the page has many visible links; missing `<main>` is a warning. Missing JSON-LD is **info**, not an error. |

## Permissions smoke

On `chrome://extensions` → Quick QA → Details: only **Read your browsing history** is **not** requested. You should see access to the current tab (activeTab), scripting, and storage — not “all sites” as a host permission.

## Automated gate before store ZIP

```powershell
npm test
npm run lint
npm run build
```
