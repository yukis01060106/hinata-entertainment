import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** arch = 日の出のようなアーチ型、rect = 長方形 */
  shape?: "arch" | "rect";
  /** 色ブロックを左右どちらにずらすか */
  flip?: boolean;
  tone?: "shu" | "kin" | "ai" | "kinari";
  ratio?: string;
  preload?: boolean;
  className?: string;
  /** 写真の下に入る小さなキャプション */
  caption?: string;
  /** パララックスの強さ（0.1〜0.3くらい）。写真だけがゆっくり動く */
  parallax?: number;
};

/**
 * 写真のうしろに「色のブロック」と「線の枠」をずらして重ねる構図。
 * 写真には軽いフィルム調の加工を CSS でかけるので、元の写真はそのままで大丈夫。
 */
export function PhotoStack({
  src,
  alt,
  sizes,
  shape = "rect",
  flip = false,
  tone = "shu",
  ratio = "3 / 4",
  preload = false,
  className = "",
  caption,
  parallax,
}: Props) {
  const shapeClass = shape === "arch" ? "arch" : "rounded-[0.2rem]";
  return (
    <figure className={className}>
      <div data-reveal="wipe" className={`stack ${flip ? "stack--flip" : ""} ${tone !== "shu" ? `stack--${tone}` : ""} ${shapeClass}`}>
        <span className="stack__block" aria-hidden="true" />
        <div className="photo film" style={{ aspectRatio: ratio }}>
          <div className="absolute inset-[-8%]" data-parallax={parallax}>
            <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
          </div>
        </div>
        <span className="stack__line" aria-hidden="true" />
      </div>
      {caption && <figcaption className={`cap mt-6 sm:mt-8 ${flip ? "text-left" : "text-right"}`}>{caption}</figcaption>}
    </figure>
  );
}
