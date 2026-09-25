import { useId } from "react";

type Props = {
  className?: string;
  /** まわりを回る文字 */
  text?: string;
  /** 中央の文字 */
  center?: string;
  spin?: boolean;
};

// ふちが波打った円（ステッカーの形）
function scallopPath(cx: number, cy: number, r: number, waves: number, depth: number) {
  const steps = 240;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr = r + Math.sin(t * waves) * depth;
    const x = cx + Math.cos(t) * rr;
    const y = cy + Math.sin(t) * rr;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + "Z";
}

const SHAPE = scallopPath(100, 100, 88, 14, 5);

/**
 * HINATA の太陽ステッカー。夕焼けグラデーションの波形の円に、回転する文字。
 * （ベタ塗りの赤い円は日の丸に見えやすいので使わない）
 */
export function SunSticker({ className = "", text = "HINATA ENT. • KUMAMOTO • TIKTOK LIVE • ", center = "LIVE", spin = true }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`g${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="0.25" stopColor="#ffd95a" />
          <stop offset="0.55" stopColor="#ff8a3d" />
          <stop offset="0.8" stopColor="#ff5a1f" />
          <stop offset="1" stopColor="#ff8fc0" />
        </radialGradient>
        <path id={`c${id}`} d="M100 100 m-64 0 a64 64 0 1 1 128 0 a64 64 0 1 1 -128 0" />
      </defs>
      <path d={SHAPE} fill={`url(#g${id})`} />
      <g className={spin ? "sticker-spin" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <text fontFamily="var(--font-dm-mono), monospace" fontSize="12.5" letterSpacing="2.4" fill="#17181d">
          <textPath href={`#c${id}`}>{text}</textPath>
        </text>
      </g>
      <circle cx="78" cy="100" r="5" fill="#17181d" />
      <text x="88" y="106" fontFamily="var(--font-instrument), serif" fontSize="22" fontStyle="italic" fill="#17181d">
        {center}
      </text>
    </svg>
  );
}
