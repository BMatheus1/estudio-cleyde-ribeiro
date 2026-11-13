import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.SITE_URL;
  return origin ? ["/", "/portfolio/"].map(path => ({ url: new URL(path, origin).href })) : [];
}
