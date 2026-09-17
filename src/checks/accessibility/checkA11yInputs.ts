import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yInputs: CheckFn = (snapshot) => {
  const total = snapshot.inputs.length;
  const unlabeled = snapshot.inputs.filter((input) => !input.hasLabel && !input.hasAriaName).length;

  if (total === 0) {
    return a11yCheck({
      id: 'a11y-input-labels',
      title: 'Inputs without labels',
      description: 'No visible form fields were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (unlabeled === 0) {
    return a11yCheck({
      id: 'a11y-input-labels',
      title: 'Inputs without labels',
      description: 'Form fields have a label or accessible name.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 7,
    });
  }

  return a11yCheck({
    id: 'a11y-input-labels',
    title: 'Inputs without labels',
    description: `${unlabeled} of ${total} fields have no label, aria-label, or aria-labelledby. Placeholder text is not a substitute.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Associate each field with a <label>, or provide aria-label / aria-labelledby.',
    currentValue: unlabeled,
    weight: 7,
  });
};
