import type { ScanResult } from '@/types';
import { topIssues } from '@/utils/checks';

export function toTextSummary(result: ScanResult): string {
  const issues = topIssues(result.checks, 8);
  const categoryLines = result.categories
    .map((item) => `- ${item.label}: ${item.score}`)
    .join('\n');
  const issueLines =
    issues.length === 0
      ? '- None'
      : issues.map((item) => `- [${item.status}] ${item.title}`).join('\n');

  return [
    `Quick QA — ${result.page.hostname}`,
    result.page.url,
    `Score: ${result.summary.overallScore}/100`,
    `Errors: ${result.summary.errors}  Warnings: ${result.summary.warnings}  Passed: ${result.summary.passed}  Info: ${result.summary.info}  Total: ${result.summary.totalChecks}`,
    '',
    'Category scores',
    categoryLines,
    '',
    'Top issues',
    issueLines,
    '',
    'Generated locally. Page content was not uploaded.',
  ].join('\n');
}

export async function copyTextSummary(result: ScanResult): Promise<void> {
  const text = toTextSummary(result);
  await navigator.clipboard.writeText(text);
}
