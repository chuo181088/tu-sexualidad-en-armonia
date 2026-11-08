// Server-only provider layer. Implement a new EmailMarketingProvider (e.g. MailerLite)
// and return it from getEmailMarketingProvider(); the UI does not change.
import type { SubscriptionInput } from "./validation";

export type SubscribeResult =
  | { status: "subscribed"; downloadUrl: string | null }
  | { status: "already_subscribed"; downloadUrl: string | null }
  | { status: "not_configured" }
  | { status: "error"; message: string };

export interface EmailMarketingProvider {
  readonly id: string;
  subscribe(input: SubscriptionInput & { consentAt: string }): Promise<SubscribeResult>;
}

/** Demo mode: never sends data anywhere and never fakes a success. */
export const notConfiguredProvider: EmailMarketingProvider = {
  id: "none",
  async subscribe() {
    return { status: "not_configured" };
  },
};

export function getEmailMarketingProvider(): EmailMarketingProvider {
  const id = process.env["EMAIL_PROVIDER"];
  switch (id) {
    // case "mailerlite": return createMailerLiteProvider(process.env.MAILERLITE_API_KEY!, process.env.MAILERLITE_GROUP_ID!);
    default:
      return notConfiguredProvider;
  }
}

/** Ebook link is only handed out after a confirmed subscription. */
export function getEbookDownloadUrl(): string | null {
  return process.env["EBOOK_DOWNLOAD_URL"] || null;
}
