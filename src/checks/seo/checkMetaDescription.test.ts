import { checkMetaDescriptionExists } from '@/checks/seo/checkMetaDescriptionExists';
import { checkMetaDescriptionLength } from '@/checks/seo/checkMetaDescriptionLength';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('meta description checks', () => {
  it('fails when meta description is missing', () => {
    expect(
      asCheck(checkMetaDescriptionExists(makeSnapshot({ meta: { description: null } }))).status,
    ).toBe('fail');
  });

  it('warns when the description is too short', () => {
    expect(
      asCheck(checkMetaDescriptionLength(makeSnapshot({ meta: { description: 'Too short' } }))).status,
    ).toBe('warning');
  });
});
