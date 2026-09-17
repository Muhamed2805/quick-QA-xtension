import {
  contentCheck,
  HEADING_TEST_PATTERN,
  PLACEHOLDER_PATTERNS,
} from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export function findPlaceholderHits(text: string, headings: string[]): string[] {
  const hits = new Set<string>();
  for (const item of PLACEHOLDER_PATTERNS) {
    if (item.pattern.test(text)) hits.add(item.id);
  }
  if (headings.some((heading) => HEADING_TEST_PATTERN.test(heading))) {
    hits.add('test');
  }
  return [...hits];
}

export const checkPlaceholders: CheckFn = (snapshot) => {
  const hits = findPlaceholderHits(
    snapshot.content.visibleText,
    snapshot.headings.map((item) => item.text),
  );

  if (hits.length === 0) {
    return contentCheck({
      id: 'content-placeholders',
      title: 'Placeholder content',
      description: 'No common placeholder strings (lorem ipsum, TODO, dummy, placeholder, or “test” in headings) were found.',
      status: 'pass',
      severity: 'info',
      currentValue: '(none)',
      weight: 4,
    });
  }

  return contentCheck({
    id: 'content-placeholders',
    title: 'Placeholder content',
    description: `Possible leftover copy: ${hits.join(', ')}. Detection is heuristic and can be tuned later.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Replace placeholder copy with production content before launch.',
    currentValue: hits.join(', '),
    weight: 4,
  });
};
