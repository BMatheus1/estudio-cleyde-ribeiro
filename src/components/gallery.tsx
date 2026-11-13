"use client";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, MoveHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { works, type Work } from "../data/portfolio";
import { whatsapp } from "../data/business";

const introduced = new Set<string>();

function Comparison({ work }: { work: Work }) {
  const [position, setPosition] = useState(50);
  const [hint, setHint] = useState(false);
  const [demo, setDemo] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const stop = useRef<() => void>(undefined);
  const pointer = useRef<{ id: number; x: number; y: number; dragging: boolean }>(null);

  useEffect(() => {
    if (!surface.current || introduced.has(work.id)) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(entries => {
      if (introduced.has(work.id) || !entries.some(entry => entry.intersectionRatio >= 0.35)) return;
      observer.disconnect();
      introduced.add(work.id);
      setHint(true);
      timer = setTimeout(() => setHint(false), 3200);
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setDemo(true);
      const start = performance.now();
      function animate(now: number) {
        const progress = Math.min((now - start) / 1250, 1);
        setPosition(50 + 8 * Math.sin(Math.PI * progress) ** 2);
        if (progress < 1) frame = requestAnimationFrame(animate);
        else setDemo(false);
      }
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.35 });
    const cleanup = () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
    stop.current = cleanup;
    observer.observe(surface.current);
    return cleanup;
  }, [work.id]);

  function interact() {
    introduced.add(work.id);
    stop.current?.();
    setHint(false);
    setDemo(false);
  }

  function move(event: PointerEvent<HTMLInputElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(100, 100 * (event.clientX - left) / width))));
  }

  return <div className="comparison" ref={surface}>
    <Image fill sizes="(max-width: 650px) 90vw, 500px" src={`/trabalhos/${work.id}-after.webp`} alt={`Depois de ${work.title.toLowerCase()}`} />
    <Image fill sizes="(max-width: 650px) 90vw, 500px" src={`/trabalhos/${work.id}-before.webp`} alt={`Antes de ${work.title.toLowerCase()}`} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
    <span className="before-label">Antes</span><span className="after-label">Depois</span>
    <span className="divider" style={{ left: position + "%" }} aria-hidden="true"><span>
      <span className={demo ? "comparison-arrows demonstrating" : "comparison-arrows"}><ArrowLeft size={14} /><ArrowRight size={14} /></span>
    </span></span>
    <span className="comparison-hint" data-visible={hint} aria-hidden="true"><MoveHorizontal size={15} /> Deslize para comparar</span>
    <input type="range" min="0" max="100" value={Math.round(position)} aria-label="Posição da comparação antes e depois" aria-valuetext={`${Math.round(position)}% da imagem de antes`}
      onChange={event => { interact(); setPosition(event.target.valueAsNumber); }}
      onKeyDown={event => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(event.key)) interact();
      }}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        event.preventDefault();
        interact();
        event.currentTarget.focus({ preventScroll: true });
        event.currentTarget.setPointerCapture(event.pointerId);
        pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: event.pointerType === "mouse" };
        if (pointer.current.dragging) move(event);
      }}
      onPointerMove={event => {
        const gesture = pointer.current;
        if (gesture?.id !== event.pointerId) return;
        const x = Math.abs(event.clientX - gesture.x);
        const y = Math.abs(event.clientY - gesture.y);
        if (x >= 5 && x > y) gesture.dragging = true;
        if (gesture.dragging) move(event);
      }}
      onPointerUp={event => {
        const gesture = pointer.current;
        if (gesture?.id !== event.pointerId) return;
        if (gesture.dragging || Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) < 5) move(event);
        pointer.current = null;
      }}
      onLostPointerCapture={event => { if (pointer.current?.id === event.pointerId) pointer.current = null; }}
    />
  </div>;
}

export function Gallery() {
  const [filter, setFilter] = useState("todos");
  const [active, setActive] = useState<Work>();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const swipe = useRef(0);
  const visible = filter === "todos" ? works : works.filter(work => work.id === filter);
  function step(direction: number) {
    if (!active) return;
    const index = visible.indexOf(active);
    setActive(visible[(index + direction + visible.length) % visible.length]);
  }
  function keys(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.target instanceof HTMLInputElement || visible.length < 2) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  }
  return <>
    <div className="filters" aria-label="Filtrar trabalhos">
      {[{ id: "todos", title: "Todos" }, ...works.filter(work => work.id !== "corte"), { id: "tratamentos", title: "Tratamentos capilares" }].map(work => <button type="button" key={work.id} aria-pressed={filter === work.id} onClick={() => setFilter(work.id)}>{work.title}</button>)}
    </div>
    {visible.length === 0 && <p className="gallery-empty" role="status">Ainda não há trabalhos publicados nesta categoria.</p>}
    <div className="gallery-grid">
      {visible.map(work => <article key={work.id} className="work">
        <button type="button" onClick={event => { trigger.current = event.currentTarget; setActive(work); dialog.current?.showModal(); }} aria-label={`Ampliar comparação de ${work.title.toLowerCase()}`}>
          <div className="work-image"><Image fill sizes="(max-width: 650px) 90vw, (max-width: 950px) 45vw, 360px" src={`/trabalhos/${work.id}-after.webp`} alt="" /><span><Expand size={18} /></span></div>
          <div className="work-caption"><h3>{work.title}</h3><ArrowUpRight size={19} /></div>
        </button>
      </article>)}
    </div>
    <dialog className="lightbox" ref={dialog} aria-labelledby="work-title" onKeyDown={keys} onClose={() => { setActive(undefined); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="lightbox-panel">
        <div className="lightbox-heading"><h2 id="work-title">{active?.title}</h2><button type="button" className="icon-button" aria-label="Fechar galeria" onClick={() => dialog.current?.close()}><X /></button></div>
        {active && <Comparison key={active.id} work={active} />}
        <div className="lightbox-actions" onTouchStart={event => { swipe.current = event.touches[0].clientX; }} onTouchEnd={event => { const delta = event.changedTouches[0].clientX - swipe.current; if (Math.abs(delta) > 50 && visible.length > 1) step(delta < 0 ? 1 : -1); }}>
          <button className="icon-button" type="button" disabled={visible.length < 2} aria-label="Trabalho anterior" onClick={() => step(-1)}><ArrowLeft /></button>
          {active && <a className="text-link" href={whatsapp(`Olá! Vim pelo site do Estúdio Cleyde Ribeiro e gostaria de consultar sobre ${active.title.toLowerCase()}.`)}>Consultar procedimento <ArrowUpRight size={16} /></a>}
          <button className="icon-button" type="button" disabled={visible.length < 2} aria-label="Próximo trabalho" onClick={() => step(1)}><ArrowRight /></button>
        </div>
      </div>
    </dialog>
  </>;
}
