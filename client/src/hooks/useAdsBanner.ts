/**
 * Hook to determine if ads banner should be shown
 * 
 * CURRENTLY DISABLED - Always returns false
 * 
 * When enabled, conditions are:
 * 1. Mobile device (screen width < 768px)
 * 2. From Google Ads (utm_source=google, utm_medium=cpc, utm_campaign=23301270924)
 * 3. NOT a bot/crawler
 */

export function useAdsBanner() {
  // DISABLED - Always return false
  return { showBanner: false };
}
