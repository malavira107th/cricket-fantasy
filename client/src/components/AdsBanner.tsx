import { X } from "lucide-react";
import { useState } from "react";
import { useAdsBanner } from "@/hooks/useAdsBanner";

/**
 * Ads Banner Component - Fairplay Promotional Banner
 * Shows promotional image to users coming from Google Ads (UTM tracking)
 */
export default function AdsBanner() {
  const { showBanner } = useAdsBanner();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if not from ads or if dismissed
  if (!showBanner || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('adsBannerDismissed', 'true');
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600">
      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Clickable Banner Image */}
      <a 
        href="https://wa.link/fairplusad" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full"
      >
        <img 
          src="/fairplay-banner.png" 
          alt="Fairplay - 500% Joining Bonus - Click here to WhatsApp" 
          className="w-full h-auto max-w-2xl mx-auto object-contain py-8 px-4"
        />
      </a>
    </section>
  );
}
