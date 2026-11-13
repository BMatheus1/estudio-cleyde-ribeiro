"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, navigation, whatsapp } from "../data/business";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
    <div className="shell header-inner">
      <Link className="wordmark" href="/"><span className="brand-symbol"><Image src={business.logo} alt="" width={50} height={50} /></span><span><small>ESTÚDIO</small>Cleyde Ribeiro</span></Link>
      <button type="button" id="menu-toggle" className="icon-button menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="site-nav" className={open ? "nav nav-open" : "nav"} aria-label="Menu principal">
        {navigation.map(([label, id]) => <a key={id} href={"/#" + id} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="button header-book" href={whatsapp()}>Agendar <ArrowUpRight size={15} /></a>
    </div>
  </header>;
}
