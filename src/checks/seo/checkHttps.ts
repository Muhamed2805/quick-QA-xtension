import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkHttps: CheckFn = (snapshot) => {
  const isHttps = snapshot.protocol === 'https';

  if (!isHttps) {
    return seoCheck({
      id: 'seo-https',
      title: 'HTTPS usage',
      description: 'This page is not served over HTTPS. Browsers mark HTTP as not secure, and some search features prefer HTTPS.',
      status: 'fail',
      severity: 'error',
      recommendation: 'Serve the site over HTTPS and redirect HTTP requests to HTTPS.',
      currentValue: snapshot.protocol,
      weight: 6,
    });
  }

  return seoCheck({
    id: 'seo-https',
    title: 'HTTPS usage',
    description: 'The page is served over HTTPS.',
    status: 'pass',
    severity: 'info',
    currentValue: 'https',
    weight: 6,
  });
};
