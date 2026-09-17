import type { CheckFn } from '@/checks/runChecks';

/**
 * Register QA rules here as they are implemented.
 * M2 ships an empty registry so the engine is live without scoring noise.
 */
export const checkRegistry: CheckFn[] = [];
