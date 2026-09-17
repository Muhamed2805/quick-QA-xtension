export type QACategory =
  | 'seo'
  | 'accessibility'
  | 'links'
  | 'images'
  | 'forms'
  | 'content'
  | 'technical';

export type QASeverity = 'info' | 'warning' | 'error';

export type QAStatus = 'pass' | 'warning' | 'fail' | 'info';

export interface QACheckResult {
  id: string;
  category: QACategory;
  title: string;
  description: string;
  status: QAStatus;
  severity: QASeverity;
  recommendation?: string;
  currentValue?: string | number | boolean;
  weight: number;
}

export interface CategorySummary {
  category: QACategory;
  label: string;
  score: number;
  passed: number;
  warnings: number;
  errors: number;
  info: number;
  total: number;
}

export interface ScanSummary {
  overallScore: number;
  passed: number;
  warnings: number;
  errors: number;
  info: number;
  totalChecks: number;
}

export interface PageInfo {
  url: string;
  protocol: string;
  hostname: string;
  title?: string;
  lang?: string | null;
  charset?: string | null;
}

export interface LinkInfo {
  href: string;
  text: string;
  kind: 'internal' | 'external' | 'anchor' | 'mailto' | 'tel' | 'javascript' | 'empty' | 'other';
  targetBlank: boolean;
  rel: string | null;
  hasNoopener: boolean;
  hasNoreferrer: boolean;
}

export interface ImageInfo {
  src: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  naturalWidth?: number | null;
  naturalHeight?: number | null;
  loading?: string | null;
  broken: boolean;
  status: 'ok' | 'missing-alt' | 'empty-alt' | 'broken' | 'oversized' | 'unknown';
}

export interface FormFieldInfo {
  tag: string;
  type: string | null;
  hasName: boolean;
  hasId: boolean;
  hasLabel: boolean;
  hasPlaceholder: boolean;
  required: boolean;
}

export interface FormInfo {
  action: string | null;
  method: string;
  fieldCount: number;
  hasSubmitControl: boolean;
  fields: FormFieldInfo[];
}

export interface ScanResult {
  scannedAt: string;
  page: PageInfo;
  summary: ScanSummary;
  categories: CategorySummary[];
  checks: QACheckResult[];
  links: LinkInfo[];
  images: ImageInfo[];
  forms: FormInfo[];
}

export interface ScanHistoryEntry {
  id: string;
  domain: string;
  url: string;
  timestamp: string;
  overallScore: number;
  errorCount: number;
  warningCount: number;
}

export type RestrictedPageReason =
  | 'chrome-internal'
  | 'new-tab'
  | 'extension-page'
  | 'missing-url'
  | 'no-active-tab'
  | 'cannot-inspect';

export interface ActiveTabInfo {
  tabId: number;
  url: string;
  title: string;
  hostname: string;
  protocol: string;
}

export interface TabAccessError {
  code: RestrictedPageReason;
  message: string;
}
