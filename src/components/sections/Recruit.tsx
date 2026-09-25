import type { CSSProperties } from "react";
import { recruit } from "@/content/site";
import { Split } from "@/components/ui/Split";
import { ApplyLinks } from "@/components/ui/ApplyLinks";

export function Recruit() {
  return (
    <section id="recruit" data-sky="dusk" className="relative pt-[clamp(3rem,8vw,6rem)]">
      <div className="dusk relative overflow-hidden px-[var(--gutter)] pt-[clamp(6rem,18vw,12rem)] pb-[clamp(5rem,12vw,9rem)]">
        <div className="relative mx-auto max-w-6xl">
          <p className="label justify-center" data-reveal="fade">
            <span className="n">(04)</span>ライバー募集
          </p>
          <Split
            as="h2"
            lines={recruit.heading}
            className="mt-8 text-center font-mincho text-[clamp(2.6rem,12vw,8rem)] leading-[1.15] font-extrabold"
          />
          <p className="mx-auto mt-8 max-w-xl text-center text-[0.95rem] leading-[2.1] font-medium whitespace-pre-line md:text-base" data-reveal="fade">
            {recruit.lead}
          </p>

          {/* 応募したくなるポイント：罫線で区切った4マス */}
          <ul className="mt-16 grid grid-cols-2 border-t border-l border-yoru/25 lg:mt-24 lg:grid-cols-4">
            {recruit.points.map((pt, i) => (
              <li
                key={pt.big}
                data-shine
                data-reveal="fade"
                style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
                className="border-r border-b border-yoru/25 p-5 sm:p-7"
              >
                <span className="cap">Point {String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-mincho text-[clamp(1.15rem,4.6vw,1.6rem)] leading-snug font-extrabold">{pt.big}</p>
                <p className="mt-3 text-xs leading-[1.9] sm:text-sm">{pt.body}</p>
              </li>
            ))}
          </ul>

          {/* 応募の流れ：スクロールで線が伸び、各ステップが現れる */}
          <div className="mt-24 lg:mt-32">
            <h3 className="text-center font-mincho text-[clamp(1.6rem,6vw,2.6rem)] font-extrabold" data-reveal="fade">
              応募の流れ
            </h3>
            <p className="cap mt-2 text-center" data-reveal="fade">From entry to debut</p>

            <ol data-flow className="relative mt-14 grid gap-10 pl-10 lg:grid-cols-4 lg:gap-6 lg:pt-12 lg:pl-0" style={{ "--p": 0 } as CSSProperties}>
              {/* 線（スマホは縦、PCは横） */}
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6rem] w-px bg-yoru/20 lg:top-[0.6rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[0.6rem] w-[2px] origin-top scale-y-[var(--p)] bg-yoru lg:top-[0.6rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[2px] lg:w-auto lg:origin-left lg:scale-x-[var(--p)] lg:scale-y-100"
              />
              {recruit.steps.map((s, i) => (
                <li key={s.no} className="relative" data-reveal="fade" style={{ "--delay": `${i * 0.15}s` } as CSSProperties}>
                  <span aria-hidden="true" className="absolute top-1 -left-10 size-5 rounded-full border-2 border-yoru bg-daidai lg:-top-12 lg:left-0" />
                  <p className="cap">Step {s.no}</p>
                  <p className="mt-2 font-mincho text-xl font-extrabold">{s.title}</p>
                  <p className="mt-2 text-sm leading-[1.9]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* 応募方法：好きな窓口を選べる */}
          <div className="mt-24 lg:mt-32" data-reveal="fade">
            <h3 className="text-center font-mincho text-[clamp(1.6rem,6vw,2.6rem)] font-extrabold">応募方法</h3>
            <p className="mt-3 text-center text-sm leading-relaxed">いちばん気軽な方法で、声をかけてください。</p>
            <ApplyLinks variant="cards" tone="onColor" className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
