import type { CSSProperties } from "react";
import { faq } from "@/content/site";
import { Split } from "@/components/ui/Split";

// Googleの検索結果に「よくある質問」として表示されるための構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" data-sky="night" className="relative px-[var(--gutter)] pt-[clamp(6rem,14vw,11rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label" data-reveal="fade">
            <span className="n">(05)</span>よくある質問
          </p>
          <Split as="h2" lines={["Q&A"]} className="display mt-6 text-[clamp(3.6rem,15vw,7rem)] italic" />
          <p className="mt-6 max-w-xs text-sm leading-loose text-ink/75" data-reveal="fade">
            応募の前に気になることを、まとめました。ここにない質問も、お気軽にどうぞ。
          </p>
        </div>

        <div className="lg:col-span-8">
          {faq.map((f, i) => (
            <details
              key={f.q}
              name="faq"
              className="faq group border-b border-ink/15 first:border-t"
              data-reveal="fade"
              style={{ "--delay": `${i * 0.06}s` } as CSSProperties}
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-2xl leading-7 text-shu italic">Q.</span>
                <span className="flex-1 font-mincho text-[1.05rem] leading-7 font-extrabold sm:text-lg">{f.q}</span>
                <span aria-hidden="true" className="relative mt-2 size-3.5 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-full bg-ink" />
                  <span className="absolute top-0 left-1/2 h-full w-px bg-ink transition-transform duration-500 group-open:scale-y-0" />
                </span>
              </summary>
              <div className="flex gap-4 pb-7">
                <span className="font-serif text-2xl leading-7 text-ink/40 italic">A.</span>
                <p className="flex-1 pr-7 text-[0.95rem] leading-[2] text-ink/85">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
