import Image from "next/image";
import type { CSSProperties } from "react";
import { managers } from "@/content/site";
import { Split } from "@/components/ui/Split";

/** マネージャー紹介：写真（なければ名前のカード）と経歴 */
export function Manager({ no }: { no?: string }) {
  return (
    <section id="manager" data-sky="day" className="relative px-[var(--gutter)] py-[clamp(5rem,12vw,9rem)]">
      <div className="mx-auto max-w-6xl">
        <h2 className="label" data-reveal="fade">
          {no && <span className="n">({no})</span>}マネージャー紹介
        </h2>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Split as="p" lines={["Manager"]} className="display text-[clamp(3.8rem,17vw,11rem)] italic" />
          <p className="max-w-sm text-sm leading-loose text-ink/80 md:text-base lg:pb-5" data-reveal="fade">
            ライバー一人ひとりの配信を、
            <br />
            担当のマネージャーがそばでサポートします。
          </p>
        </div>

        <ul className="mt-14 space-y-16 lg:mt-20">
          {managers.map((m, i) => (
            <li key={m.nameEn} className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
              <div className="w-[70%] max-w-[22rem] sm:w-[52%] md:col-span-5 md:w-full" data-reveal="fade">
                <div className="arch relative aspect-[3/4] overflow-hidden" data-shine>
                  {m.image ? (
                    // .photo は角の丸みを親から受け継ぐので、アーチは外側の枠で作る
                    <div className="photo film h-full">
                      <Image src={m.image} alt={`${m.role} ${m.nameJa}`} fill sizes="(min-width: 768px) 34vw, 60vw" className="object-cover" />
                    </div>
                  ) : (
                    // 写真がないあいだは、太陽色のカードに名前を大きく置く
                    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[#fff4df] via-[#ffd9b0] to-[#ff9d6b]">
                      <span className="sun float absolute top-[14%] aspect-square w-[52%] opacity-90" />
                      <span className="relative mt-[22%] font-ornament text-[clamp(6rem,24vw,11rem)] leading-none font-extrabold text-ink">{m.nameJa}</span>
                      <span className="cap absolute bottom-[8%] text-ink/70">{m.nameEn.toUpperCase()} — MANAGER</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-7" data-reveal="fade" style={{ "--delay": `${0.1 + i * 0.05}s` } as CSSProperties}>
                <p className="cap text-deep">{m.role}</p>
                <p className="mt-3 flex items-baseline gap-4">
                  <span className="font-display text-[clamp(2.4rem,8vw,3.6rem)] leading-none font-bold">{m.nameJa}</span>
                  <span className="font-serif text-[clamp(1.6rem,5vw,2.4rem)] leading-none text-ink/70 italic">{m.nameEn}</span>
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <li key={t} className="rounded-full border border-ink/20 px-3 py-1 text-xs tracking-[0.08em]">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 max-w-xl text-[0.95rem] leading-[2.2] text-ink/85 md:text-base">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
