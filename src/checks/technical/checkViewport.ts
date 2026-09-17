import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkViewport: CheckFn = (snapshot) => {
  const viewport = snapshot.technical.viewport?.trim() ?? '';

  if (!viewport) {
    return technicalCheck({
      id: 'tech-viewport',
      title: 'Viewport meta tag',
      description: 'No viewport meta tag was found. Mobile browsers may not size the page as intended.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      currentValue: '(missing)',
      weight: 4,
    });
  }

  return technicalCheck({
    id: 'tech-viewport',
    title: 'Viewport meta tag',
    description: 'A viewport meta tag is present.',
    status: 'pass',
    severity: 'info',
    currentValue: viewport,
    weight: 4,
  });
};
