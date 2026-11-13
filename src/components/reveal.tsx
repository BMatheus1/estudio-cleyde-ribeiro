"use client";
import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
          if (element.getBoundingClientRect().top < innerHeight) return;
          gsap.from(element, { y: 22, opacity: 0.55, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 95%", once: true } });
        });
      });
      cleanup = () => context.revert();
    }).catch(() => {});
    return () => { cancelled = true; cleanup?.(); };
  }, []);
  return null;
}
