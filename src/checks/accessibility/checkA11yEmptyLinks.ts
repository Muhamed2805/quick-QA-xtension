import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';
import { crawlableLinks, isNamelessLink } from '@/utils/links';

export const checkA11yEmptyLinks: CheckFn = (snapshot) => {
  const candidates = crawlableLinks(snapshot.links);
  const empty = candidates.filter(isNamelessLink).length;

  if (candidates.length === 0) {
    return a11yCheck({
      id: 'a11y-empty-links',
      title: 'Empty links',
      description: 'No crawlable links were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (empty === 0) {
    return a11yCheck({
      id: 'a11y-empty-links',
      title: 'Empty links',
      description: 'Links have an accessible name.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 5,
    });
  }

  return a11yCheck({
    id: 'a11y-empty-links',
    title: 'Empty links',
    description: `${empty} link(s) have no accessible name.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Add link text, aria-label, or a labelled image inside the control.',
    currentValue: empty,
    weight: 5,
  });
};
