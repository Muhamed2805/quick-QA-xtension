import { a11yCheck } from '@/checks/accessibility/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkA11yEmptyAlt: CheckFn = (snapshot) => {
  const suspicious = snapshot.images.filter((image) => {
    if (image.alt !== '') return false;
    const wide = (image.naturalWidth ?? image.width ?? 0) >= 80;
    const tall = (image.naturalHeight ?? image.height ?? 0) >= 80;
    return wide && tall;
  }).length;

  if (snapshot.images.length === 0) {
    return a11yCheck({
      id: 'a11y-empty-alt',
      title: 'Suspicious empty alt text',
      description: 'No images were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (suspicious === 0) {
    return a11yCheck({
      id: 'a11y-empty-alt',
      title: 'Suspicious empty alt text',
      description: 'No large images use empty alt text. Empty alt is still valid for small decorative images.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return a11yCheck({
    id: 'a11y-empty-alt',
    title: 'Suspicious empty alt text',
    description: `${suspicious} larger image(s) use alt="". That hides them from assistive technology even if they look informative.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Use empty alt only for decorative images. Describe informative photos.',
    currentValue: suspicious,
    weight: 3,
  });
};
