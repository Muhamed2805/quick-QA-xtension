import { linksCheck } from '@/checks/links/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTargetBlank: CheckFn = (snapshot) => {
  const blank = snapshot.links.filter((item) => item.targetBlank);
  const unsafe = blank.filter((item) => !item.hasNoopener && !item.hasNoreferrer).length;

  if (blank.length === 0) {
    return linksCheck({
      id: 'links-target-blank',
      title: 'New-tab links',
      description: 'No links use target="_blank".',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  if (unsafe === 0) {
    return linksCheck({
      id: 'links-target-blank',
      title: 'New-tab links',
      description: `${blank.length} link(s) open in a new tab and include rel="noopener" or rel="noreferrer".`,
      status: 'pass',
      severity: 'info',
      currentValue: blank.length,
      weight: 3,
    });
  }

  return linksCheck({
    id: 'links-target-blank',
    title: 'New-tab links without noopener',
    description: `${unsafe} of ${blank.length} target="_blank" links omit rel="noopener" and rel="noreferrer".`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Add rel="noopener noreferrer" on target="_blank" links to avoid tab-napping.',
    currentValue: unsafe,
    weight: 3,
  });
};
