import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yButtons: CheckFn = (snapshot) => {
  const total = snapshot.buttons.length;
  const unnamed = snapshot.buttons.filter((button) => !button.hasAccessibleName).length;

  if (total === 0) {
    return a11yCheck({
      id: 'a11y-buttons-name',
      title: 'Buttons without accessible text',
      description: 'No buttons were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (unnamed === 0) {
    return a11yCheck({
      id: 'a11y-buttons-name',
      title: 'Buttons without accessible text',
      description: 'Buttons expose an accessible name (text, aria-label, or labelled image).',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 6,
    });
  }

  return a11yCheck({
    id: 'a11y-buttons-name',
    title: 'Buttons without accessible text',
    description: `${unnamed} of ${total} buttons have no accessible name.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Put visible text in the button, or aria-label / aria-labelledby that describes the action.',
    currentValue: unnamed,
    weight: 6,
  });
};
