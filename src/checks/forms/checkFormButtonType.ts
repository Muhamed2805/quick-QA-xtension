import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormButtonType: CheckFn = (snapshot) => {
  const count = snapshot.forms.reduce((sum, form) => sum + form.buttonsWithoutType, 0);

  if (snapshot.forms.length === 0) {
    return formCheck({
      id: 'forms-button-type',
      title: 'Buttons without type',
      description: 'No forms were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (count === 0) {
    return formCheck({
      id: 'forms-button-type',
      title: 'Buttons without type',
      description: 'Form buttons declare a type attribute.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return formCheck({
    id: 'forms-button-type',
    title: 'Buttons without type',
    description: `${count} <button> element(s) omit type and therefore default to submit.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Set type="button" for actions that should not submit, or type="submit" explicitly.',
    currentValue: count,
    weight: 3,
  });
};
