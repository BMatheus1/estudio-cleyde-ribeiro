import { works } from "../src/data/portfolio.ts";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public/trabalhos", { recursive: true });
for (const work of works) {
  for (const side of ["before", "after"] as const) {
    const [left, top, width, height] = work[side];
    const source = sharp("public/originais/" + work.file);
    await source.clone().extract({ left, top, width, height }).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/trabalhos/${work.id}-${side}.webp`);
    if (work.id === "luzes" && side === "after") {
      await source.clone().extract({ left: 630, top: 210, width: 624, height: 872 }).webp({ quality: 90 }).toFile("public/trabalhos/capa.webp");
    }
  }
}
