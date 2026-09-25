/** GitHub Pages 用：画像は最適化せず、そのままのファイルを basePath 付きで読み込む */
export default function pagesImageLoader({ src, width }: { src: string; width: number }) {
  const path = src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
  return `${path}?w=${width}`;
}
