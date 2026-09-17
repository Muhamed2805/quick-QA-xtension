import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesDimensions: CheckFn = (snapshot) => {
  const missing = snapshot.images.filter((image) => !image.hasWidthAttr || !image.hasHeightAttr).length;

  if (snapshot.images.length === 0) {
    return imageCheck({
      id: 'img-dimensions',
      title: 'Images missing width/height',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return imageCheck({
      id: 'img-dimensions',
      title: 'Images missing width/height',
      description: 'Images declare width and height attributes, which helps reduce layout shift.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return imageCheck({
    id: 'img-dimensions',
    title: 'Images missing width/height',
    description: `${missing} image(s) omit width or height attributes.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Set width and height (or CSS aspect-ratio) so the layout does not jump while images load.',
    currentValue: missing,
    weight: 3,
  });
};
