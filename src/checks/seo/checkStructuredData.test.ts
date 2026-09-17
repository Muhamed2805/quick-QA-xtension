import { checkHreflang } from '@/checks/seo/checkHreflang';
import { checkStructuredData } from '@/checks/seo/checkStructuredData';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('checkStructuredData', () => {
  it('passes when JSON-LD is present without affecting the score weight', () => {
    const result = asCheck(checkStructuredData(makeSnapshot()));
    expect(result.status).toBe('pass');
    expect(result.weight).toBe(0);
  });

  it('reports missing JSON-LD as info, not a failure', () => {
    const result = asCheck(
      checkStructuredData(makeSnapshot({ documentHints: { jsonLdCount: 0 } })),
    );
    expect(result.status).toBe('info');
  });
});

describe('checkHreflang', () => {
  it('stays informational with or without tags', () => {
    expect(asCheck(checkHreflang(makeSnapshot({ documentHints: { hreflangCount: 0 } }))).status).toBe(
      'info',
    );
    expect(asCheck(checkHreflang(makeSnapshot({ documentHints: { hreflangCount: 3 } }))).status).toBe(
      'info',
    );
  });
});
