import type { Metadata } from "next";
import { pages, site } from "@/content/site";

/** 下層ページの title・説明文・canonical・OGP をまとめて作る */
export function pageMetadata(key: keyof typeof pages): Metadata {
  const p = pages[key];
  const fullTitle = `${p.title}｜${site.name}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: { type: "website", locale: site.locale, siteName: site.name, url: p.path, title: fullTitle, description: p.description },
    twitter: { card: "summary_large_image", title: fullTitle, description: p.description },
  };
}
