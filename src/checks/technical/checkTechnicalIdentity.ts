import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkTechnicalIdentity: CheckFn = (snapshot) => {
  return technicalCheck({
    id: 'tech-identity',
    title: 'Page address',
    description: `${snapshot.protocol.toUpperCase()} · ${snapshot.hostname} · ${snapshot.url}`,
    status: 'info',
    severity: 'info',
    currentValue: snapshot.url,
    weight: 0,
  });
};
