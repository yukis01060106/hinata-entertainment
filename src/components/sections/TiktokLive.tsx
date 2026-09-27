import type { CSSProperties } from "react";
import { tiktokLive } from "@/content/site";
import { Split } from "@/components/ui/Split";

/** ヒーロー直後：TikTok LIVE を中心にしていることを、明るい色の帯で打ち出す */
export function TiktokLive() {
  return (
    <section id="tiktok-live" data-sky="dawn" className="relative px-[var(--gutter)] pt-[clamp(3rem,8vw,6rem)]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#fff4df] via-[#ffe9d2] to-[#ffd9c4] px-[clamp(1.25rem,5vw,4.5rem)] py-[clamp(3.5rem,9vw,7rem)]">
        {/* 背景：太陽のにじみと、大きな透かし文字 */}
        <span aria-hidden="true" className="sun absolute -top-[16%] -right-[10%] size-[clamp(12rem,36vw,26rem)] opacity-70 blur-[2px]" />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.18em] left-[-0.04em] font-serif text-[clamp(5rem,21vw,17rem)] leading-none whitespace-nowrap text-shu/[0.08] italic"
        >
          TikTok LIVE
        </p>

        <div className="relative">
          <p className="label" data-reveal="fade">
            <span className="n">(01)</span>TikTok LIVE特化
          </p>
          <p className="cap mt-6" data-reveal="fade">
            Why TikTok LIVE?
          </p>
          <Split
            as="h2"
            lines={tiktokLive.heading}
            className="mt-3 font-mincho text-[clamp(1.8rem,7.4vw,6.2rem)] leading-[1.2] font-extrabold"
          />
          <p className="mt-8 max-w-2xl text-[0.95rem] leading-[2.1] whitespace-pre-line text-ink/85 md:text-base" data-reveal="fade">
            {tiktokLive.lead}
          </p>

          <ol className="mt-14 grid gap-3 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {tiktokLive.reasons.map((r, i) => (
              <li
                key={r.en}
                data-reveal="fade"
                style={{ "--delay": `${i * 0.1}s` } as CSSProperties}
                className="rounded-2xl bg-paper/85 p-6 shadow-[0_12px_30px_-20px_rgb(194_65_12/0.45)] backdrop-blur-sm sm:p-8"
              >
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-[clamp(2.6rem,8vw,3.6rem)] leading-none text-shu italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cap">{r.en}</span>
                </p>
                <p className="mt-6 font-mincho text-[clamp(1.2rem,4.8vw,1.55rem)] leading-snug font-extrabold [word-break:auto-phrase] lg:text-[1.35rem]">{r.title}</p>
                <p className="mt-4 text-sm leading-[2] text-ink/80">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
