import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl">{title}</h1>
        <p className="mt-4 rounded-sm border border-primary/40 bg-accent p-3 text-xs text-accent-foreground">
          Texto provisional: este documento debe ser revisado y completado antes de publicar el sitio.
        </p>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
