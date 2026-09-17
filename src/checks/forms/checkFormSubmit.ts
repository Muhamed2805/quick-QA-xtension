import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormSubmit: CheckFn = (snapshot) => {
  const missing = snapshot.forms.filter((form) => !form.hasSubmitControl).length;

  if (snapshot.forms.length === 0) {
    return formCheck({
      id: 'forms-submit',
      title: 'Forms without submit buttons',
      description: 'No forms were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return formCheck({
      id: 'forms-submit',
      title: 'Forms without submit buttons',
      description: 'Each form has a submit control.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return formCheck({
    id: 'forms-submit',
    title: 'Forms without submit buttons',
    description: `${missing} form(s) have no submit button or submit input. They may rely on Enter or a custom control.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Include a clear submit control unless the form is submitted only by script.',
    currentValue: missing,
    weight: 3,
  });
};
