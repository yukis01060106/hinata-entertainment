"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * スクロールで変わる空の色。各セクションの data-sky の値と対応。
 * a = 空の上、b = 空の下、c = 地平線の光
 */
const SKY: Record<string, { a: string; b: string; c: string }> = {
  dawn: { a: "#faf7f2", b: "#faf7f2", c: "#faf7f2" },
  sunrise: { a: "#faf7f2", b: "#f8f1e8", c: "#f6dcc6" },
  day: { a: "#fbf8f3", b: "#faf4ec", c: "#f8e6d2" },
  noon: { a: "#fbf7f1", b: "#f9efe3", c: "#f5d7b8" },
  dusk: { a: "#f9efe4", b: "#f6e0cb", c: "#f0b98c" },
  night: { a: "#faf7f2", b: "#faf7f2", c: "#f3ece2" },
};

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // --- スムーススクロール（Lenis）× ScrollTrigger ---
    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      });
    }

    // --- 画面に入ったら is-in を付ける（文字・写真の出現） ---
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      // 読み込んだ時点で画面内にあるもの（ヒーロー等）は、すぐに表示を始める
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      else io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    const ctx = gsap.context(() => {
      // --- 空の色：夜明け → 昼 → 夕焼け → 夜 ---
      const root = document.documentElement;
      const sections = gsap.utils.toArray<HTMLElement>("[data-sky]");
      if (sections.length) {
        const first = SKY[sections[0].dataset.sky ?? "dawn"];
        gsap.set(root, { "--sky-a": first.a, "--sky-b": first.b, "--sky-c": first.c });
        sections.forEach((section, i) => {
          if (i === 0) return;
          const from = SKY[sections[i - 1].dataset.sky ?? "dawn"];
          const to = SKY[section.dataset.sky ?? "dawn"];
          gsap.fromTo(
            root,
            { "--sky-a": from.a, "--sky-b": from.b, "--sky-c": from.c },
            {
              "--sky-a": to.a,
              "--sky-b": to.b,
              "--sky-c": to.c,
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: section, start: "top 85%", end: "top 25%", scrub: true },
            },
          );
        });
      }

      // 応募の流れ：スクロールに合わせて光の線が伸びる（縦横はCSS側で --p を使い分け）
      gsap.utils.toArray<HTMLElement>("[data-flow]").forEach((flow) => {
        gsap.fromTo(
          flow,
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: { trigger: flow, start: "top 75%", end: "bottom 60%", scrub: reduced ? false : 0.6 },
          },
        );
      });

      if (reduced) return;

      // --- パララックス ---
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.15") * 100;
        gsap.fromTo(
          el,
          { y: -amount },
          {
            y: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // --- マーキー：スクロール速度で加速・向きが変わる ---
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        const track = el.querySelector<HTMLElement>(".marquee__track");
        if (!track) return;
        const reverse = el.dataset.marquee === "reverse";
        const tween = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: 36, ease: "none", repeat: -1 },
        );
        let dir = 1;
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
          onUpdate: (self) => {
            dir = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
            gsap.to(tween, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true });
            gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.3, ease: "power2.out" });
          },
        });
      });
    });
    cleanups.push(() => ctx.revert());

    // --- 磁石のように吸い付くボタン（PCのみ） ---
    if (!reduced && finePointer) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo(gsap.utils.clamp(-14, 14, (e.clientX - (r.left + r.width / 2)) * 0.3));
          yTo(gsap.utils.clamp(-14, 14, (e.clientY - (r.top + r.height / 2)) * 0.35));
        };
        const leave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // --- カードの光の反射（カーソル／タップ位置にハイライト） ---
    document.querySelectorAll<HTMLElement>("[data-shine]").forEach((el) => {
      let timer = 0;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        if (e.pointerType !== "mouse") {
          el.classList.add("is-touch");
          window.clearTimeout(timer);
          timer = window.setTimeout(() => el.classList.remove("is-touch"), 700);
        }
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerdown", move);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerdown", move);
      });
    });

    // 画像やフォントの読み込み後に位置を再計算
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
