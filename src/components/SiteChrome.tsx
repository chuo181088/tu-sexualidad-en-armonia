import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="font-display text-xl tracking-wide text-foreground">
        TuSexual<span className="text-gold italic">Tip</span>
      </Link>
      <span className="rounded-full border border-primary/50 px-3 py-1 text-xs font-semibold text-primary" aria-label="Solo mayores de 18 años">
        +18
      </span>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-12 text-xs leading-relaxed text-muted-foreground">
        <p className="font-display text-lg text-foreground">TuSexual<span className="text-gold italic">Tip</span></p>
        <p>
          <strong className="text-foreground">Contenido exclusivo para adultos.</strong> Este sitio está dirigido únicamente a personas mayores de 18 años.
        </p>
        <p>
          Solo te enviaremos correos si das tu consentimiento expreso. Cada mensaje incluye un enlace para darte de baja al instante, cuando quieras.
        </p>
        <nav aria-label="Información legal" className="flex flex-wrap gap-6">
          <Link to="/privacidad" className="transition hover:text-primary">Política de privacidad</Link>
          <Link to="/terminos" className="transition hover:text-primary">Términos de uso</Link>
        </nav>
        <p>© 2026 TuSexualTip. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
