import { visibleCrawlableLinks, isNamelessLink } from '@/utils/links';
import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkEmptyLinkText: CheckFn = (snapshot) => {
  const candidates = visibleCrawlableLinks(snapshot.links);
  const empty = candidates.filter(isNamelessLink).length;

  if (candidates.length === 0) {
    return seoCheck({
      id: 'seo-empty-link-text',
      title: 'Links with empty text',
      description: 'No crawlable links were found.',
      status: 'info',
      severity: 'info',
      currentValue: 0,
      weight: 0,
    });
  }

  if (empty === 0) {
    return seoCheck({
      id: 'seo-empty-link-text',
      title: 'Links with empty text',
      description: 'Crawlable links include visible text, aria-label, or image alt text.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-empty-link-text',
    title: 'Links with empty text',
    description: `${empty} link(s) have no accessible name (no text, aria-label, or image alt).`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Give every link meaningful text, aria-label, or an image with alt text.',
    currentValue: empty,
    weight: 4,
  });
};
