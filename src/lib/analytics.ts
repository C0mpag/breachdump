export const trackEvent = (event: string, payload: Record<string, string | number | boolean> = {}) => {
  if (typeof window === 'undefined') return;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (metaPixelId && typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, payload);
  }
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
