export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function headingLevelFrom(tagName: string, role: string | null, ariaLevel: string | null): HeadingLevel | null {
  const tag = tagName.toLowerCase();
  if (/^h[1-6]$/.test(tag)) {
    return Number(tag[1]) as HeadingLevel;
  }

  if ((role ?? '').toLowerCase() === 'heading') {
    const level = Number(ariaLevel);
    if (level >= 1 && level <= 6) {
      return level as HeadingLevel;
    }
  }

  return null;
}

export function countH1(headings: { level: HeadingLevel }[]): number {
  return headings.filter((item) => item.level === 1).length;
}
