import Image from "next/image";
import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { Split } from "@/components/ui/Split";
import { ApplyLinks } from "@/components/ui/ApplyLinks";
import { SunSticker } from "@/components/ui/SunSticker";

function PhotoColumn({ images, direction, preloadFirst }: { images: string[]; direction: "up" | "down"; preloadFirst?: boolean }) {
  // 同じ並びを2回つなげて、途切れずに流れ続けるようにする
  const loop = [...images, ...images];
  return (
    <div className={`hero-col hero-col--${direction}`}>
      {loop.map((src, i) => (
        <div
          key={i}
          className={`photo film relative aspect-[3/4] w-full shrink-0 ${i % 3 === 1 ? "arch" : "rounded-[0.2rem]"}`}
          aria-hidden={i >= images.length || undefined}
        >
          <Image
            src={src}
            alt={i < images.length ? "HINATA Entertainment のライバー" : ""}
            fill
            sizes="(min-width: 1024px) 23vw, 50vw"
            preload={preloadFirst && i === 0}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

const d = (v: string) => ({ "--delay": v }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" data-sky="dawn" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* 写真の列：スマホは上の6割、PCは右半分（321の構図） */}
      <div
        className="absolute inset-x-0 top-0 grid h-[50%] grid-cols-2 gap-2.5 overflow-hidden px-2.5 lg:inset-x-auto lg:right-[var(--gutter)] lg:h-full lg:w-[44%] lg:px-0"
        data-reveal="fade"
        style={d("calc(var(--intro-delay) - 0.3s)")}
      >
        <div className="-mt-8">
          <PhotoColumn images={hero.columns[0]} direction="up" preloadFirst />
        </div>
        <div className="-mt-44">
          <PhotoColumn images={hero.columns[1]} direction="down" preloadFirst />
        </div>
        {/* 写真の上下を墨色に溶かす（スマホ）。上はロゴを読みやすくするため */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper/80 to-transparent lg:hidden" />
        {/* 写真の下端を墨色に溶かす（スマホ） */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-paper lg:hidden" />
      </div>

      {/* 写真の上に貼ったステッカーとハッシュタグ（コラージュ風） */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[50%] lg:inset-x-auto lg:right-[var(--gutter)] lg:h-full lg:w-[44%]">
        <div className="absolute -bottom-10 right-[6%] w-[30vw] max-w-[150px] rotate-[8deg] lg:top-auto lg:bottom-[7%] lg:-left-[80px] lg:right-auto lg:w-[170px] lg:max-w-none" data-reveal="fade" style={d("calc(var(--intro-delay) + 0.2s)")}>
          <SunSticker className="w-full drop-shadow-[0_10px_20px_rgb(23_24_29/0.25)]" />
        </div>
        <div className="absolute bottom-10 left-[5%] flex flex-col items-start gap-2 lg:top-[18%] lg:bottom-auto lg:left-[-3.5rem]" data-reveal="fade" style={d("calc(var(--intro-delay) + 0.4s)")}>
          <span className="tag -rotate-[4deg]">#未経験OK</span>
          <span className="tag ml-6 rotate-[3deg]">#熊本から全国へ</span>
          <span className="tag -rotate-[2deg] bg-kin">#TikTokLIVE</span>
        </div>
      </div>

      {/* コピー */}
      <div className="relative z-10 flex h-full flex-col justify-end px-[var(--gutter)] pb-[max(2.2rem,env(safe-area-inset-bottom))] lg:w-[54%] lg:justify-center lg:pb-[10vh]">
        <h1>
          <span className="label mb-4 text-ink/85" data-reveal="fade" style={d("var(--intro-delay)")}>
            <span className="n">(熊本)</span>
            TikTok LIVE ライバー事務所
          </span>
          <Split
            as="span"
            lines={hero.catch}
            delay="calc(var(--intro-delay) + 0.1s)"
            className="block font-mincho text-[clamp(2.1rem,9.4vw,6rem)] leading-[1.22] lg:text-[4.6vw] font-extrabold tracking-[0.02em]"
          />
        </h1>
        <p className="mt-4 hidden max-w-md text-[0.85rem] sm:block leading-loose whitespace-pre-line text-ink/80 md:text-base" data-reveal="fade" style={d("calc(var(--intro-delay) + 0.8s)")}>
          {hero.lead}
        </p>
        <div className="mt-6 flex items-end justify-between gap-6" data-reveal="fade" style={d("calc(var(--intro-delay) + 1s)")}>
          <div className="w-full sm:w-auto">
            <p className="cap mb-2.5">Apply — 応募はお好きな方法で</p>
            <ApplyLinks />
          </div>
          <p className="cap hidden shrink-0 text-right sm:block">
            Kumamoto, Japan
            <br />
            32.80°N 130.71°E
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-[calc(var(--gutter)-0.2rem)] z-10 hidden flex-col items-center gap-3 lg:flex">
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
