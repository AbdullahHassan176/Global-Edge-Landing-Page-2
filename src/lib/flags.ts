/**
 * Feature flags for controlling application functionality
 * Set via environment variables in .env.local
 */

export const FEATURE_FINANCING = process.env.NEXT_PUBLIC_FEATURE_FINANCING === "true";
export const FEATURE_OPS = process.env.NEXT_PUBLIC_FEATURE_OPS === "true";

/**
 * Helper function to check if a feature is enabled
 */
export function isFeatureEnabled(feature: 'financing' | 'ops'): boolean {
  switch (feature) {
    case 'financing':
      return FEATURE_FINANCING;
    case 'ops':
      return FEATURE_OPS;
    default:
      return false;
  }
}

/**
 * Get all enabled features as an object
 */
export function getEnabledFeatures() {
  return {
    financing: FEATURE_FINANCING,
    ops: FEATURE_OPS,
  };
}

/**
 * Feature flag descriptions for documentation
 */
export const FEATURE_DESCRIPTIONS = {
  financing: 'Enables financing features like investor dashboard and funding flows',
  ops: 'Enables operations features like exception management and admin tools',
} as const;
