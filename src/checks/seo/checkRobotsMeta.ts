import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkRobotsMeta: CheckFn = (snapshot) => {
  const robots = snapshot.meta.robots?.trim() ?? '';

  if (!robots) {
    return seoCheck({
      id: 'seo-robots-meta',
      title: 'Robots meta tag',
      description: 'No robots meta tag was found. Crawlers typically index the page unless blocked elsewhere.',
      status: 'info',
      severity: 'info',
      recommendation: 'Add a robots meta tag only if you need to change default indexing or snippet behavior.',
      currentValue: '(none)',
      weight: 0,
    });
  }

  const lower = robots.toLowerCase();
  const blocksIndexing = /\bnoindex\b/.test(lower) || /\bnone\b/.test(lower);

  if (blocksIndexing) {
    return seoCheck({
      id: 'seo-robots-meta',
      title: 'Robots meta tag',
      description: 'The robots meta tag asks crawlers not to index this page.',
      status: 'warning',
      severity: 'warning',
      recommendation: 'Keep noindex only if this page should stay out of search results.',
      currentValue: robots,
      weight: 2,
    });
  }

  return seoCheck({
    id: 'seo-robots-meta',
    title: 'Robots meta tag',
    description: 'A robots meta tag is present and does not block indexing.',
    status: 'pass',
    severity: 'info',
    currentValue: robots,
    weight: 2,
  });
};
