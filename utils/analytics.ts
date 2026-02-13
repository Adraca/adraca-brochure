import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

/**
 * Helper to check if the user has granted consent for analytics.
 */
const hasConsent = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adraca-cookie-consent') === 'granted';
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  // Respect Privacy Standards: Do not send events if consent is not granted
  if (!hasConsent()) return;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${category} - ${action}`, { label, value });
  }

  // Google Analytics 4 Event
  sendGAEvent('event', action, {
    category,
    label,
    value,
  });

  // Google Tag Manager Event
  sendGTMEvent({
    event: action,
    category,
    action, // Redundant but often used in GTM
    label,
    value,
  });
};

export const trackPageView = (url: string) => {
  // Respect Privacy Standards: Do not send events if consent is not granted
  if (!hasConsent()) return;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Page View: ${url}`);
  }

  // GTM mostly uses history change triggers, but we can push a virtual pageview if needed
  sendGTMEvent({
    event: 'page_view',
    page_path: url,
  });
};
