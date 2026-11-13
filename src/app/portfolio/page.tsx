import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Gallery } from "../../components/gallery";
import { whatsapp } from "../../data/business";
import { socialPreview } from "../../data/social";

const description = "Veja os resultados do Estúdio Cleyde Ribeiro em São Bernardo do Campo e compare o antes e depois dos trabalhos.";
export const metadata: Metadata = {
  title: "Portfólio",
  description,
  alternates: process.env.SITE_URL ? { canonical: "/portfolio/" } : undefined,
  ...socialPreview("Portfólio | Estúdio Cleyde Ribeiro", description, "/portfolio/"),
};

export default function Portfolio() {
  return <section className="section portfolio-section portfolio-page">
    <div className="shell">
      <Link className="text-link back-link" href="/"><ArrowLeft size={17} /> Voltar ao início</Link>
      <p className="eyebrow">Portfólio</p><h1>Transformações que <em>revelam beleza.</em></h1>
      <p className="intro">Conheça alguns dos resultados e cuidados que fazem parte da nossa história.</p>
      <Gallery />
      <a className="button gallery-link" href={whatsapp()}>Agendar meu horário <ArrowUpRight size={17} /></a>
    </div>
  </section>;
}
