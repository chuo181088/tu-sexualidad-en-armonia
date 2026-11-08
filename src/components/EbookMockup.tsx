// Provisional cover composition — replace with the real cover image when available.
export function EbookMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-56 sm:w-64 lg:w-72 ${className}`} aria-hidden="true">
      <div className="absolute -inset-16 bg-glow" />
      <div className="relative aspect-[2/3] animate-float">
        <div className="absolute inset-y-1 -right-2 w-3 rounded-r-sm bg-muted" />
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-cover-art p-6 shadow-book">
          <div className="absolute inset-y-0 left-0 w-2 bg-background/60" />
          <div className="absolute inset-3 border border-primary/30" />
          <p className="eyebrow relative text-center">TuSexualTip</p>
          <div className="relative text-center">
            <div className="mx-auto mb-4 h-px w-10 bg-primary" />
            <p className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
              Secretos <em className="text-gold">Prohibidos</em>
            </p>
            <p className="mt-2 font-display text-sm italic text-muted-foreground">de la Sexualidad</p>
            <div className="mx-auto mt-4 h-px w-10 bg-primary" />
          </div>
          <p className="relative text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Ebook · 82 páginas
          </p>
        </div>
      </div>
    </div>
  );
}
