import { useState, useEffect } from "react";

/**
 * Ads Banner Component
 * Displays ONLY when ALL conditions are met:
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
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for common bot patterns
  for (const pattern of BOT_PATTERNS) {
    if (userAgent.includes(pattern)) {
      return true;
    }
  }
  
  // Additional bot detection checks
  // Check if webdriver is present (common in automation tools)
  if ((navigator as any).webdriver) {
    return true;
  }
  
  // Check for headless browser indicators
  if (!(window as any).chrome && userAgent.includes('chrome')) {
    return true;
  }
  
  return false;
}

function isMobileDevice(): boolean {
  return window.innerWidth < 768;
}

function isFromGoogleAds(): boolean {
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

export default function AdsBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Don't show to bots
    if (isBot()) {
      return;
    }
    
    // Only show on mobile
    if (!isMobileDevice()) {
      return;
    }
    
    // Only show for Google Ads traffic
    if (!isFromGoogleAds()) {
      return;
    }
    
    // All conditions met - show banner
    setShowBanner(true);
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <section className="w-full bg-gradient-to-b from-purple-900 to-purple-800">
      <a 
        href="https://wa.link/fairplusad" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full"
      >
        <img 
          src="/ads-banner.webp" 
          alt="Special Offer - Click to WhatsApp"
          className="w-full h-auto"
          loading="eager"
        />
      </a>
    </section>
  );
}
