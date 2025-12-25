/**
 * This hook has been REMOVED to comply with Google Ads policies.
 * Detecting Google Ads traffic and altering content is considered cloaking.
 * All users must see identical content regardless of traffic source.
 */
export function useAdsBanner() {
  // Always return false - no banner detection
  return { showBanner: false };
}
