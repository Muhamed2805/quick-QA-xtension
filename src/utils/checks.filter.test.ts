import { toMarkdownIssues } from '@/export/toMarkdown';
import { runScan } from '@/engine/runScan';
import { makeSnapshot } from '@/test/makeSnapshot';
import { filterChecks } from '@/utils/checks';
import { describe, expect, it } from 'vitest';

describe('filterChecks', () => {
  it('filters by status and query', () => {
    const checks = runScan(makeSnapshot()).checks;
    const errors = filterChecks(checks, 'errors');
    expect(errors.every((item) => item.status === 'fail')).toBe(true);
    const titled = filterChecks(checks, 'all', 'title');
    expect(titled.some((item) => item.title.toLowerCase().includes('title'))).toBe(true);
  });
});

describe('toMarkdownIssues', () => {
  it('includes score and an issues heading', () => {
    const md = toMarkdownIssues(runScan(makeSnapshot()));
    expect(md).toContain('# Quick QA — example.com');
    expect(md).toContain('## Issues');
    expect(md).toContain('Score:');
  });
});
