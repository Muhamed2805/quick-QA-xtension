import { technicalCheck } from '@/checks/technical/helpers';
import type { CheckFn } from '@/checks/runChecks';

export const checkAssets: CheckFn = (snapshot) => {
  const { scriptCount, stylesheetCount, inlineScriptCount, inlineStyleCount } = snapshot.technical;

  return technicalCheck({
    id: 'tech-assets',
    title: 'Scripts and styles',
    description: `${scriptCount} script(s) (${inlineScriptCount} inline), ${stylesheetCount} stylesheet(s), ${inlineStyleCount} element(s) with inline style. These counts are not a Lighthouse score.`,
    status: 'info',
    severity: 'info',
    currentValue: `${scriptCount} scripts / ${stylesheetCount} styles`,
    weight: 0,
  });
};
