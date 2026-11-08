import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const T = "Política de privacidad | TuSexualTip";
const D = "Cómo trata TuSexualTip tus datos personales y cómo puedes darte de baja.";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Política de privacidad">
      <h2>Qué datos recogemos</h2>
      <p>Solo tu nombre y tu correo electrónico, para enviarte el libro que has solicitado.</p>
      <h2>Para qué los usamos</h2>
      <p>Si marcas la casilla de consentimiento, te enviaremos comunicaciones por correo electrónico de TuSexualTip. Sin ese consentimiento no te enviaremos comunicaciones comerciales.</p>
      <h2>Baja y tus derechos</h2>
      <p>Puedes darte de baja en cualquier momento desde el enlace incluido en cada correo. También puedes solicitar el acceso, la corrección o la eliminación de tus datos.</p>
    </LegalPage>
  ),
});
