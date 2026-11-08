import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, Lock, Download } from "lucide-react";
import { validateSubscription, type FieldErrors } from "@/lib/subscription/validation";
import { subscribeToEbook } from "@/lib/subscription/subscribe.functions";
import { track } from "@/lib/analytics";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; downloadUrl: string | null }
  | { kind: "demo" }
  | { kind: "error"; message: string };

export function SubscribeForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const started = useRef(false);
  const inFlight = useRef(false);

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: id });
    }
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    const v = validateSubscription({ name, email, consent });
    if (!v.ok) {
      setErrors(v.errors);
      return;
    }
    setErrors({});
    inFlight.current = true;
    setStatus({ kind: "sending" });
    track("form_submit", { form: id });
    try {
      const r = await subscribeToEbook({ data: v.data });
      if (r.status === "subscribed" || r.status === "already_subscribed") {
        track("subscription_confirmed", { form: id });
        setStatus({ kind: "success", downloadUrl: r.downloadUrl });
      } else if (r.status === "not_configured") {
        setStatus({ kind: "demo" });
      } else {
        setStatus({ kind: "error", message: r.message });
      }
    } catch {
      setStatus({ kind: "error", message: "No hemos podido conectar. Revisa tu conexión e inténtalo de nuevo." });
    } finally {
      inFlight.current = false;
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-sm border border-primary/40 bg-card p-6 text-center">
        <p className="font-display text-2xl text-gold">¡Ya formas parte de TuSexualTip!</p>
        <p className="mt-2 text-sm text-muted-foreground">Revisa tu bandeja de entrada: te hemos enviado tu libro.</p>
        {status.downloadUrl && (
          <a
            href={status.downloadUrl}
            onClick={() => track("download_click")}
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-gold"
          >
            <Download className="h-4 w-4" /> Descargar ahora
          </a>
        )}
      </div>
    );
  }

  const sending = status.kind === "sending";
  const field =
    "w-full rounded-sm border border-input bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-1 focus:ring-ring aria-[invalid=true]:border-destructive";

  return (
    <form onSubmit={onSubmit} noValidate onFocus={onStart} className="space-y-4" aria-describedby={`${id}-privacy`}>
      <div>
        <label htmlFor={`${id}-name`} className="sr-only">Nombre</label>
        <input id={`${id}-name`} name="name" autoComplete="given-name" placeholder="Tu nombre" value={name}
          onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined} className={field} maxLength={60} />
        {errors.name && <p id={`${id}-name-err`} className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="sr-only">Correo electrónico</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email"
          placeholder="Tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined}
          className={field} maxLength={255} />
        {errors.email && <p id={`${id}-email-err`} className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary" />
          <span>
            Acepto recibir comunicaciones por correo electrónico de TuSexualTip. He leído la{" "}
            <Link to="/privacidad" className="text-primary underline-offset-2 hover:underline">Política de Privacidad</Link>.
          </span>
        </label>
        {errors.consent && <p id={`${id}-consent-err`} className="mt-1.5 text-xs text-destructive">{errors.consent}</p>}
      </div>
      <button type="submit" disabled={sending}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-gold transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
        {sending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</>) : "Sí, quiero mi libro gratis"}
      </button>
      <p id={`${id}-privacy`} className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Contenido exclusivo para adultos. Puedes darte de baja cuando quieras.
      </p>
      <div aria-live="polite">
        {status.kind === "demo" && (
          <p className="rounded-sm border border-primary/40 bg-accent p-3 text-xs text-accent-foreground">
            <strong className="text-primary">Modo demostración:</strong> el servicio de suscripción aún no está activo.
            Tus datos no se han guardado ni enviado a ningún sitio.
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="rounded-sm border border-destructive/50 p-3 text-xs text-destructive">{status.message}</p>
        )}
      </div>
    </form>
  );
}
