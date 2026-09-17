import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesMissingAlt: CheckFn = (snapshot) => {
  const total = snapshot.images.length;
  const missing = snapshot.images.filter((image) => image.alt === null).length;

  if (total === 0) {
    return imageCheck({
      id: 'img-missing-alt',
      title: 'Images missing alt',
      description: 'No <img> elements were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return imageCheck({
      id: 'img-missing-alt',
      title: 'Images missing alt',
      description: `All ${total} images declare an alt attribute.`,
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 6,
    });
  }

  return imageCheck({
    id: 'img-missing-alt',
    title: 'Images missing alt',
    description: `${missing} of ${total} images have no alt attribute.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Add alt on every <img>. Use alt="" for decorative images.',
    currentValue: missing,
    weight: 6,
  });
};
