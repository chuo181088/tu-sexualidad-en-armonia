// Privacy-first event hook. No tracker is installed; events go to window.dataLayer only
// if a consented analytics tool later creates it.
export type AnalyticsEvent =
  | "landing_view"
  | "form_start"
  | "form_submit"
  | "subscription_confirmed"
  | "download_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  if (import.meta.env.DEV) console.debug("[analytics]", event, props);
}
