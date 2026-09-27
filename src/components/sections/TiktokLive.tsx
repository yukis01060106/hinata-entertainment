import type { CSSProperties } from "react";
import { tiktokLive } from "@/content/site";
import { Split } from "@/components/ui/Split";

/** ヒーロー直後：TikTok LIVE に特化していることを、濃い色の帯で打ち出す */
export function TiktokLive() {
  return (
    <section id="tiktok-live" data-sky="dawn" className="relative px-[var(--gutter)] pt-[clamp(3rem,8vw,6rem)]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-yoru px-[clamp(1.25rem,5vw,4.5rem)] py-[clamp(3.5rem,9vw,7rem)] text-paper">
        {/* 背景：夕日のにじみと、大きな透かし文字 */}
        <span aria-hidden="true" className="sun absolute -top-[18%] -right-[12%] size-[clamp(14rem,40vw,30rem)] opacity-80 blur-[2px]" />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.18em] left-[-0.04em] font-serif text-[clamp(5rem,21vw,17rem)] leading-none whitespace-nowrap italic text-paper/[0.06]"
        >
          TikTok LIVE
        </p>

        <div className="relative">
          <p className="label text-paper/80" data-reveal="fade">
            <span className="n">(01)</span>TikTok LIVE特化
          </p>
          <p className="cap mt-6 text-paper/70" data-reveal="fade">
            Why TikTok LIVE?
          </p>
          <Split
            as="h2"
            lines={tiktokLive.heading}
            className="mt-3 font-mincho text-[clamp(2rem,8.2vw,6.2rem)] leading-[1.2] font-extrabold"
          />
          <p className="mt-8 max-w-2xl text-[0.95rem] leading-[2.1] whitespace-pre-line text-paper/85 md:text-base" data-reveal="fade">
            {tiktokLive.lead}
          </p>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-paper/15 lg:mt-20 lg:grid-cols-3">
            {tiktokLive.reasons.map((r, i) => (
              <li
                key={r.en}
                data-reveal="fade"
                style={{ "--delay": `${i * 0.1}s` } as CSSProperties}
                className="bg-yoru p-6 sm:p-8"
              >
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-[clamp(2.6rem,8vw,3.6rem)] leading-none text-shu italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cap text-paper/60">{r.en}</span>
                </p>
                <p className="mt-6 font-mincho text-[clamp(1.2rem,4.8vw,1.55rem)] leading-snug font-extrabold [word-break:auto-phrase] lg:text-[1.35rem]">{r.title}</p>
                <p className="mt-4 text-sm leading-[2] text-paper/80">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
