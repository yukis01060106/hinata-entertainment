import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "shu" | "ink";
  className?: string;
};

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** 朱色のボタン。光が表面を走り、PCではカーソルに吸い付く */
export function SunButton({ href, children, variant = "shu", className = "" }: Props) {
  return (
    <Link href={href} data-magnetic className={`btn ${variant === "ink" ? "btn--ink" : ""} ${className}`}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/** 「詳しく見る」などの、矢印つきの文字リンク（下層ページへの入口） */
export function MoreLink({ href, children, className = "" }: Omit<Props, "variant">) {
  return (
    <Link href={href} className={`ulink group inline-flex items-center gap-3 text-sm font-bold tracking-[0.14em] hover:text-deep ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
