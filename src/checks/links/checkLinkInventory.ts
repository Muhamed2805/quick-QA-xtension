import { linksCheck } from '@/checks/links/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkLinkInventory: CheckFn = (snapshot) => {
  const total = snapshot.links.length;
  const counts = {
    internal: snapshot.links.filter((item) => item.kind === 'internal').length,
    external: snapshot.links.filter((item) => item.kind === 'external').length,
    anchor: snapshot.links.filter((item) => item.kind === 'anchor').length,
    mailto: snapshot.links.filter((item) => item.kind === 'mailto').length,
    tel: snapshot.links.filter((item) => item.kind === 'tel').length,
    newTab: snapshot.links.filter((item) => item.targetBlank).length,
  };

  return linksCheck({
    id: 'links-inventory',
    title: 'Link inventory',
    description: `${total} links: ${counts.internal} internal, ${counts.external} external, ${counts.anchor} in-page, ${counts.mailto} mailto, ${counts.tel} tel, ${counts.newTab} open in a new tab. HTTP status is not checked in v1.`,
    status: 'info',
    severity: 'info',
    currentValue: total,
    weight: 0,
  });
};
