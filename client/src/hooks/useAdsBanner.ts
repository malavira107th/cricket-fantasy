import { useState, useEffect } from "react";

/**
 * Hook to determine if ads banner should be shown
 * Conditions:
 * 1. Mobile device (screen width < 768px)
 * 2. From Google Ads (utm_source=google, utm_medium=cpc, utm_campaign=23301270924)
 * 3. NOT a bot/crawler
 */

// List of common bot user agents to block
const BOT_PATTERNS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'facebookexternalhit',
  'ia_archiver',
  'crawler',
  'spider',
  'bot',
  'crawl',
  'lighthouse',
  'pagespeed',
  'headless',
  'phantom',
  'selenium',
  'puppeteer',
  'playwright'
];

function isBot(): boolean {
  if (typeof navigator === 'undefined') return true;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for common bot patterns
  for (const pattern of BOT_PATTERNS) {
    if (userAgent.includes(pattern)) {
      return true;
    }
  }
  
  // Check if webdriver is present (common in automation tools)
  if ((navigator as any).webdriver) {
    return true;
  }
  
  return false;
}

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

function isFromGoogleAds(): boolean {
  if (typeof window === 'undefined') return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  
  return (
    utmSource === "google" &&
    utmMedium === "cpc" &&
    utmCampaign === "23301270924"
  );
}

export function useAdsBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Don't show to bots
    if (isBot()) {
      setShowBanner(false);
      return;
    }
    
    // Only show on mobile
    if (!isMobileDevice()) {
      setShowBanner(false);
      return;
    }
    
    // Only show for Google Ads traffic
    if (!isFromGoogleAds()) {
      setShowBanner(false);
      return;
    }
    
    // All conditions met - show banner
    setShowBanner(true);
  }, []);

  return { showBanner };
}
