import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component
 * Automatically scrolls to the top of the page whenever the route changes
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [location]); // Re-run whenever location changes

  return null; // This component doesn't render anything
}
