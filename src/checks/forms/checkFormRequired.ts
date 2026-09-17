import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormRequired: CheckFn = (snapshot) => {
  const count = snapshot.forms
    .flatMap((form) => form.fields)
    .filter((field) => field.required).length;

  return formCheck({
    id: 'forms-required',
    title: 'Required fields',
    description: `${count} field(s) are marked required.`,
    status: 'info',
    severity: 'info',
    currentValue: count,
    weight: 0,
  });
};
