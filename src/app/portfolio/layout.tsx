import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/header";
import { business, whatsapp } from "../../data/business";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Header />
    {children}
    <footer><div className="shell footer-grid">
      <Image src={business.logo} width={126} height={126} alt={business.name} />
      <div><strong>{business.name}</strong><p>{business.address} · {business.district}<br />{business.city}</p></div>
      <nav aria-label="Rodapé"><Link href="/#servicos">Serviços</Link><Link href="/portfolio/">Portfólio</Link><Link href="/#mentoria">Mentoria</Link></nav>
      <a className="text-link" href={whatsapp()}>WhatsApp {business.phone} <ArrowUpRight size={16} /></a>
      <small>© {new Date().getFullYear()} {business.name}.</small>
    </div></footer>
  </>;
}
