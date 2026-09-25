"use client";

import { useEffect, useRef } from "react";

/**
 * マウス・タッチの位置を、柔らかい光がゆっくり追いかける。
 * transform だけを動かすので軽い。reduced-motion では CSS で非表示。
 */
export function LightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
    const pos = { ...target };
    let raf = 0;
    let idleTimer = 0;
    let running = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add("is-on");
      start();
      // 指を離して少しすると、光はゆっくり画面上部へ戻る
      if (e.pointerType !== "mouse") {
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          target.x = window.innerWidth * 0.5;
          target.y = window.innerHeight * 0.3;
          start();
        }, 1600);
      }
    };

    el.classList.add("is-on");
    start();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
