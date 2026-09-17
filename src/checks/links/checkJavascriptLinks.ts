import { linksCheck } from '@/checks/links/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkJavascriptLinks: CheckFn = (snapshot) => {
  const count = snapshot.links.filter((item) => item.kind === 'javascript').length;

  if (count === 0) {
    return linksCheck({
      id: 'links-javascript',
      title: 'javascript: links',
      description: 'No javascript: URLs were found.',
      status: 'pass',
      severity: 'info',
      currentValue: 0,
      weight: 3,
    });
  }

  return linksCheck({
    id: 'links-javascript',
    title: 'javascript: links',
    description: `${count} link(s) use javascript: hrefs, which are brittle and unfriendly to crawlers.`,
    status: 'warning',
    severity: 'warning',
    recommendation: 'Use a real URL or a button with an event handler instead of javascript: links.',
    currentValue: count,
    weight: 3,
  });
};
