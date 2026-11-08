import { describe, expect, it } from "vitest";
import { validateSubscription } from "@/lib/subscription/validation";
import { notConfiguredProvider } from "@/lib/subscription/provider";

const ok = { name: "Lucía", email: "lucia@ejemplo.com", consent: true };

describe("subscription rules", () => {
  it("accepts valid data", () => expect(validateSubscription(ok).ok).toBe(true));
  it("requires explicit consent", () => {
    const r = validateSubscription({ ...ok, consent: false });
    expect(r.ok).toBe(false);
  });
  it("rejects invalid email", () => {
    const r = validateSubscription({ ...ok, email: "no-es-email" });
    expect(r.ok === false && r.errors.email).toBeTruthy();
  });
  it("demo mode never reports success", async () => {
    const r = await notConfiguredProvider.subscribe({ ...ok, consent: true, consentAt: "" });
    expect(r.status).toBe("not_configured");
  });
});
