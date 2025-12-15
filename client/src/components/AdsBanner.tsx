/**
 * Ads Banner Component - DISABLED
 * 
 * This banner is currently disabled. To enable it, uncomment the code below.
 * 
 * When enabled, it displays ONLY when ALL conditions are met:
 * 1. Mobile device (screen width < 768px)
 * 2. From Google Ads (utm_source=google, utm_medium=cpc, utm_campaign=23301270924)
 * 3. NOT a bot/crawler
 */

export default function AdsBanner() {
  // DISABLED - Return null to hide banner
  return null;
  
  /* 
  // UNCOMMENT BELOW TO ENABLE BANNER
  
  import { useAdsBanner } from "@/hooks/useAdsBanner";
  
  const { showBanner } = useAdsBanner();

  if (!showBanner) {
    return null;
  }

  return (
    <section className="w-full">
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
  */
}
