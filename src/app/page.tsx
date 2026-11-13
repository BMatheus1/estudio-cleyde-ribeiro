import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift, GraduationCap, Images, MapPin, MessageCircle, Plus, Scissors, Sparkles, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { business, whatsapp } from "../data/business";
import { Gallery } from "../components/gallery";
import { HomeFragments } from "../components/home-fragments";
import { StudioMenuItem } from "../components/studio-menu-item";
import { Promotions, Services } from "../components/services";

function MenuItem({ id, title, icon: Icon, children }: {
  id: string;
  title: string;
  icon: typeof Scissors;
  children: ReactNode;
}) {
  return <StudioMenuItem id={id} title={title}
    icon={<Icon className="studio-menu-icon" size={19} strokeWidth={1.35} aria-hidden="true" />}
    indicator={<Plus className="studio-indicator" size={21} strokeWidth={1.3} aria-hidden="true" />}>
    {children}
  </StudioMenuItem>;
}

export default function Home() {
  return <div className="studio-home" id="inicio">
    <HomeFragments />
    <div className="studio-layout">
      <header className="studio-brand">
        <h1 className="studio-logo">
          <Image src={business.logo} width={1254} height={1254} preload alt={business.name} />
        </h1>
        <p>Sua beleza é a nossa especialidade.</p>
      </header>

      <div className="studio-navigation">
        <div role="group" aria-label="Explore o estúdio" className="studio-menu">
          <MenuItem id="servicos" title="Nossos Serviços" icon={Scissors}>
            <Services />
          </MenuItem>

          <MenuItem id="combos" title="Combos e Promoções" icon={Gift}>
            <Promotions />
          </MenuItem>

          <MenuItem id="portfolio" title="Portfólio" icon={Images}>
            <h2>Transformações que <em>revelam beleza.</em></h2>
            <Gallery />
            <Link href="/portfolio/" className="text-link gallery-link">Ver portfólio completo <ArrowRight size={17} /></Link>
          </MenuItem>

          <MenuItem id="sobre" title="Sobre Cleyde Ribeiro" icon={UserRound}>
            <div className="studio-about">
              <p className="studio-experience" aria-hidden="true">30<sup>+</sup></p>
              <div>
                <h2>Mais de 30 anos de <em>experiência capilar.</em></h2>
                <p>Cleyde Ribeiro é profissional capilar, mentora e orientadora técnica. Compartilha seus conhecimentos e contribui para a capacitação de profissionais da beleza.</p>
              </div>
            </div>
          </MenuItem>

          <MenuItem id="mentoria" title="Mentoria e Capacitação" icon={GraduationCap}>
            <h2>Conhecimento que <em>transforma profissionais.</em></h2>
            <ul className="studio-mentorship">
              {["Mentoria", "Orientação técnica", "Compartilhamento de conhecimentos", "Capacitação profissional"].map(item => <li key={item}><Sparkles size={15} aria-hidden="true" />{item}</li>)}
            </ul>
            <a className="text-link" href={whatsapp("Olá! Vim pelo site e gostaria de saber mais sobre as mentorias e capacitações profissionais.")}>Saiba mais sobre mentorias <ArrowUpRight size={17} /></a>
          </MenuItem>

          <MenuItem id="localizacao" title="Localização e Contato" icon={MapPin}>
            <h2>{business.name}</h2>
            <address>{business.address}<br />{business.district}<br />{business.city}</address>
            <p>WhatsApp {business.phone}</p>
            <div className="studio-contact">
              <a className="text-link" href={whatsapp()}>Abrir WhatsApp <ArrowUpRight size={16} /></a>
              <a className="text-link" href={business.maps}>Ver rota no Google Maps <ArrowUpRight size={16} /></a>
            </div>
          </MenuItem>
        </div>

        <a className="studio-whatsapp" href={whatsapp()}>
          <MessageCircle size={18} strokeWidth={1.6} /> Agendar pelo WhatsApp <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  </div>;
}
