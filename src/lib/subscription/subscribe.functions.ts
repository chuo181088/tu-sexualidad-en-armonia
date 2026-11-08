import { createServerFn } from "@tanstack/react-start";
import { subscriptionSchema } from "./validation";
import { getEmailMarketingProvider, type SubscribeResult } from "./provider";

export const subscribeToEbook = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => subscriptionSchema.parse(data))
  .handler(async ({ data }): Promise<SubscribeResult> => {
    const provider = getEmailMarketingProvider();
    try {
      return await provider.subscribe({ ...data, consentAt: new Date().toISOString() });
    } catch (e) {
      console.error("subscribe failed", provider.id, e);
      return { status: "error", message: "No hemos podido procesar tu suscripción." };
    }
  });
