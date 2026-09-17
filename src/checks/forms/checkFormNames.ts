import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormNames: CheckFn = (snapshot) => {
  const fields = snapshot.forms.flatMap((form) => form.fields.filter((field) => field.tag !== 'button'));
  const missing = fields.filter((field) => !field.hasName).length;

  if (fields.length === 0) {
    return formCheck({
      id: 'forms-names',
      title: 'Inputs without name',
      description: 'No form fields were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return formCheck({
      id: 'forms-names',
      title: 'Inputs without name',
      description: 'Form fields expose a name attribute for submission.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 4,
    });
  }

  return formCheck({
    id: 'forms-names',
    title: 'Inputs without name',
    description: `${missing} field(s) have no name attribute and may not submit with the form.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Add a name to each field that should be sent to the server.',
    currentValue: missing,
    weight: 4,
  });
};
