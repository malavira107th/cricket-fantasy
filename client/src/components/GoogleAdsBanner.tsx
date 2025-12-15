import { useState, useEffect } from "react";
import { X } from "lucide-react";

/**
 * Google Ads Banner Component
 * Displays only for:
 * 1. Mobile users (screen width < 768px)
 * 2. Users coming from Google Ads (utm_source=google & utm_medium=cpc)
 */
export default function GoogleAdsBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed in this session
    const wasDismissed = sessionStorage.getItem("googleAdsBannerDismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Check if user is on mobile device
    const isMobile = window.innerWidth < 768;

    // Check URL parameters for Google Ads tracking
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");

    // Show banner only if mobile AND from Google Ads
    const isFromGoogleAds = utmSource === "google" && utmMedium === "cpc";

    if (isMobile && isFromGoogleAds) {
      setShowBanner(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setShowBanner(false);
    sessionStorage.setItem("googleAdsBannerDismissed", "true");
  };

  if (!showBanner || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-blue-700 text-white p-4 shadow-lg animate-slide-up">
      <div className="container flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-bold mb-1">🎉 Welcome from Google!</p>
          <p className="text-xs text-white/90">
            Play Cricket Fantasy for FREE - No money, just fun!
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
