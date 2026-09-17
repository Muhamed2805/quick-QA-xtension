import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesEmptyAlt: CheckFn = (snapshot) => {
  const empty = snapshot.images.filter((image) => image.alt === '').length;

  if (snapshot.images.length === 0) {
    return imageCheck({
      id: 'img-empty-alt',
      title: 'Images with empty alt',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  return imageCheck({
    id: 'img-empty-alt',
    title: 'Images with empty alt',
    description:
      empty === 0
        ? 'No images use an empty alt string.'
        : `${empty} image(s) use alt="". That is valid for decorative images and should be reviewed.`,
    status: empty === 0 ? 'pass' : 'info',
    severity: 'info',
    currentValue: empty,
    weight: empty === 0 ? 2 : 0,
  });
};
