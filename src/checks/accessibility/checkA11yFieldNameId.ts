import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yFieldNameId: CheckFn = (snapshot) => {
  const fields = snapshot.inputs;
  const missing = fields.filter((field) => !field.hasName && !field.hasId).length;

  if (fields.length === 0) {
    return a11yCheck({
      id: 'a11y-field-name-id',
      title: 'Fields missing name or id',
      description: 'No fields to inspect.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return a11yCheck({
      id: 'a11y-field-name-id',
      title: 'Fields missing name or id',
      description: 'Each inspected field has a name or an id, which helps labels and form handling.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return a11yCheck({
    id: 'a11y-field-name-id',
    title: 'Fields missing name or id',
    description: `${missing} field(s) have neither name nor id.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Give fields a name for submission and an id when pairing with a label.',
    currentValue: missing,
    weight: 3,
  });
};
