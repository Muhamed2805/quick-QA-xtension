import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormActionMethod: CheckFn = (snapshot) => {
  if (snapshot.forms.length === 0) {
    return formCheck({
      id: 'forms-action-method',
      title: 'Form action and method',
      description: 'No forms were found.',
      status: 'info',
      severity: 'info',
      currentValue: '(none)',
      weight: 0,
    });
  }

  const summary = snapshot.forms
    .slice(0, 5)
    .map((form) => `${(form.method || 'get').toUpperCase()} ${form.action || '(same page)'}`)
    .join('; ');

  return formCheck({
    id: 'forms-action-method',
    title: 'Form action and method',
    description: `Detected ${snapshot.forms.length} form(s): ${summary}.`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.forms.length,
    weight: 0,
  });
};
