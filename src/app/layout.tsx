import type { Metadata } from "next";

import { MessageCircle } from "lucide-react";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";


import { business, whatsapp } from "../data/business";
import { socialPreview } from "../data/social";

const origin = process.env.SITE_URL;
export const metadata: Metadata = {
  title: { default: "Estúdio Cleyde Ribeiro | Beleza em São Bernardo do Campo", template: "%s | Estúdio Cleyde Ribeiro" },
  description: business.description,
  metadataBase: origin ? new URL(origin) : undefined,
  alternates: origin ? { canonical: "/" } : undefined,
  ...socialPreview(business.name, business.description, "/"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "BeautySalon", name: business.name, telephone: "+5511984864097", description: business.description, url: origin, address: { "@type": "PostalAddress", streetAddress: business.address + ", " + business.district, addressLocality: "São Bernardo do Campo", addressRegion: "SP", addressCountry: "BR" } };
  return <html lang="pt-BR"><body>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <main id="conteudo" tabIndex={-1}>{children}</main>
    <a className="floating" href={whatsapp()} aria-label="Agendar pelo WhatsApp"><MessageCircle size={24} /></a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </body></html>;
}
