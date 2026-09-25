/**
 * お問い合わせフォームの送信先。
 *
 * メールで受け取るには、次の環境変数を設定してください（Vercel の Environment Variables でも可）：
 *   RESEND_API_KEY    … https://resend.com で発行する API キー
 *   CONTACT_TO_EMAIL  … 問い合わせを受け取るメールアドレス
 *   CONTACT_FROM_EMAIL… 送信元（Resend で認証したドメインのアドレス。未設定なら onboarding@resend.dev）
 *
 * 未設定の場合は、送信内容をサーバーのログに出すだけになります（開発中の確認用）。
 */

type Payload = Record<string, string | undefined>;

const LABELS: Record<string, string> = {
  name: "お名前",
  age: "年齢",
  area: "都道府県",
  tiktok: "TikTok",
  email: "メール",
  tel: "電話番号",
  experience: "配信経験",
  genre: "興味のある配信",
  company: "会社名",
  topic: "お問い合わせ種別",
  message: "内容",
};

const REQUIRED: Record<string, string[]> = {
  apply: ["name", "age", "area", "email", "experience", "genre"],
  business: ["company", "name", "email", "topic", "message"],
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  // スパム対策：見えない入力欄に値が入っていたら、成功したふりをして捨てる
  if (body.website) return Response.json({ ok: true });

  const kind = body.kind === "business" ? "business" : "apply";
  const missing = REQUIRED[kind].filter((k) => !body[k]?.toString().trim());
  if (missing.length || body.agree !== "yes") {
    return Response.json({ error: "必須項目が入力されていません。" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email ?? "")) {
    return Response.json({ error: "メールアドレスの形式が正しくありません。" }, { status: 400 });
  }

  const title = kind === "apply" ? "【ライバー応募】" : "【企業お問い合わせ】";
  const rows = Object.keys(LABELS)
    .filter((k) => body[k])
    .map((k) => [LABELS[k], String(body[k]).slice(0, 4000)] as const);
  const text = rows.map(([k, v]) => `${k}：${v}`).join("\n");
  const html = `<h2>${title}</h2><table>${rows
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.info(`[contact] メール送信は未設定のため、ログにのみ出力します\n${title}\n${text}`);
    return Response.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "HINATA Entertainment <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: body.email,
      subject: `${title}${body.company ? `${body.company} ` : ""}${body.name} 様`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return Response.json({ error: "送信に失敗しました。時間をおいて再度お試しください。" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
