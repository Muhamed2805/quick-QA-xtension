import type { ScanResult } from '@/types';

export function shouldExplainFormsVsAccessibility(result: ScanResult): boolean {
  const forms = result.categories.find((item) => item.category === 'forms');
  const accessibility = result.categories.find((item) => item.category === 'accessibility');
  if (!forms || !accessibility) return false;

  const outsideFormIssues = result.checks.some(
    (item) =>
      (item.id === 'a11y-input-labels' ||
        item.id === 'a11y-buttons-name' ||
        item.id === 'a11y-empty-links') &&
      (item.status === 'fail' || item.status === 'warning'),
  );

  return forms.score >= 85 && accessibility.score < 80 && outsideFormIssues;
}
