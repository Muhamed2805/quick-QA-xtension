import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormPlaceholders: CheckFn = (snapshot) => {
  const fields = snapshot.forms.flatMap((form) =>
    form.fields.filter((field) => field.tag === 'input' || field.tag === 'textarea'),
  );
  const missing = fields.filter((field) => !field.hasPlaceholder).length;

  return formCheck({
    id: 'forms-placeholders',
    title: 'Inputs missing placeholders',
    description:
      fields.length === 0
        ? 'No text fields were found.'
        : `${missing} of ${fields.length} text fields have no placeholder. Placeholders are optional and are not a replacement for labels.`,
    status: 'info',
    severity: 'info',
    currentValue: missing,
    weight: 0,
  });
};
