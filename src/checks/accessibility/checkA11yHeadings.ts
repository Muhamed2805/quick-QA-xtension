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
      description: 'Heading levels do not skip. This is a basic outline check, not a WCAG audit.',
      status: 'pass',
      severity: 'info',
      currentValue: snapshot.headings.length,
      weight: 4,
    });
  }

  return a11yCheck({
    id: 'a11y-heading-structure',
    title: 'Heading structure',
    description: `Heading levels skip in ${skips.length} place(s): ${skips.slice(0, 5).join(', ')}.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Avoid skipping levels so the outline stays predictable.',
    currentValue: skips.join(', '),
    weight: 4,
  });
};
