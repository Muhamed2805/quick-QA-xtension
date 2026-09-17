import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkCharset: CheckFn = (snapshot) => {
  const charset = snapshot.charset?.trim() ?? '';

  if (!charset) {
    return technicalCheck({
      id: 'tech-charset',
      title: 'Document charset',
      description: 'No document character set was reported.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Declare UTF-8 via <meta charset="utf-8">.',
      currentValue: '(unknown)',
      weight: 3,
    });
  }

  return technicalCheck({
    id: 'tech-charset',
    title: 'Document charset',
    description: `Character set is ${charset}.`,
    status: 'pass',
    severity: 'info',
    currentValue: charset,
    weight: 3,
  });
};
