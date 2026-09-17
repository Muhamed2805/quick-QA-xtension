import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFavicon: CheckFn = (snapshot) => {
  const favicon = snapshot.favicon?.trim() ?? '';

  if (!favicon) {
    return technicalCheck({
      id: 'tech-favicon',
      title: 'Favicon',
      description: 'No favicon link was found in the document.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add a <link rel="icon"> so browser tabs can identify the site.',
      currentValue: '(missing)',
      weight: 2,
    });
  }

  return technicalCheck({
    id: 'tech-favicon',
    title: 'Favicon',
    description: 'A favicon link is present.',
    status: 'pass',
    severity: 'info',
    currentValue: favicon,
    weight: 2,
  });
};
