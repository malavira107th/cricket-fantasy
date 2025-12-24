import { useAdsBanner } from "@/hooks/useAdsBanner";

/**
 * Ads Banner Component - Fairplay Promotional Banner
 * Shows promotional image to users coming from Google Ads (UTM tracking)
 */
export default function AdsBanner() {
  const { showBanner } = useAdsBanner();

  // Don't show if not from ads
  if (!showBanner) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600">
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
