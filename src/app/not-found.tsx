import Link from "next/link";
import { Arrow } from "@/components/ui/SunButton";
import { SunSticker } from "@/components/ui/SunSticker";

export default function NotFound() {
  return (
    <section data-sky="night" className="grid min-h-[100svh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <SunSticker className="mx-auto w-36" center="404" />
        <p className="cap mt-8">404 — Not found</p>
        <h1 className="mt-4 font-mincho text-[clamp(1.6rem,6vw,2.4rem)] font-extrabold">このページは見つかりませんでした。</h1>
        <p className="mt-4 text-sm leading-loose text-ink/75">お探しのページは、移動または削除された可能性があります。</p>
        <Link href="/" className="btn mt-10 min-w-[14rem]">
          <span>トップページへ</span>
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
