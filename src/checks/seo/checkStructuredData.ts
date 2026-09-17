import { seoCheck } from '@/checks/seo/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkStructuredData: CheckFn = (snapshot) => {
  const count = snapshot.documentHints.jsonLdCount;

  if (count > 0) {
    return seoCheck({
      id: 'seo-json-ld',
      title: 'JSON-LD structured data',
      description: 'The page includes JSON-LD. Quick QA does not validate the schema itself.',
      status: 'pass',
      severity: 'info',
      currentValue: count,
      weight: 0,
    });
  }

  return seoCheck({
    id: 'seo-json-ld',
    title: 'JSON-LD structured data',
    description:
      'No JSON-LD script was found. That is fine if you do not use structured data; search features that depend on it will not appear.',
    status: 'info',
    severity: 'info',
    recommendation: 'Add application/ld+json for Organization, WebSite, Product, or Article when those types apply.',
    currentValue: 0,
    weight: 0,
  });
};
