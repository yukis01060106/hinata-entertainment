import type { CSSProperties } from "react";
import { about } from "@/content/site";
import { Split } from "@/components/ui/Split";
import { PhotoStack } from "@/components/ui/PhotoStack";

const layouts = [
  { shape: "arch", tone: "shu", ratio: "3 / 4" },
  { shape: "rect", tone: "kin", ratio: "4 / 5" },
  { shape: "arch", tone: "ai", ratio: "3 / 4" },
] as const;

export function About() {
  return (
    <section id="about" data-sky="sunrise" className="relative overflow-hidden px-[var(--gutter)] pt-[clamp(6rem,16vw,12rem)] pb-[clamp(4rem,10vw,8rem)]">
      <div className="relative mx-auto max-w-7xl">
        <p className="label" data-reveal="fade">
          <span className="n">(01)</span>名前の由来
        </p>

        {/* 見出し：縦書きの巨大な「日向」 */}
        <div className="mt-10 flex items-start justify-between gap-6 lg:mt-14">
          <div className="max-w-md pt-2">
            <Split
              as="h2"
              lines={["名前に込めた、", "三つの想い。"]}
              className="font-mincho text-[clamp(1.35rem,5.4vw,2.8rem)] leading-snug font-extrabold whitespace-nowrap"
            />
            <p className="mt-6 text-sm leading-loose text-ink/75 md:text-base" data-reveal="fade" style={{ "--delay": "0.3s" } as CSSProperties}>
              {about.lead}
            </p>
          </div>
          <div aria-hidden="true" className="relative flex shrink-0 gap-3" data-parallax="0.12">
            <span className="vertical cap pt-2">hinata / hi-no-kata</span>
            <span className="vertical block font-mincho text-[clamp(7rem,32vw,19rem)] leading-[0.92] font-extrabold">
              日<span className="text-shu">向</span>
            </span>
          </div>
        </div>

        {/* 3つの章：写真を左右交互に、段差をつけて配置 */}
        <div className="mt-[clamp(4rem,12vw,10rem)] space-y-[clamp(5rem,14vw,11rem)]">
          {about.chapters.map((ch, i) => {
            const l = layouts[i % layouts.length];
            const even = i % 2 === 0;
            return (
              <article key={ch.no} className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-10">
                <div
                  className={`w-[82%] sm:w-[62%] lg:w-auto ${
                    even ? "lg:col-span-5 lg:col-start-1" : "ml-auto lg:order-2 lg:col-span-5 lg:col-start-8"
                  } ${i === 1 ? "lg:mt-24" : ""}`}
                >
                  <PhotoStack
                    src={ch.image}
                    alt=""
                    sizes="(min-width: 1024px) 38vw, 82vw"
                    shape={l.shape}
                    tone={l.tone}
                    ratio={l.ratio}
                    flip={!even}
                    caption={`Fig.${ch.no} — ${ch.caption}`}
                    parallax={0.1}
                  />
                </div>
                <div className={`${even ? "lg:col-span-6 lg:col-start-7" : "lg:order-1 lg:col-span-6 lg:col-start-1"}`}>
                  <p className="flex items-center gap-4" data-reveal="fade">
                    <span className="font-serif text-[clamp(3.4rem,11vw,6.5rem)] leading-none text-shu italic">{ch.no}</span>
                    <span className="h-px flex-1 bg-ink/20" />
                  </p>
                  <Split as="h3" lines={[ch.title]} className="mt-5 font-mincho text-[clamp(1.45rem,5.6vw,2.5rem)] leading-snug font-extrabold" />
                  <p className="mt-6 max-w-xl text-[0.95rem] leading-[2.2] text-ink/85 md:text-base" data-reveal="fade" style={{ "--delay": "0.3s" } as CSSProperties}>
                    {ch.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* しめくくり：1文字ずつ灯る */}
        <div className="mt-[clamp(6rem,16vw,12rem)] border-t border-ink/15 pt-[clamp(3rem,8vw,6rem)]">
          <Split
            as="p"
            variant="glow"
            lines={about.closing}
            className="font-mincho text-[clamp(1.7rem,7.2vw,5.2rem)] leading-[1.45] font-extrabold tracking-[0.02em]"
          />
          <p className="mt-8 flex items-center gap-3 text-sm tracking-[0.1em] text-ink/80 md:text-base" data-reveal="fade" style={{ "--delay": "1.4s" } as CSSProperties}>
            <span className="sun size-2.5 shrink-0" />
            {about.closingSub}
          </p>
        </div>
      </div>
    </section>
  );
}
