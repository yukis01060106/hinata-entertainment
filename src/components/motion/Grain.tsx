"use client";

import { useEffect, useRef } from "react";

/**
 * フィルムの粒子。小さなノイズ画像を Canvas で一度だけ生成し、
 * 画面全体に敷き詰めて少しずつずらす（描画コストはほぼゼロ）。
 */
export function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const size = 180;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    el.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  }, []);

  return <div ref={ref} className="grain" aria-hidden="true" />;
}
