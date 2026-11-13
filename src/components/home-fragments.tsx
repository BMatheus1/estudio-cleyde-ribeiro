"use client";

import { useEffect } from "react";

export function HomeFragments() {
  useEffect(() => {
    function openFragment() {
      const fragment = location.hash.slice(1);
      const item = document.getElementById(fragment);
      if (item instanceof HTMLDetailsElement && item.name === "estudio-menu") {
        item.open = true;
        item.querySelector("summary")?.scrollIntoView({ block: "nearest" });
      }
    }
    openFragment();
    window.addEventListener("hashchange", openFragment);
    return () => window.removeEventListener("hashchange", openFragment);
  }, []);
  return null;
}
