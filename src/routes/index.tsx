import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Brain, MessageCircleHeart, FileText, Download, Gift } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { EbookMockup } from "@/components/EbookMockup";
import { SubscribeForm } from "@/components/SubscribeForm";
import { track } from "@/lib/analytics";

const TITLE = "Secretos Prohibidos de la Sexualidad — Ebook gratis | TuSexualTip";
const DESC =
  "Descarga gratis nuestro libro de 82 páginas sobre deseo, intimidad y placer, sin culpa ni vergüenza. Contenido exclusivo para mayores de 18 años.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "rating", content: "adult" },
    ],
  }),
  component: Index,
});

const benefits = [
  { icon: BookOpen, title: "Desmonta los mitos", text: "Descubre qué hay de cierto detrás de las creencias más extendidas sobre sexualidad." },
  { icon: Brain, title: "Psicología del deseo", text: "Comprende mejor tus fantasías, curiosidades y motivaciones." },
  { icon: MessageCircleHeart, title: "Comunicación real", text: "Aprende a hablar de intimidad y deseos con tu pareja sin vergüenza ni presión." },
];

function Index() {
  useEffect(() => track("landing_view"), []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14">
          <div className="animate-rise">
            <p className="eyebrow">Ebook gratuito · Solo adultos</p>
            <h1 className="mt-5 text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              Los secretos que nadie se atreve a decirte <em className="text-gold">sobre el sexo.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Descarga gratis nuestro libro de 82 páginas y descubre nuevas perspectivas sobre el deseo, la intimidad y el placer, sin culpa ni vergüenza.
            </p>
            <div className="mt-10 max-w-md lg:hidden"><EbookMockup /></div>
            <div className="mt-10 max-w-md rounded-sm border border-border bg-card/80 p-6 backdrop-blur sm:p-8">
              <SubscribeForm id="hero" />
            </div>
          </div>
          <div className="hidden lg:block animate-rise [animation-delay:200ms]"><EbookMockup /></div>
        </section>

        {/* Benefits */}
        <section className="border-y border-border bg-card py-24" aria-labelledby="beneficios">
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="beneficios" className="mx-auto max-w-3xl text-center text-3xl leading-tight sm:text-4xl">
              Esto no es un libro de biología. <em className="text-gold">Es una guía para tu deseo.</em>
            </h2>
            <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
              {benefits.map((b, i) => (
                <article key={b.title} className="group bg-card p-8 transition duration-500 hover:bg-accent sm:p-10">
                  <span className="font-display text-sm text-primary">0{i + 1}</span>
                  <b.icon className="mt-6 h-7 w-7 text-primary transition duration-500 group-hover:scale-110" strokeWidth={1.25} />
                  <h3 className="mt-5 text-2xl">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ebook */}
        <section className="py-24" aria-labelledby="ebook">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
            <EbookMockup />
            <div>
              <p className="eyebrow">El libro</p>
              <h2 id="ebook" className="mt-4 text-4xl leading-tight sm:text-5xl">
                Secretos Prohibidos <em className="text-gold">de la Sexualidad</em>
              </h2>
              <ul className="mt-10 space-y-5">
                {[
                  { icon: FileText, t: "82 páginas", d: "Lectura profunda, directa y sin rodeos." },
                  { icon: Download, t: "Descarga digital", d: "En formato PDF, para leer en cualquier dispositivo." },
                  { icon: Gift, t: "Acceso gratuito", d: "Lo recibes al completar tu suscripción." },
                ].map((x) => (
                  <li key={x.t} className="flex gap-4 border-b border-border pb-5">
                    <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                    <div>
                      <p className="font-semibold text-foreground">{x.t}</p>
                      <p className="text-sm text-muted-foreground">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Authority */}
        <section className="border-t border-border bg-card py-24" aria-labelledby="quienes">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="eyebrow">Nosotros</p>
            <h2 id="quienes" className="mt-4 text-3xl sm:text-4xl">¿Quién está detrás de esto?</h2>
            <p className="mt-8 font-display text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
              “Somos TuSexualTip. Creamos contenido sobre deseo, placer, intimidad y relaciones para una comunidad adulta que quiere hablar de sexualidad sin tabúes, sin juicios y sin sermones.”
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24" aria-labelledby="cta">
          <div className="mx-auto max-w-md px-6 text-center">
            <h2 id="cta" className="text-3xl sm:text-4xl">Tu libro te está <em className="text-gold">esperando.</em></h2>
            <p className="mt-4 text-sm text-muted-foreground">Gratis. Sin compromiso. Solo para mayores de 18 años.</p>
            <div className="mt-10 rounded-sm border border-border bg-card p-6 text-left sm:p-8">
              <SubscribeForm id="final" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
