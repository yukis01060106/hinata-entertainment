"use client";

import { useEffect, useState } from "react";
import { ApplyLinks } from "@/components/ui/ApplyLinks";

/**
 * スマホ用：画面下に固定の応募バー（LINE・Instagram・TikTok・フォーム）。
 * ヒーローを過ぎたら現れ、お問い合わせフォームが見えている間は隠れる。
 */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("top");
    const contactEl = document.getElementById("contact");
    if (!heroEl || !contactEl) return;
    const state = { pastHero: false, atContact: false };
    const update = () => setShow(state.pastHero && !state.atContact);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroEl) state.pastHero = !e.isIntersecting;
        if (e.target === contactEl) state.atContact = e.isIntersecting;
      }
      update();
    });
    io.observe(heroEl);
    io.observe(contactEl);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 transition-all duration-700 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-paper shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]">
        <p className="leading-tight">
          <span className="block text-[0.8rem] font-bold tracking-[0.1em]">ライバー募集中</span>
          <span className="block text-[0.62rem] tracking-[0.06em] opacity-70">未経験OK・DMからも応募可</span>
        </p>
        <ApplyLinks variant="icons" />
      </div>
    </div>
  );
}
