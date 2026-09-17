import type { ScanResult } from '@/types';
import { sortChecks } from '@/utils/checks';
import { APP_VERSION } from '@/version';

export function toMarkdownIssues(result: ScanResult): string {
  const issues = sortChecks(
    result.checks.filter((item) => item.status === 'fail' || item.status === 'warning'),
  );

  const rows = issues.map((item) => {
    const rec = item.recommendation ? `\n  - Fix: ${item.recommendation}` : '';
    const value = item.currentValue !== undefined ? ` (${String(item.currentValue)})` : '';
    return `- **${item.status}** ${item.title}${value} — ${item.description}${rec}`;
  });

  return [
    `# Quick QA — ${result.page.hostname}`,
    '',
    `- URL: ${result.page.url}`,
    `- Score: ${result.summary.overallScore}/100`,
    `- Errors: ${result.summary.errors} · Warnings: ${result.summary.warnings}`,
    `- Extension: ${APP_VERSION} (local scan, not Lighthouse)`,
    '',
    '## Issues',
    '',
    rows.length ? rows.join('\n') : '- None',
    '',
  ].join('\n');
}

export async function copyMarkdownIssues(result: ScanResult): Promise<void> {
  await navigator.clipboard.writeText(toMarkdownIssues(result));
}
