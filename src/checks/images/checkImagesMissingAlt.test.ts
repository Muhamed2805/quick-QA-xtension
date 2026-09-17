import { checkImagesMissingAlt } from '@/checks/images/checkImagesMissingAlt';
import { checkMissingAlt } from '@/checks/seo/checkMissingAlt';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('image alt checks', () => {
  it('warns SEO when alt is missing', () => {
    const snapshot = makeSnapshot({
      images: [
        {
          src: '/a.png',
          alt: null,
          width: 10,
          height: 10,
          naturalWidth: 10,
          naturalHeight: 10,
          loading: null,
          hasWidthAttr: true,
          hasHeightAttr: true,
          broken: false,
          status: 'missing-alt',
        },
      ],
    });
    expect(asCheck(checkMissingAlt(snapshot)).status).toBe('warning');
    expect(asCheck(checkImagesMissingAlt(snapshot)).status).toBe('fail');
  });

  it('passes when alt is present', () => {
    expect(asCheck(checkMissingAlt(makeSnapshot())).status).toBe('pass');
  });
});
