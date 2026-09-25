import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=1 のときは、GitHub Pages（https://<user>.github.io/<repo>/）向けの静的サイトとして書き出す。
 * 静的サイトではお問い合わせフォームの送信（/api/contact）は動かないため、確認用のデモとしてだけ使う。
 */
const pagesBasePath = process.env.GITHUB_PAGES === "1" ? process.env.PAGES_BASE_PATH ?? "/hinata-entertainment" : "";

const nextConfig: NextConfig = pagesBasePath
  ? {
      output: "export",
      basePath: pagesBasePath,
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath },
      images: { loader: "custom", loaderFile: "./src/lib/pages-image-loader.ts" },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
