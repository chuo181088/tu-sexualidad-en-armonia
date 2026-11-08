import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Escribe tu nombre (mínimo 2 caracteres)." })
    .max(60, { message: "El nombre no puede superar los 60 caracteres." })
    .regex(/^[\p{L}\p{M}' .-]+$/u, { message: "El nombre solo puede contener letras y espacios." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Escribe tu correo electrónico." })
    .max(255, { message: "El correo es demasiado largo." })
    .email({ message: "Introduce un correo electrónico válido." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar recibir comunicaciones para obtener el libro." }),
  }),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type FieldErrors = Partial<Record<keyof SubscriptionInput, string>>;

export function validateSubscription(data: unknown):
  | { ok: true; data: SubscriptionInput }
  | { ok: false; errors: FieldErrors } {
  const r = subscriptionSchema.safeParse(data);
  if (r.success) return { ok: true, data: r.data };
  const errors: FieldErrors = {};
  for (const issue of r.error.issues) {
    const key = issue.path[0] as keyof SubscriptionInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
