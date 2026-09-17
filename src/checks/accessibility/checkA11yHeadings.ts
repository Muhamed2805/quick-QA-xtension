import { findHeadingSkips } from '@/checks/seo/checkHeadingHierarchy';
import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yHeadings: CheckFn = (snapshot) => {
  if (snapshot.headings.length === 0) {
    return a11yCheck({
      id: 'a11y-heading-structure',
      title: 'Heading structure',
      description: 'No headings were found. Headings help keyboard and screen-reader users skim the page.',
      status: 'warning',
      severity: 'warning',
      currentValue: 0,
      weight: 4,
      recommendation: 'Add headings that outline the page sections.',
    });
  }

  const skips = findHeadingSkips(snapshot.headings);
  if (skips.length === 0) {
    return a11yCheck({
      id: 'a11y-heading-structure',
      title: 'Heading structure',
      description: 'The page has headings and levels do not skip. This is not a WCAG audit.',
      status: 'pass',
      severity: 'info',
      currentValue: snapshot.headings.length,
      weight: 4,
    });
  }

  return a11yCheck({
    id: 'a11y-heading-structure',
    title: 'Heading structure',
    description: `Heading levels skip (${skips.slice(0, 5).join(', ')}). That outline issue is reported once under SEO so it is not counted twice.`,
    status: 'info',
    severity: 'info',
    currentValue: skips.join(', '),
    weight: 0,
  });
};
