import type { MetadataRoute } from "next";
import { pages, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...Object.values(pages).map((p) => ({
      url: `${site.url}${p.path}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.path === "/recruit" ? 0.9 : 0.7,
    })),
    { url: `${site.url}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
