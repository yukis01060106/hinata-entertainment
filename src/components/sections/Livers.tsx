import Image from "next/image";
import type { CSSProperties } from "react";
import { livers } from "@/content/site";
import { Split } from "@/components/ui/Split";

export function Livers() {
  return (
    <section id="livers" data-sky="noon" className="relative px-[var(--gutter)] py-[clamp(5rem,12vw,10rem)]">
      <div className="mx-auto max-w-7xl">
        <p className="label" data-reveal="fade">
          <span className="n">(03)</span>所属ライバー
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Split as="h2" lines={["Livers"]} className="display text-[clamp(4.6rem,22vw,15rem)]" />
          <p className="max-w-sm text-sm leading-loose text-ink/80 md:text-base lg:pb-6" data-reveal="fade">
            熊本・九州から、全国のリスナーへ。
            <br />
            HINATAに所属するライバーたちです。
          </p>
        </div>

        {/* 2列（PCは3列）で、横一列にそろえて並べる */}
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
          {livers.map((l, i) => (
            <li key={l.nameEn + i} className="card group">
              <div data-reveal="fade" style={{ "--delay": `${(i % 3) * 0.1}s` } as CSSProperties}>
                <div className="arch relative" data-shine>
                  <div className="photo film arch aspect-[3/4]">
                    <Image src={l.image} alt={`${l.nameJa}（${l.nameEn}）`} fill sizes="(min-width: 1024px) 30vw, 46vw" className="object-cover" />
                  </div>
                </div>
                <p className="cap mt-4 flex justify-between">
                  <span>No.{String(i + 1).padStart(2, "0")}</span>
                  <span className={l.genre === "SHOP" ? "text-ink/70" : "text-deep"}>{l.genre === "SHOP" ? "Shop live" : "Gift live"}</span>
                </p>
                <div className="mt-2 flex items-end justify-between gap-3 border-b border-ink/15 pb-3">
                  <div>
                    <p className="font-serif text-[clamp(1.6rem,6vw,2.6rem)] leading-none">{l.nameEn.charAt(0) + l.nameEn.slice(1).toLowerCase()}</p>
                    <p className="mt-1.5 text-xs tracking-[0.2em] text-ink/70">{l.nameJa}</p>
                  </div>
                  {l.tiktok && (
                    <a
                      href={l.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${l.nameJa}のTikTok`}
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/25 transition-colors hover:border-shu hover:bg-shu"
                    >
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                        <path d="M10.2 0c.3 2 1.5 3.3 3.5 3.4v2.3c-1.2.1-2.3-.3-3.5-1v4.6c0 5.8-6.4 7.6-8.9 3.5C-.4 10.2.7 5.5 5.7 5.3v2.4c-.4.1-.8.2-1.1.3-1 .3-1.6 1-1.4 2.1.3 2.1 4.2 2.7 3.9-1.4V0h3.1z" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink/80 sm:text-sm">{l.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
