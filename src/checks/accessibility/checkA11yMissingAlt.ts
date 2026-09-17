import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yMissingAlt: CheckFn = (snapshot) => {
  const total = snapshot.images.length;
  const missing = snapshot.images.filter((image) => image.alt === null).length;

  if (total === 0) {
    return a11yCheck({
      id: 'a11y-missing-alt',
      title: 'Images missing alt attributes',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return a11yCheck({
      id: 'a11y-missing-alt',
      title: 'Images missing alt attributes',
      description: 'Every image has an alt attribute. This is not a WCAG certification.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 6,
    });
  }

  return a11yCheck({
    id: 'a11y-missing-alt',
    title: 'Images missing alt attributes',
    description: `${missing} of ${total} images omit alt. Screen readers then announce the file name or skip the image.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Add alt text that describes the image purpose. Use alt="" only for decorative images.',
    currentValue: missing,
    weight: 6,
  });
};
