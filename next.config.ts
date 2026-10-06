import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 のときは、静的サイト（HTML・画像などのファイル一式）として out/ に書き出す。
 *   GitHub Pages（デモ）… BASE_PATH=/hinata-entertainment、CONTACT_ENDPOINT は空（フォームは送信しない）
 *   Xserver（本番）     … BASE_PATH は空、CONTACT_ENDPOINT=/contact.php（PHPでメール送信）
 * 書き出しには scripts/deploy-pages.sh・scripts/deploy-xserver.sh を使う。
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = isStaticExport ? process.env.BASE_PATH ?? "" : "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: basePath || undefined,
      trailingSlash: true,
      env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
        NEXT_PUBLIC_CONTACT_ENDPOINT: process.env.CONTACT_ENDPOINT ?? "",
      },
      images: { loader: "custom", loaderFile: "./src/lib/static-image-loader.ts" },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
