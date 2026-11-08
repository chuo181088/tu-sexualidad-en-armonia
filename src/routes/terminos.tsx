import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const T = "Términos de uso | TuSexualTip";
const D = "Condiciones de uso del sitio y del contenido de TuSexualTip, exclusivo para adultos.";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Términos de uso">
      <h2>Solo para adultos</h2>
      <p>Este sitio y su contenido están dirigidos exclusivamente a personas mayores de 18 años. Al acceder, confirmas que cumples este requisito.</p>
      <h2>Uso del contenido</h2>
      <p>El contenido tiene fines informativos y educativos y no sustituye el consejo de un profesional de la salud.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos y materiales de TuSexualTip son para uso personal y no pueden redistribuirse sin autorización.</p>
    </LegalPage>
  ),
});
