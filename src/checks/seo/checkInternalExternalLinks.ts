import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkInternalExternalLinks: CheckFn = (snapshot) => {
  const internal = snapshot.links.filter((link) => link.kind === 'internal').length;
  const external = snapshot.links.filter((link) => link.kind === 'external').length;

  return seoCheck({
    id: 'seo-internal-external-links',
    title: 'Internal vs external links',
    description: `This page has ${internal} internal and ${external} external links. This is a count, not a ranking verdict.`,
    status: 'info',
    severity: 'info',
    currentValue: `${internal} internal / ${external} external`,
    weight: 0,
  });
};
