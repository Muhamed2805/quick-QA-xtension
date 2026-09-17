import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTwitterCard: CheckFn = (snapshot) => {
  const card = snapshot.meta.twitterCard?.trim() ?? '';
  const title = snapshot.meta.twitterTitle?.trim() || snapshot.meta.ogTitle?.trim() || '';
  const image = snapshot.meta.twitterImage?.trim() || snapshot.meta.ogImage?.trim() || '';

  if (!card) {
    return seoCheck({
      id: 'seo-twitter-card',
      title: 'Twitter Card metadata',
      description: 'twitter:card is missing. X/Twitter previews may fall back to a basic link without a card layout.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Add twitter:card (for example summary_large_image) plus title and image tags, or rely on complete Open Graph tags.',
      currentValue: '(missing)',
      weight: 2,
    });
  }

  if (!title || !image) {
    return seoCheck({
      id: 'seo-twitter-card',
      title: 'Twitter Card metadata',
      description: `twitter:card is set to "${card}", but title or image metadata is still incomplete.`,
      status: 'warning',
      severity: 'warning',
      recommendation: 'Provide twitter:title and twitter:image, or matching og:title and og:image values.',
      currentValue: card,
      weight: 2,
    });
  }

  return seoCheck({
    id: 'seo-twitter-card',
    title: 'Twitter Card metadata',
    description: 'Twitter Card type, title, and image metadata are present (including Open Graph fallbacks).',
    status: 'pass',
    severity: 'info',
    currentValue: card,
    weight: 2,
  });
};
