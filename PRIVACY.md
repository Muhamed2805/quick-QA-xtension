# Privacy Policy — Quick QA

Last updated: 17 September 2026

Quick QA is a Chrome extension that audits the webpage in your active tab. **Scans run on your computer.** We do not operate a backend that receives page content.

## What the extension accesses

After you click the Quick QA icon and run a scan, the extension may read:

- The current tab URL and title
- Public HTML structure and metadata (headings, links, images, forms markup, meta tags, performance timings)

It does this only to produce a local report.

## What the extension does not collect

- Password field values
- Text typed into form fields
- Cookies, browsing history, or other tabs
- Analytics, advertising IDs, or crash telemetry sent to us
- Uploads of the page HTML to a server
- AI or third-party analysis APIs

## Local storage

Optional scan history is stored with `chrome.storage.local` on your device. Each entry includes domain, URL, timestamp, overall score, and error/warning counts. History does **not** include the page DOM or form values. You can clear it from the popup.

JSON export, “Copy Summary”, and “Copy Markdown” stay on your device (a file download or the clipboard).

## Permissions

| Permission | Why |
|---|---|
| `activeTab` | Read the page you opened the extension on |
| `scripting` | Run a read-only snapshot of that page |
| `storage` | Save compact local history |

There is no `<all_urls>` host permission. The extension does not modify the page.

## Children

Quick QA is a developer/QA tool. It is not directed at children.

## Changes

If this policy changes, we will update this file and the date above.

## Optional features

If you click **Check link statuses**, Chrome will ask to contact http/https URLs so Quick QA can read HTTP status codes. This is off unless you grant it. Highlights add temporary outlines on the current tab and can be removed from the on-page banner.

## Contact

Use the GitHub repository for the project: [quick-QA-xtension](https://github.com/Muhamed2805/quick-QA-xtension).
