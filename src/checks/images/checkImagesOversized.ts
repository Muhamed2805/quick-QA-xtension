import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesOversized: CheckFn = (snapshot) => {
  const oversized = snapshot.images.filter((image) => image.status === 'oversized').length;

  if (snapshot.images.length === 0) {
    return imageCheck({
      id: 'img-oversized',
      title: 'Very large images',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (oversized === 0) {
    return imageCheck({
      id: 'img-oversized',
      title: 'Very large images',
      description: 'No images report natural dimensions of 3000px or more on either axis.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return imageCheck({
    id: 'img-oversized',
    title: 'Very large images',
    description: `${oversized} image(s) have natural dimensions ≥ 3000px. That can slow the page if they are not intended as full-resolution assets.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Serve appropriately sized images for the layout, using srcset where needed.',
    currentValue: oversized,
    weight: 3,
  });
};
