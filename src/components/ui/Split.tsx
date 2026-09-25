import type { CSSProperties, ElementType } from "react";

type Props = {
  /** 1行ずつの配列。改行位置を指定したいときに使う */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** "glow" は1文字ずつ光が灯る演出 */
  variant?: "rise" | "glow";
  /** 出現を遅らせる秒数（CSSの値。例："0.3s" や "var(--intro-delay)"） */
  delay?: string;
  id?: string;
};

/**
 * 文字を1文字ずつ <span> に分けて、スクロールで順番に表示する。
 * 読み上げ用に、元のテキストは sr-only で別に出力する。
 */
export function Split({ lines, as: Tag = "p", className = "", lineClassName = "ln", variant = "rise", delay, id }: Props) {
  let i = 0;
  return (
    <Tag
      id={id}
      data-reveal="split"
      className={`split ${variant === "glow" ? "split--glow" : ""} ${className}`}
      style={delay ? ({ "--delay": delay } as CSSProperties) : undefined}
    >
      <span className="sr-only">{lines.join("")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className={lineClassName}>
            {Array.from(line).map((ch) => (
              <span key={i} className="ch" style={{ "--i": i++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
