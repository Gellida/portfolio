import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function safeGtag(...args: unknown[]) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag(...args);
  } catch {
    // ignore analytics errors in client runtime
  }
}

/**
 * Tracks page views on every route change in the SPA.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    safeGtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
}

/**
 * Sends a custom event to Google Analytics.
 */
export function trackEvent(eventName: string, params?: Record<string, string>) {
  safeGtag('event', eventName, params);
}
