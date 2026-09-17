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

export type {
  AriaHintSnapshot,
  ButtonSnapshot,
  ContentSnapshot,
  FormFieldInfo,
  FormInfo,
  HeadingInfo,
  ImageInfo,
  InputSnapshot,
  LinkInfo,
  LinkKind,
  PageInfo,
  PageSnapshot,
  PerformanceSnapshot,
  SnapshotLimits,
  SnapshotMeta,
  TabIndexSnapshot,
  TechnicalSnapshot,
} from './snapshot';

import type { FormInfo, ImageInfo, LinkInfo, PageInfo, PageSnapshot } from './snapshot';

export interface ScanResult {
  scannedAt: string;
  page: PageInfo;
  summary: ScanSummary;
  categories: CategorySummary[];
  checks: QACheckResult[];
  links: LinkInfo[];
  images: ImageInfo[];
  forms: FormInfo[];
  snapshot: PageSnapshot;
}

export interface ScanHistoryEntry {
  id: string;
  domain: string;
  url: string;
  timestamp: string;
  overallScore: number;
  errorCount: number;
  warningCount: number;
  categoryScores?: { category: QACategory; label: string; score: number }[];
}

export interface LinkStatusResult {
  href: string;
  ok: boolean;
  status: number | null;
  error?: string;
}

export type RestrictedPageReason =
  | 'chrome-internal'
  | 'new-tab'
  | 'extension-page'
  | 'missing-url'
  | 'no-active-tab'
  | 'cannot-inspect'
  | 'scripting-unavailable'
  | 'injection-failed'
  | 'empty-snapshot'
  | 'tab-changed';

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
