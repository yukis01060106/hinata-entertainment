"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { site, hero } from "@/content/site";

function getLenis() {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/** トップページ内なら滑らかにスクロール、それ以外のページならトップへ移動 */
export function useSectionLink() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);
  const onClick = (e: MouseEvent<HTMLAnchorElement>, hash: string, before?: () => void) => {
    if (!isHome) return;
    e.preventDefault();
    before?.();
    const target = document.querySelector<HTMLElement>(hash);
    const lenis = getLenis();
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target ?? 0, { duration: 1.4 });
    } else {
      (target ?? document.body).scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, "", hash);
  };
  return { hrefFor, onClick };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { hrefFor, onClick } = useSectionLink();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // 少しの揺れでは反応しないよう、8px 以上動いたときだけ向きを判定
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* ヘッダー：スクロールすると白い帯が現れ、下へ進むと隠れ、上へ戻ると現れる */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-sun)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_rgb(23_24_29/0.08)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="flex h-16 items-center justify-between px-[var(--gutter)] md:h-20">
          <a href={hrefFor("#top")} onClick={(e) => onClick(e, "#top", () => setOpen(false))}>
            <span className="sr-only">トップへ戻る：</span>
            <span className="flex items-center gap-2.5">
              <span className="sun size-3.5 md:size-4" />
              <span className="font-serif text-[1.35rem] leading-none tracking-[0.18em] text-ink md:text-[1.6rem]">HINATA</span>
            </span>
            <span className="mt-1.5 block pl-6 font-mono text-[0.5rem] leading-none tracking-[0.3em] text-ink md:pl-[1.65rem] md:text-[0.56rem]">
              ENTERTAINMENT
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href={hrefFor(hero.cta.href)}
              onClick={(e) => onClick(e, hero.cta.href)}
              data-contact-kind="apply"
              className="hidden rounded-full bg-shu px-5 py-2 text-xs font-bold tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper lg:block"
            >
              {hero.cta.label}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="global-menu"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              className="group -mr-3 grid size-12 place-items-center"
            >
              <span className="relative block h-3 w-8">
                <span
                  className={`absolute left-0 h-px w-full bg-ink transition-transform duration-500 ${open ? "top-1.5 rotate-[20deg]" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px bg-ink transition-all duration-500 ${open ? "top-1.5 w-full -rotate-[20deg]" : "top-3 w-5 group-hover:w-full"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav
        id="global-menu"
        aria-label="グローバルメニュー"
        className={`fixed inset-0 z-[65] flex flex-col justify-between overflow-y-auto bg-paper px-[var(--gutter)] pt-28 pb-10 transition-[opacity,visibility] duration-700 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <span aria-hidden="true" className="sun pointer-events-none absolute -right-[20vmin] -bottom-[20vmin] size-[60vmin]" />
        <ul className="relative space-y-1">
          {site.nav.map((item, i) => (
            <li
              key={item.href}
              className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <a
                href={hrefFor(item.href)}
                onClick={(e) => onClick(e, item.href, () => setOpen(false))}
                tabIndex={open ? 0 : -1}
                className="group flex items-baseline gap-4 py-1"
              >
                <span className="font-mono text-[0.65rem] text-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[clamp(2.4rem,10vw,5.4rem)] leading-[1.05] text-ink transition-[font-style,color] group-hover:text-shu group-hover:italic">
                  {item.label}
                </span>
                <span className="text-xs tracking-[0.2em] text-hai">{item.ja}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="relative mt-12 flex flex-wrap items-end justify-between gap-6">
          <ul className="flex gap-6 text-sm tracking-[0.15em]">
            {site.sns.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="hover:text-shu">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs tracking-[0.2em] text-ink/70">熊本から、ひなたをつくる。</p>
        </div>
      </nav>
    </>
  );
}
