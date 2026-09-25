import Link from "next/link";
import { site } from "@/content/site";
import { SunSticker } from "@/components/ui/SunSticker";

/** フッター：大きな HINATA と、太陽のステッカー */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 px-[var(--gutter)] pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mincho text-lg font-extrabold">熊本から、ライバーが一番輝ける「ひなた」を。</p>
          <p className="mt-3 text-xs tracking-[0.15em] text-ink/70">
            {site.name} ／ 運営：{site.company}
          </p>
        </div>
        <nav aria-label="フッターメニュー" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
          {site.nav.map((n) => (
            <Link key={n.href} href={`/${n.href}`} className="text-ink/80 hover:text-shu">
              {n.ja}
            </Link>
          ))}
          <Link href="/privacy" className="text-ink/80 hover:text-shu">
            プライバシーポリシー
          </Link>
        </nav>
        <ul className="flex gap-5 text-sm">
          {site.sns.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-shu">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="relative mx-auto mt-16 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <p className="font-serif text-[19vw] leading-[0.78] tracking-[-0.02em] lg:text-[17vw]">HINATA</p>
          <SunSticker className="mb-[1vw] w-[16vw] shrink-0 lg:w-[11vw]" />
        </div>
        <span className="mt-4 block h-px bg-ink/20" />
      </div>
      <p className="cap relative mt-5 flex justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Kumamoto, Japan</span>
      </p>
    </footer>
  );
}
