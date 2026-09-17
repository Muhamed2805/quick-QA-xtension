import { checkTitleExists } from '@/checks/seo/checkTitleExists';
import { checkTitleLength } from '@/checks/seo/checkTitleLength';
import { asCheck } from '@/test/asCheck';
import { makeSnapshot } from '@/test/makeSnapshot';
import { describe, expect, it } from 'vitest';

describe('title checks', () => {
  it('fails when the title is missing', () => {
    expect(asCheck(checkTitleExists(makeSnapshot({ title: '   ' }))).status).toBe('fail');
  });

  it('passes when a title exists', () => {
    expect(asCheck(checkTitleExists(makeSnapshot({ title: 'Example Domain homepage' }))).status).toBe(
      'pass',
    );
  });

  it('warns when title length is outside the recommendation', () => {
    const result = asCheck(checkTitleLength(makeSnapshot({ title: 'Hi' })));
    expect(result.status).toBe('warning');
    expect(result.currentValue).toBe(2);
  });

  it('skips length when title is empty', () => {
    expect(checkTitleLength(makeSnapshot({ title: '' }))).toBeNull();
  });
});
