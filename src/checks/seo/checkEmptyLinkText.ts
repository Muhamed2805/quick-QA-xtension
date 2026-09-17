import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkEmptyLinkText: CheckFn = (snapshot) => {
  const candidates = snapshot.links.filter(
    (link) => link.kind !== 'empty' && link.kind !== 'javascript',
  );
  const empty = candidates.filter((link) => !link.text.trim()).length;

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
      description: 'Crawlable links include visible or accessible text.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 4,
    });
  }

  return seoCheck({
    id: 'seo-empty-link-text',
    title: 'Links with empty text',
    description: `${empty} link(s) have no text. Crawlers and users may not understand the destination.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Give every link meaningful text, or an image with alt text inside the link.',
    currentValue: empty,
    weight: 4,
  });
};
