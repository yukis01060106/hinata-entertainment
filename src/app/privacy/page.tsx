import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${site.name}（運営：${site.company}）の個人情報の取り扱いについて。`,
  alternates: { canonical: "/privacy" },
};

// ※ 公開前に、会社の実態に合わせて内容をご確認ください（必要に応じて専門家のチェックを推奨します）
const sections = [
  {
    title: "1. 個人情報の取得",
    body: "当社は、ライバー応募フォームおよびお問い合わせフォームを通じて、お名前、年齢、お住まいの地域、メールアドレス、電話番号、SNSアカウント、その他ご記入いただいた情報を取得します。",
  },
  {
    title: "2. 利用目的",
    body: "取得した個人情報は、次の目的の範囲内で利用します。\n・ライバー応募に関する選考、面談のご案内、ご連絡\n・お問い合わせへの回答、ご依頼内容の確認\n・当社サービスに関するご案内",
  },
  {
    title: "3. 第三者への提供",
    body: "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
  },
  {
    title: "4. 安全管理",
    body: "当社は、個人情報の漏えい、滅失または毀損を防ぐため、必要かつ適切な安全管理措置を講じます。",
  },
  {
    title: "5. 開示・訂正・削除",
    body: "ご本人から個人情報の開示、訂正、利用停止、削除等のご請求があった場合は、本人確認のうえ、速やかに対応いたします。",
  },
  {
    title: "6. お問い合わせ窓口",
    body: `${site.company}\n${site.name} 個人情報担当\nお問い合わせフォームよりご連絡ください。`,
  },
];

export default function PrivacyPage() {
  return (
    <section data-sky="night" className="px-[var(--gutter)] pt-36 pb-28">
      <div className="mx-auto max-w-3xl">
        <p className="label">
          <span className="n">(—)</span>Privacy Policy
        </p>
        <h1 className="mt-6 font-mincho text-[clamp(2rem,8vw,3.4rem)] font-extrabold">プライバシーポリシー</h1>
        <p className="mt-8 leading-loose text-ink/85">
          {site.company}（以下「当社」）は、{site.name}の運営において取得する個人情報を、以下のとおり適切に取り扱います。
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-mincho text-xl font-extrabold">{s.title}</h2>
              <p className="mt-3 leading-loose whitespace-pre-line text-ink/85">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-sm text-ink/70">制定日：2026年9月25日</p>
      </div>
    </section>
  );
}
