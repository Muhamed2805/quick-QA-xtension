import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkMissingAlt: CheckFn = (snapshot) => {
  const total = snapshot.images.length;
  const missing = snapshot.images.filter((image) => image.alt === null).length;

  if (total === 0) {
    return seoCheck({
      id: 'seo-missing-alt',
      title: 'Image alt attributes',
      description: 'The page has no images, so alt attributes do not apply.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (missing === 0) {
    return seoCheck({
      id: 'seo-missing-alt',
      title: 'Image alt attributes',
      description: 'Every image includes an alt attribute (empty alt is allowed for decorative images).',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 5,
    });
  }

  return seoCheck({
    id: 'seo-missing-alt',
    title: 'Missing alt attributes',
    description: `${missing} of ${total} images have no alt attribute. Search and assistive tools then have no text equivalent.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Add descriptive alt text for informative images. Use alt="" only when the image is decorative.',
    currentValue: missing,
    weight: 5,
  });
};
