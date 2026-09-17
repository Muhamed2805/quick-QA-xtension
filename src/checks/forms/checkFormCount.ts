import { formCheck } from '@/checks/forms/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkFormCount: CheckFn = (snapshot) => {
  return formCheck({
    id: 'forms-count',
    title: 'Forms on the page',
    description: `The page contains ${snapshot.forms.length} form(s). Field values are never collected.`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.forms.length,
    weight: 0,
  });
};
