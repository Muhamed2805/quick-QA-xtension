import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormLabels: CheckFn = (snapshot) => {
  const fields = snapshot.forms.flatMap((form) => form.fields.filter((field) => field.tag !== 'button'));
  const missing = fields.filter((field) => !field.hasLabel).length;

  if (snapshot.forms.length === 0) {
    return formCheck({
      id: 'forms-labels',
      title: 'Inputs missing labels',
      description: 'No forms were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return formCheck({
      id: 'forms-labels',
      title: 'Inputs missing labels',
      description: 'Form controls (excluding buttons) have associated labels.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 6,
    });
  }

  return formCheck({
    id: 'forms-labels',
    title: 'Inputs missing labels',
    description: `${missing} form control(s) are missing a <label> association.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Wrap the field in a label or set label[for] to the field id.',
    currentValue: missing,
    weight: 6,
  });
};
