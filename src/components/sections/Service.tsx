import type { CSSProperties } from "react";
import { contact, service } from "@/content/site";
import { Arrow } from "@/components/ui/SunButton";
import { Split } from "@/components/ui/Split";
import { PhotoStack } from "@/components/ui/PhotoStack";

const kanji = ["一", "二", "三", "四", "五", "六"];

export function Service() {
  return (
    <section id="service" data-sky="day" className="relative px-[var(--gutter)] py-[clamp(5rem,12vw,10rem)]">
      <div className="mx-auto max-w-7xl">
        <p className="label" data-reveal="fade">
          <span className="n">(02)</span>事業内容
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Split as="h2" lines={["Service"]} className="display text-[clamp(4.6rem,22vw,15rem)] italic" />
          <p className="max-w-md font-mincho text-[clamp(1.1rem,4.2vw,1.6rem)] leading-relaxed font-extrabold whitespace-pre-line lg:pb-6" data-reveal="fade">
            {service.lead}
          </p>
        </div>

        <div className="mt-[clamp(4rem,12vw,9rem)] space-y-[clamp(5rem,14vw,10rem)]">
          {service.pillars.map((p, i) => {
            const even = i % 2 === 0;
            return (
              <article key={p.key} className="relative">
                <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-12">
                  <div className={`${even ? "lg:col-span-5" : "lg:order-2 lg:col-span-5 lg:col-start-8"}`}>
                    <div className={`w-[80%] sm:w-[60%] lg:w-full ${even ? "" : "ml-auto"}`}>
                      <PhotoStack
                        src={p.image}
                        alt=""
                        sizes="(min-width: 1024px) 36vw, 80vw"
                        tone={p.key === "gift" ? "shu" : "kin"}
                        flip={!even}
                        ratio="4 / 5"
                        caption={p.key === "gift" ? "Gift live — TikTok LIVE" : "Shop live — TikTok Shop"}
                        parallax={0.1}
                      />
                    </div>
                  </div>

                  <div className={`${even ? "lg:col-span-6 lg:col-start-7" : "lg:order-1 lg:col-span-6"}`}>
                    <p className="font-serif text-[clamp(2.6rem,9vw,5rem)] leading-none italic" data-reveal="fade">
                      {p.key === "gift" ? "Gift" : "Shop"}
                      <span className="text-shu">.</span>
                    </p>
                    <Split as="h3" lines={[p.ja]} className="mt-4 font-mincho text-[clamp(1.7rem,6.6vw,3rem)] leading-tight font-extrabold" />
                    <p className="mt-6 text-[0.95rem] leading-[2.1] text-ink/85 md:text-base" data-reveal="fade" style={{ "--delay": "0.25s" } as CSSProperties}>
                      {p.body}
                    </p>

                    {/* サポート内容：罫線で区切ったリスト */}
                    <ul className="mt-10 border-t border-ink/15">
                      {p.supports.map((s, si) => (
                        <li
                          key={s.title}
                          data-shine
                          data-reveal="fade"
                          style={{ "--delay": `${si * 0.1}s` } as CSSProperties}
                          className="grid grid-cols-[2.2rem_1fr] gap-x-3 border-b border-ink/15 py-5"
                        >
                          <span className="font-mincho text-lg leading-7 font-extrabold text-shu">{kanji[si]}</span>
                          <div>
                            <h4 className="font-mincho text-lg leading-7 font-extrabold">{s.title}</h4>
                            <p className="mt-2 text-sm leading-[1.95] text-ink/75">{s.body}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 企業の方へ：押すとフォームが「企業のお問い合わせ」で開く */}
        <a
          href="#contact"
          data-contact-kind="business"
          data-shine
          data-reveal="fade"
          className="group mt-[clamp(4rem,10vw,7rem)] flex flex-col gap-4 border-y border-ink/20 py-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="cap block">For business</span>
            <span className="mt-2 block font-mincho text-[clamp(1.1rem,4.4vw,1.5rem)] leading-relaxed font-extrabold">{contact.businessNote}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-sm font-bold tracking-[0.14em] text-deep">
            企業の方はこちら
            <Arrow />
          </span>
        </a>
      </div>
    </section>
  );
}
