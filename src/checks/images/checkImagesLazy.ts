import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesLazy: CheckFn = (snapshot) => {
  const lazy = snapshot.images.filter((image) => image.loading === 'lazy').length;

  return imageCheck({
    id: 'img-lazy',
    title: 'Lazy-loaded images',
    description:
      snapshot.images.length === 0
        ? 'No images were found.'
        : `${lazy} of ${snapshot.images.length} images use loading="lazy".`,
    status: 'info',
    severity: 'info',
    currentValue: lazy,
    weight: 0,
  });
};
