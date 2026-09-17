import { META_DESCRIPTION_LENGTH, seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkMetaDescriptionLength: CheckFn = (snapshot) => {
  const description = snapshot.meta.description?.trim() ?? '';
  if (!description) return null;

  const length = description.length;
  const inRange = length >= META_DESCRIPTION_LENGTH.min && length <= META_DESCRIPTION_LENGTH.max;

  if (inRange) {
    return seoCheck({
      id: 'seo-meta-description-length',
      title: 'Meta description length',
      description: `The meta description is ${length} characters, within the common ${META_DESCRIPTION_LENGTH.min}–${META_DESCRIPTION_LENGTH.max} character recommendation.`,
      status: 'pass',
      severity: 'info',
      currentValue: length,
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-meta-description-length',
    title: 'Meta description length',
    description: `The meta description is ${length} characters. About ${META_DESCRIPTION_LENGTH.min}–${META_DESCRIPTION_LENGTH.max} characters is a common display guideline, not a ranking rule.`,
    status: 'warning',
    severity: 'warning',
    recommendation: `Rewrite the description to roughly ${META_DESCRIPTION_LENGTH.min}–${META_DESCRIPTION_LENGTH.max} characters so it is more likely to display fully in search results.`,
    currentValue: length,
    weight: 4,
  });
};
