import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Tracks page views on every route change in the SPA.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
}

/**
 * Sends a custom event to Google Analytics.
 */
export function trackEvent(eventName: string, params?: Record<string, string>) {
  window.gtag('event', eventName, params);
}
