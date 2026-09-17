import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormPasswords: CheckFn = (snapshot) => {
  const count = snapshot.forms.reduce((sum, form) => sum + form.passwordFieldCount, 0);

  return formCheck({
    id: 'forms-passwords',
    title: 'Password fields',
    description:
      count === 0
        ? 'No password fields were detected. Values are never read.'
        : `${count} password field(s) were detected. Values are never read.`,
    status: 'info',
    severity: 'info',
    currentValue: count,
    weight: 0,
  });
};
