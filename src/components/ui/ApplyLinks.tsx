import type { ReactNode } from "react";
import { site } from "@/content/site";

type Channel = {
  key: "line" | "instagram" | "tiktok" | "form";
  label: string;
  short: string;
  note: string;
  href: string;
  icon: ReactNode;
  external: boolean;
};

const icons = {
  line: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5 1.1-.5 5.9-3.5 8-6C21.4 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8Zm-3.8 10.6H6.3a.5.5 0 0 1-.5-.5V9.3a.5.5 0 0 1 1 0v3.3h1.4a.5.5 0 0 1 0 1Zm2 -.5a.5.5 0 0 1-1 0V9.3a.5.5 0 0 1 1 0v3.8Zm4.6 0a.5.5 0 0 1-.9.3l-2-2.6v2.3a.5.5 0 0 1-1 0V9.3a.5.5 0 0 1 .9-.3l2 2.7V9.3a.5.5 0 0 1 1 0v3.8Zm3-2.4a.5.5 0 0 1 0 1h-1.4v.9h1.4a.5.5 0 0 1 0 1h-1.9a.5.5 0 0 1-.5-.5V9.3c0-.3.2-.5.5-.5h1.9a.5.5 0 0 1 0 1h-1.4v.9h1.4Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 2c.4 2.7 2 4.4 4.7 4.6v3.1c-1.6.1-3.1-.4-4.7-1.4v6.2c0 7.8-8.5 10.2-11.9 4.6C2.5 15.5 3.9 9.2 10.6 9v3.2c-.5.1-1 .2-1.5.4-1.4.4-2.2 1.3-1.9 2.8.4 2.8 5.6 3.6 5.2-1.9V2h4.2Z" />
    </svg>
  ),
  form: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
};

/** 応募の窓口一覧。URLが空のものは出さない。フォームは常に表示 */
export function getChannels(): Channel[] {
  const all: Channel[] = [
    { key: "line", label: "LINEで応募", short: "LINE", note: "友だち追加して、メッセージを送るだけ。質問からでもOK。", href: site.apply.line, icon: icons.line, external: true },
    { key: "instagram", label: "InstagramのDMで応募", short: "Instagram", note: "DMで「応募したい」と送ってください。", href: site.apply.instagram, icon: icons.instagram, external: true },
    { key: "tiktok", label: "TikTokのDMで応募", short: "TikTok", note: "いつも使っているTikTokから、そのまま応募できます。", href: site.apply.tiktok, icon: icons.tiktok, external: true },
    { key: "form", label: "フォームで応募", short: "フォーム", note: "1分で完了。配信の経験や希望も伝えられます。", href: "#contact", icon: icons.form, external: false },
  ];
  return all.filter((c) => c.href);
}

function linkProps(c: Channel) {
  return c.external
    ? { href: c.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: c.href, "data-contact-kind": "apply" };
}

type Props = {
  /** chips = 小さなボタンの横並び、cards = 説明つきのカード、icons = アイコンだけ（スマホ下部のバー） */
  variant?: "chips" | "cards" | "icons";
  className?: string;
  /** 暗い色の上に置くとき（Recruit の橙の上など）は "onColor" */
  tone?: "default" | "onColor";
};

export function ApplyLinks({ variant = "chips", className = "", tone = "default" }: Props) {
  const channels = getChannels();

  if (variant === "icons") {
    return (
      <ul className={`flex items-center gap-2 ${className}`}>
        {channels.map((c) => (
          <li key={c.key}>
            <a
              {...linkProps(c)}
              aria-label={c.label}
              className="grid size-11 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-shu [&_svg]:size-[1.15rem]"
            >
              {c.icon}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "cards") {
    return (
      <ul className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {channels.map((c) => (
          <li key={c.key}>
            <a
              {...linkProps(c)}
              data-shine
              className={`group flex h-full flex-col gap-4 rounded-2xl border p-5 transition-colors sm:p-6 ${
                tone === "onColor" ? "border-ink/25 hover:bg-ink hover:text-paper" : "border-ink/15 hover:border-shu"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-colors group-hover:bg-shu [&_svg]:size-5">{c.icon}</span>
                <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                  <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <span>
                <span className="block font-mincho text-lg font-extrabold">{c.label}</span>
                <span className="mt-1.5 block text-xs leading-relaxed opacity-80 sm:text-sm">{c.note}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`grid grid-cols-2 gap-2 sm:flex sm:flex-wrap ${className}`}>
      {channels.map((c) => (
        <li key={c.key}>
          <a
            {...linkProps(c)}
            className="flex items-center justify-center gap-2 rounded-full border border-ink/25 bg-paper/70 px-4 py-2.5 text-[0.8rem] font-bold tracking-[0.08em] transition-colors hover:border-shu hover:bg-shu sm:justify-start [&_svg]:size-4"
          >
            {c.icon}
            {c.short}
          </a>
        </li>
      ))}
    </ul>
  );
}
