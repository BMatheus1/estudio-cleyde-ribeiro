import type { Metadata } from "next";
import { business } from "./business";

export function socialPreview(title: string, description: string, path: string): Metadata {
  const origin = process.env.SITE_URL;
  const image = origin
    ? new URL("/compartilhar.jpg", origin).href
    : "https://raw.githubusercontent.com/BMatheus1/estudio-cleyde-ribeiro/main/public/compartilhar.jpg";

  return {
    openGraph: {
      title,
      description,
      siteName: business.name,
      type: "website",
      locale: "pt_BR",
      url: origin ? new URL(path, origin).href : undefined,
      images: [{ url: image, width: 1200, height: 630, type: "image/jpeg", alt: business.name }],
    },
  };
}
