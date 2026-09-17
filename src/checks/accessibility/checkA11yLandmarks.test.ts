import { checkA11yIframes } from '@/checks/accessibility/checkA11yIframes';
import { checkA11yMainLandmark } from '@/checks/accessibility/checkA11yMainLandmark';
import { checkA11ySkipLink } from '@/checks/accessibility/checkA11ySkipLink';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('checkA11ySkipLink', () => {
  it('passes when a skip link is present', () => {
    expect(asCheck(checkA11ySkipLink(makeSnapshot())).status).toBe('pass');
  });

  it('stays informational on short pages without a skip link', () => {
    const result = asCheck(
      checkA11ySkipLink(
        makeSnapshot({
          documentHints: { hasSkipLink: false, visibleLinkCount: 4 },
        }),
      ),
    );
    expect(result.status).toBe('info');
  });

  it('warns on link-heavy pages without a skip link', () => {
    const result = asCheck(
      checkA11ySkipLink(
        makeSnapshot({
          documentHints: { hasSkipLink: false, visibleLinkCount: 40 },
        }),
      ),
    );
    expect(result.status).toBe('warning');
  });
});

describe('checkA11yMainLandmark', () => {
  it('warns when main is missing', () => {
    const result = asCheck(
      checkA11yMainLandmark(makeSnapshot({ documentHints: { hasMainLandmark: false } })),
    );
    expect(result.status).toBe('warning');
  });
});

describe('checkA11yIframes', () => {
  it('warns when iframes lack a title', () => {
    const result = asCheck(
      checkA11yIframes(
        makeSnapshot({ documentHints: { iframeCount: 2, iframesMissingTitle: 1 } }),
      ),
    );
    expect(result.status).toBe('warning');
  });
});
