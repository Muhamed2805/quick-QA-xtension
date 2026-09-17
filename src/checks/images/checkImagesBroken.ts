import { imageCheck } from '@/checks/images/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkImagesBroken: CheckFn = (snapshot) => {
  const broken = snapshot.images.filter((image) => image.broken).length;

  if (snapshot.images.length === 0) {
    return imageCheck({
      id: 'img-broken',
      title: 'Broken images',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (broken === 0) {
    return imageCheck({
      id: 'img-broken',
      title: 'Broken images',
      description: 'No images reported a failed load in the DOM (naturalWidth 0 after complete).',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 5,
    });
  }

  return imageCheck({
    id: 'img-broken',
    title: 'Broken images',
    description: `${broken} image(s) appear broken in the current DOM state.`,
    status: 'fail',
    severity: 'error',
    recommendation: 'Fix the src URL or replace the missing asset.',
    currentValue: broken,
    weight: 5,
  });
};
