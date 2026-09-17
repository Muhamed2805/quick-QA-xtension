import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yMainLandmark: CheckFn = (snapshot) => {
  if (snapshot.documentHints.hasMainLandmark) {
    return a11yCheck({
      id: 'a11y-main-landmark',
      title: 'Main landmark',
      description: 'The page marks a main content region with <main> or role="main".',
      status: 'pass',
      severity: 'info',
      currentValue: 'present',
      weight: 3,
    });
  }

  return a11yCheck({
    id: 'a11y-main-landmark',
    title: 'Main landmark',
    description:
      'No <main> or role="main" was found. Screen reader users then have a harder time jumping to the page body.',
    status: 'warning',
    severity: 'warning',
    recommendation: 'Wrap the unique page content in <main id="main"> (one per page).',
    currentValue: 'missing',
    weight: 3,
  });
};
