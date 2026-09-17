import { linksCheck } from '@/checks/links/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkEmptyHref: CheckFn = (snapshot) => {
  const empty = snapshot.links.filter((item) => item.kind === 'empty').length;

  if (snapshot.links.length === 0) {
    return linksCheck({
      id: 'links-empty-href',
      title: 'Empty href links',
      description: 'No links were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (empty === 0) {
    return linksCheck({
      id: 'links-empty-href',
      title: 'Empty href links',
      description: 'No links have an empty href.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 4,
    });
  }

  return linksCheck({
    id: 'links-empty-href',
    title: 'Empty href links',
    description: `${empty} link(s) have an empty href, which often goes nowhere.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Point the href to a real URL, or use a button if the control is not a navigation link.',
    currentValue: empty,
    weight: 4,
  });
};
