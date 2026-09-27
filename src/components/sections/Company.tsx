import type { CSSProperties } from "react";
import { company } from "@/content/site";
import { Split } from "@/components/ui/Split";

export function Company() {
  return (
    <section id="company" data-sky="night" className="relative px-[var(--gutter)] py-[clamp(6rem,14vw,11rem)]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label" data-reveal="fade">
            <span className="n">(07)</span>事務所概要
          </p>
          <Split as="h2" lines={["Company"]} className="display mt-6 text-[clamp(3.6rem,15vw,7rem)] lg:text-[clamp(4rem,6vw,5.6rem)]" />
        </div>
        <dl className="lg:col-span-8">
          {company.map((row, i) => (
            <div
              key={row.label}
              data-reveal="fade"
              style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
              className="grid gap-2 border-b border-ink/12 py-6 first:border-t sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <dt className="text-xs tracking-[0.2em] text-ink/60 sm:pt-1">{row.label}</dt>
              <dd className="leading-[2] whitespace-pre-line">
                {row.value}
                {row.link && (
                  <a
                    href={row.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex w-fit items-center gap-2 text-sm underline underline-offset-4 hover:text-shu"
                  >
                    {row.link.label}
                    <svg width="14" height="8" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
