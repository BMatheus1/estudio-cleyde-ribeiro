"use client";

import type { ReactNode } from "react";

export function StudioMenuItem({ id, title, icon, indicator, children }: {
  id: string;
  title: string;
  icon: ReactNode;
  indicator: ReactNode;
  children: ReactNode;
}) {
  return <details className="studio-item" name="estudio-menu" id={id} onToggle={event => {
    const item = event.currentTarget;
    item.firstElementChild?.setAttribute("aria-expanded", String(item.open));
  }}>
    <summary aria-expanded={false} aria-controls={id + "-painel"}>
      {icon}<span>{title}</span>{indicator}
    </summary>
    <div className="studio-panel" id={id + "-painel"}>{children}</div>
  </details>;
}
