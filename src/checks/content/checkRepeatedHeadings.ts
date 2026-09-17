import { contentCheck } from '@/checks/content/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkRepeatedHeadings: CheckFn = (snapshot) => {
  const seen = new Map<string, number>();
  for (const heading of snapshot.headings) {
    const key = heading.text.trim().toLowerCase();
    if (!key) continue;
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  const repeats = [...seen.values()].filter((count) => count > 1);
  const repeatCount = repeats.reduce((sum, count) => sum + (count - 1), 0);

  if (repeatCount === 0) {
    return contentCheck({
      id: 'content-repeated-headings',
      title: 'Repeated heading text',
      description: 'Heading text is unique.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 2,
    });
  }

  return contentCheck({
    id: 'content-repeated-headings',
    title: 'Repeated heading text',
    description: `${repeatCount} extra heading(s) reuse the same text as another heading.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Use distinct headings so the outline is easier to scan.',
    currentValue: repeatCount,
    weight: 2,
  });
};
