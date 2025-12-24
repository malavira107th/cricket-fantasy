import { useEffect, useState } from 'react';

/**
 * Hook to determine if ads banner should be shown
 * Shows banner to users coming from Google Ads (utm_source=google or gclid parameter)
 */
export function useAdsBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user came from Google Ads
    const urlParams = new URLSearchParams(window.location.search);
    const hasGoogleAds = 
      urlParams.has('gclid') || // Google Click ID
      urlParams.get('utm_source') === 'google' || // UTM source
      urlParams.get('utm_medium') === 'cpc'; // Cost-per-click campaigns

    if (hasGoogleAds) {
      setShowBanner(true);
      // Store in sessionStorage so banner persists during session
      sessionStorage.setItem('fromGoogleAds', 'true');
    } else {
      // Check if user came from ads earlier in this session
      const fromAds = sessionStorage.getItem('fromGoogleAds');
      setShowBanner(fromAds === 'true');
    }
  }, []);

  return { showBanner };
}
