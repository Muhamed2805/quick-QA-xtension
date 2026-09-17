import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yAria: CheckFn = (snapshot) => {
  const count = snapshot.ariaHints.length;

  if (count === 0) {
    return a11yCheck({
      id: 'a11y-aria-hints',
      title: 'Obvious ARIA issues',
      description: 'No obvious ARIA mismatches were detected (broken labelledby ids or aria-hidden around focusable content). This is not a full ARIA audit.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  const sample = snapshot.ariaHints
    .slice(0, 3)
    .map((item) => item.issue)
    .join('; ');

  return a11yCheck({
    id: 'a11y-aria-hints',
    title: 'Obvious ARIA issues',
    description: `${count} obvious ARIA problem(s) were detected. Example: ${sample}.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Fix labelledby references and do not hide focusable content with aria-hidden.',
    currentValue: count,
    weight: 3,
  });
};
