import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yTabIndex: CheckFn = (snapshot) => {
  const count = snapshot.tabIndexes.length;

  if (count === 0) {
    return a11yCheck({
      id: 'a11y-tabindex',
      title: 'Positive tabindex',
      description: 'No elements use tabindex greater than 0. Positive tabindex often creates a confusing focus order.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return a11yCheck({
    id: 'a11y-tabindex',
    title: 'Positive tabindex',
    description: `${count} element(s) use tabindex > 0, which can trap keyboard users outside the visual order.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Use tabindex="0" or "-1" only. Arrange focus via DOM order instead of positive tabindex.',
    currentValue: count,
    weight: 3,
  });
};
