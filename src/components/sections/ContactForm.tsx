"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { contact } from "@/content/site";
import { Arrow } from "@/components/ui/SunButton";

type Kind = "apply" | "business";
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

export function ContactForm() {
  const [kind, setKind] = useState<Kind>("apply");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // ページ内の「企業の方はこちら」などのリンクから、タブを切り替えて開く
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-contact-kind]");
      const next = link?.dataset.contactKind;
      if (next !== "apply" && next !== "business") return;
      setKind(next);
      setStatus("idle");
      // フォームの高さが切り替わってからスクロールしないと、到着位置がずれるため自前でスクロールする
      if (link instanceof HTMLAnchorElement && link.hash === "#contact") {
        e.preventDefault();
        e.stopPropagation(); // Lenis のアンカー処理（window で受ける）より先に止める
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const target = document.getElementById("contact");
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement) => void } }).__lenis;
            if (!target) return;
            if (lenis) lenis.scrollTo(target);
            else target.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", "#contact");
          }),
        );
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setMessage("");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", {
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
        <p className="mt-5 font-mincho text-xl font-extrabold">送信が完了しました。</p>
        <p className="mt-4 text-sm leading-loose text-ink/80">
          内容を確認のうえ、担当者より3営業日以内にご連絡いたします。
          <br />
          あなたの「ひなた」を、一緒につくれることを楽しみにしています。
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
