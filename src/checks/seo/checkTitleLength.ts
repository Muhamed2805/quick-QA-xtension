import { seoCheck, TITLE_LENGTH } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTitleLength: CheckFn = (snapshot) => {
  const title = snapshot.title.trim();
  if (!title) return null;

  const length = title.length;
  const inRange = length >= TITLE_LENGTH.min && length <= TITLE_LENGTH.max;

  if (inRange) {
    return seoCheck({
      id: 'seo-title-length',
      title: 'Page title length',
      description: `The title is ${length} characters, within the common ${TITLE_LENGTH.min}–${TITLE_LENGTH.max} character recommendation.`,
      status: 'pass',
      severity: 'info',
      currentValue: length,
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-title-length',
    title: 'Page title length',
    description: `The title is ${length} characters. Many search results display roughly ${TITLE_LENGTH.min}–${TITLE_LENGTH.max} characters; this is a recommendation, not a hard rule.`,
    status: 'warning',
    severity: 'warning',
    recommendation: `Aim for about ${TITLE_LENGTH.min}–${TITLE_LENGTH.max} characters so the title is specific without being truncated in search results.`,
    currentValue: length,
    weight: 4,
  });
};
