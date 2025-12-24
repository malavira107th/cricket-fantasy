import { X } from "lucide-react";
import { useState } from "react";
import { useAdsBanner } from "@/hooks/useAdsBanner";
import { Button } from "./ui/button";
import { Link } from "wouter";

/**
 * Ads Banner Component
 * Shows a welcome banner to users coming from Google Ads
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
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base font-semibold">
              🎉 Welcome to SDSURABHI! Join thousands playing FREE cricket fantasy.
            </p>
            <p className="text-xs md:text-sm text-white/90 mt-1">
              No entry fees • No prizes • 100% skill-based fun!
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/signup">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90 border-white font-semibold whitespace-nowrap"
              >
                Sign Up Free
              </Button>
            </Link>
            
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
