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
    <a href={href} data-magnetic data-contact-kind={href === "#contact" ? "apply" : undefined} className={`btn ${variant === "ink" ? "btn--ink" : ""} ${className}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
