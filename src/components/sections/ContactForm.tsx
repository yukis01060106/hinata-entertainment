"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { contact } from "@/content/site";
import { Arrow } from "@/components/ui/SunButton";

type Kind = "apply" | "business";

/**
 * 送信先。通常は Next.js の /api/contact、Xserver では /contact.php（next.config.ts で設定）。
 * 空のとき（GitHub Pages のデモ）は送信先がないため、送信せずに案内だけ出す。
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact";
const isStaticDemo = endpoint === "";
type Status = "idle" | "sending" | "done" | "error";

function Field({ label, name, required, type = "text", ...rest }: { label: string; name: string; required?: boolean; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required && <span className="req">必須</span>}
      </label>
      <input id={name} name={name} type={type} required={required} {...rest} />
    </div>
  );
}

function Chips({ legend, name, options, required }: { legend: string; name: string; options: string[]; required?: boolean }) {
  return (
    <fieldset className="field">
      <legend className="mb-3">
        {legend}
        {required && <span className="req">必須</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="relative">
            <input className="chip-input" type="radio" name={name} value={o} required={required} defaultChecked={i === 0} />
            <span className="chip">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// URL の ?kind=（書き出したHTMLの時点では無いので、サーバー側は null）
const noSubscribe = () => () => {};
const readKindParam = () => new URLSearchParams(window.location.search).get("kind");

export function ContactForm() {
  // 「/contact?kind=business」のようなリンクで来たら、そのタブで開く。タブを押したら、そちらを優先
  const kindParam = useSyncExternalStore(noSubscribe, readKindParam, () => null);
  const [picked, setKind] = useState<Kind | null>(null);
  const kind: Kind = picked ?? (kindParam === "business" ? "business" : "apply");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // このページの中で同じようなリンクを押したときは、ページを読み直さずにタブを切り替えてフォームへ移動する
  useEffect(() => {
    const samePath = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "");
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link || !samePath(link.pathname, window.location.pathname)) return;
      const next = new URL(link.href).searchParams.get("kind");
      if (next !== "apply" && next !== "business") return;
      e.preventDefault();
      e.stopPropagation(); // Next.js の Link・Lenis より先に止める
      setKind(next);
      setStatus("idle");
      history.replaceState(null, "", `?kind=${next}`);
      // フォームの高さが切り替わってからスクロールしないと、到着位置がずれる
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const target = document.getElementById("contact");
          const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement) => void } }).__lenis;
          if (!target) return;
          if (lenis) lenis.scrollTo(target);
          else target.scrollIntoView({ behavior: "smooth" });
        }),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (isStaticDemo) {
      setStatus("error");
      setMessage("このページは確認用のデモのため、送信はできません（入力内容は送られていません）。");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "送信に失敗しました。");
      form.reset();
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "送信に失敗しました。");
    }
  }

  if (status === "done") {
    return (
      <div className="border-y border-ink/20 px-6 py-16 text-center" role="status">
        <span aria-hidden="true" className="sun mx-auto size-10" />
        <p className="mt-6 font-serif text-4xl italic">Thank you.</p>
        <p className="mt-5 font-display text-xl font-bold">送信が完了しました。</p>
        <p className="mt-4 text-sm leading-loose text-ink/80">
          内容を確認のうえ、担当者より3営業日以内にご連絡いたします。
          <br />
          お会いできるのを楽しみにしています。
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm underline underline-offset-4 hover:text-shu">
          フォームに戻る
        </button>
      </div>
    );
  }

  const tabs: { key: Kind; label: string }[] = [
    { key: "apply", label: contact.tabs.apply },
    { key: "business", label: contact.tabs.business },
  ];

  return (
    <div>
      <div role="tablist" aria-label="お問い合わせの種類" className="relative grid grid-cols-2 rounded-full border border-ink/15 p-1">
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-shu transition-transform duration-500 ease-[var(--ease-sun)] ${
            kind === "business" ? "translate-x-full" : ""
          }`}
        />
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={kind === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => {
              setKind(t.key);
              setStatus("idle");
            }}
            className={`relative z-10 rounded-full py-3 text-sm font-bold tracking-[0.12em] transition-colors duration-500 ${
              kind === t.key ? "text-ink" : "text-ink/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`panel-${kind}`} role="tabpanel" aria-labelledby={`tab-${kind}`}>
        <form key={kind} onSubmit={onSubmit} className="mt-10 grid gap-8">
          {/* スパム対策（人には見えない入力欄） */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
            <label>
              website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {kind === "apply" ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="お名前（ニックネーム可）" name="name" required autoComplete="name" />
                <Field label="年齢" name="age" type="number" inputMode="numeric" min={18} max={99} required />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="お住まいの都道府県" name="area" placeholder="例：熊本県" required autoComplete="address-level1" />
                <Field label="TikTokアカウント" name="tiktok" placeholder="@hinata_example" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="メールアドレス" name="email" type="email" required autoComplete="email" />
                <Field label="電話番号" name="tel" type="tel" autoComplete="tel" />
              </div>
              <Chips legend="配信の経験" name="experience" options={contact.experiences} required />
              <Chips legend="興味のある配信" name="genre" options={contact.genres} required />
              <div className="field">
                <label htmlFor="message">やってみたいこと・質問など</label>
                <textarea id="message" name="message" rows={4} placeholder="自由にご記入ください" />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="会社名" name="company" required autoComplete="organization" />
                <Field label="ご担当者名" name="name" required autoComplete="name" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="メールアドレス" name="email" type="email" required autoComplete="email" />
                <Field label="電話番号" name="tel" type="tel" autoComplete="tel" />
              </div>
              <div className="field">
                <label htmlFor="topic">
                  お問い合わせ種別<span className="req">必須</span>
                </label>
                <select id="topic" name="topic" required defaultValue={contact.businessTypes[0]}>
                  {contact.businessTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">
                  お問い合わせ内容<span className="req">必須</span>
                </label>
                <textarea id="message" name="message" rows={6} required placeholder="商品・ご予算・時期など、わかる範囲でご記入ください" />
              </div>
            </>
          )}

          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" name="agree" value="yes" required className="mt-1 size-4 accent-[#ff5a1f]" />
            <span>
              <Link href="/privacy" className="underline underline-offset-4 hover:text-shu" target="_blank">
                プライバシーポリシー
              </Link>
              に同意して送信します
            </span>
          </label>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-shu/50 bg-shu/10 px-4 py-3 text-sm">
              {message}
            </p>
          )}

          <div>
            <button type="submit" disabled={status === "sending"} className="btn w-full disabled:opacity-60 sm:w-auto sm:min-w-[18rem]">
              <span>{status === "sending" ? "送信中…" : kind === "apply" ? "この内容で応募する" : "この内容で送信する"}</span>
              <Arrow />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
