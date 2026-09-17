# Manual QA — v1.0.0

Reload the **`dist`** folder after every build. Do not load the repo root.

## Must pass

| # | Page | Expect |
|---|---|---|
| 1 | `https://example.com` | Scan succeeds. Title pass. Often missing OG/Twitter. Score is a number, not `—`. |
| 2 | `https://www.intersport.ba/` | Overview shows Forms vs Accessibility note if Forms is high and Accessibility is lower. Top issues do **not** list both “Heading hierarchy” and “Heading structure”. |
| 3 | `https://www.intersport.ba/` | Empty-link count is not inflated by icon links that have `aria-label` or image alt. |
| 4 | `chrome://extensions` | Clear “cannot scan” message. No crash. |
| 5 | Chrome New Tab | Clear message. Scan button does not fake a report. |
| 6 | Same site, click **Export JSON** | File downloads. No `visibleText` dump of the page body. `version` is `1.0.0`. |
| 7 | **Copy Summary** | Clipboard has score, category scores, top issues, “not uploaded”. |
| 8 | History | After a scan, home shows domain + score. **Clear** empties the list. |
| 9 | Page does not change | No injected banner, outline, or highlight on the site. |
| 10 | HTTP site (if you have one) | HTTPS check fails. |

## Permissions smoke

On `chrome://extensions` → Quick QA → Details: only **Read your browsing history** is **not** requested. You should see access to the current tab (activeTab), scripting, and storage — not “all sites” as a host permission.

## Automated gate before store ZIP

```powershell
npm test
npm run lint
npm run build
```
