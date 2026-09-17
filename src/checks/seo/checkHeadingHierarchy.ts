import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';
import type { HeadingInfo } from '@/types';

export function findHeadingSkips(headings: HeadingInfo[]): string[] {
  const skips: string[] = [];
  let previous = 0;

  for (const heading of headings) {
    if (previous > 0 && heading.level > previous + 1) {
      skips.push(`H${previous} → H${heading.level}`);
    }
    previous = heading.level;
  }

  return skips;
}

export const checkHeadingHierarchy: CheckFn = (snapshot) => {
  if (snapshot.headings.length === 0) {
    return seoCheck({
      id: 'seo-heading-hierarchy',
      title: 'Heading hierarchy',
      description: 'No headings were found, so hierarchy could not be evaluated.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  const skips = findHeadingSkips(snapshot.headings);

  if (skips.length === 0) {
    return seoCheck({
      id: 'seo-heading-hierarchy',
      title: 'Heading hierarchy',
      description: 'Heading levels do not skip (for example H2 is not followed by H4).',
      status: 'pass',
      severity: 'info',
      currentValue: snapshot.headings.map((item) => `H${item.level}`).join(' → '),
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-heading-hierarchy',
    title: 'Heading hierarchy',
    description: `Heading levels skip in ${skips.length} place(s): ${skips.slice(0, 5).join(', ')}.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Increase heading levels one step at a time (H1 → H2 → H3) so the outline stays readable.',
    currentValue: skips.join(', '),
    weight: 4,
  });
};
