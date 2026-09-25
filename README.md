# HINATA Entertainment 公式サイト

熊本のTikTok LIVEライバー事務所「HINATA Entertainment」の公式サイトです。
Next.js 16（App Router）＋ TypeScript ＋ Tailwind CSS v4 ＋ GSAP（ScrollTrigger）＋ Lenis で作っています。

---

## 文章・写真の差し替え

**サイトの文言、ライバー、会社情報は、すべて `src/content/site.ts` の1ファイルにまとまっています。** ふだんの更新はこのファイルだけで完結します。

| やりたいこと | 編集する場所 |
|---|---|
| キャッチコピーやリード文を変える | `site.ts` の `hero` |
| ライバーを追加・削除・並べ替える | `site.ts` の `livers`（配列の順番がそのまま表示順です） |
| ヒーローで流れる写真を変える | `site.ts` の `hero.columns` |
| 会社の住所などを確定させる | `site.ts` の `company`（「（仮）」の部分） |
| SNSのリンクを入れる | `site.ts` の `site.sns` |
| 公式LINEのボタンを出す | `site.ts` の `site.line` にURLを入れる（空なら非表示） |
| よくある質問を編集する | `site.ts` の `faq`（**報酬・費用・ノルマの回答は、実際の条件に合わせて必ず確認してください**） |
| 企業向けの一言を変える | `site.ts` の `contact.businessNote` |
| SEOの説明文・キーワードを変える | `site.ts` の `site.seo` |

### 写真の差し替え手順
1. 写真を `public/images/livers/` に置きます（例：`aoi.jpg`）。**縦長（3:4）** の写真がきれいに収まります。
2. `site.ts` の `image` を `"/images/livers/aoi.jpg"` のように書き換えます。

- 写真には、少し暖色で褪せた「フィルム調」の加工を CSS で自動的にかけます。元の写真は無加工のままで大丈夫です。
- 画像は `next/image` が AVIF / WebP に自動で変換・最適化します。
- **今入っている写真は、すべて Unsplash の仮素材です**（一覧：`public/images/CREDITS.md`）。写っているのは事務所と関係のない方なので、**公開前に必ず実際のライバーの写真に差し替えてください。**

### 画像生成AIで雰囲気写真を作る場合
`docs/IMAGE_PROMPTS.md` に、ヒーロー・About・Service の各写真に対応した指示文とファイル名をまとめています。指示文どおりに作って同じ名前で保存すれば、そのまま差し替わります（所属ライバーの写真には使わないでください）。

### OGP画像（SNSでシェアされたときの画像）
`src/app/opengraph-image.jpg` と `src/app/twitter-image.jpg`（1200×630）を、同じ名前のファイルで上書きしてください。

---

## ローカルで確認する

Node.js 20.9 以上が必要です。

```bash
cd ~/Desktop/hinata-entertainment
npm install        # 初回のみ
npm run dev        # 開発サーバー起動 → http://localhost:3000
```

- **スマホ実機で確認する場合**：PCとスマホを同じWi-Fiにつなぎ、`npm run dev` を実行したときに表示される `Network: http://192.168.x.x:3000` をスマホのブラウザで開きます。
- **本番と同じ状態で確認する場合**：`npm run build && npm run start`
- オープニング演出は、同じタブで2回目以降は省略されます。もう一度見たいときは、新しいタブで開いてください。

---

## Vercel で公開する

### 1. GitHub にアップする
```bash
cd ~/Desktop/hinata-entertainment
git add -A
git commit -m "HINATA Entertainment 公式サイト"
gh repo create hinata-entertainment --private --source=. --push
```
（`gh` を使わない場合は、GitHub上で空のリポジトリを作り、表示される `git remote add origin ...` と `git push -u origin main` を実行します）

### 2. Vercel にインポートする
1. https://vercel.com に GitHub アカウントでログインする
2. **Add New… → Project** から `hinata-entertainment` を **Import** する
3. Framework は自動で **Next.js** が選ばれるので、そのまま **Deploy** する

以後は、GitHub に push するたびに自動で公開されます。

### 3. 環境変数を設定する（Vercel → Project → Settings → Environment Variables）

| 名前 | 内容 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 公開するURL（例：`https://hinata-ent.jp`）。OGP、サイトマップ、canonical に使われます |
| `RESEND_API_KEY` | フォームの内容をメールで受け取るための、[Resend](https://resend.com) の APIキー |
| `CONTACT_TO_EMAIL` | 問い合わせを受け取るメールアドレス（カンマ区切りで複数指定できます） |
| `CONTACT_FROM_EMAIL` | 送信元のアドレス（Resend でドメイン認証したもの。例：`HINATA <info@hinata-ent.jp>`） |

- 設定を変えたら、**Deployments → Redeploy** で反映します。
- メールの設定がない間は、フォームの送信内容は Vercel のログ（Project → Logs）に出るだけで、メールは届きません。
- ローカルで試すときは、`.env.example` をコピーして `.env.local` を作ってください。

### 4. 独自ドメインを設定する
Vercel → Project → Settings → **Domains** でドメインを追加し、表示される DNS レコードを、ドメインを取得したサービスで設定します。

### 5. 公開後にやること（SEO）
1. [Google Search Console](https://search.google.com/search-console) にサイトを登録し、`https://（ドメイン）/sitemap.xml` を送信する
2. **Googleビジネスプロフィール** に「熊本のライバー事務所」として登録すると、「熊本 ライバー事務所」のような地域名での検索に強くなります
3. TikTok のプロフィールにサイトのURLを載せる

---

## フォルダ構成

```
src/
├─ content/site.ts          ← 文言・画像・ライバー情報（ここを編集）
├─ app/
│  ├─ layout.tsx            ← フォント、meta、構造化データ
│  ├─ page.tsx              ← トップページのセクションの並び
│  ├─ privacy/page.tsx      ← プライバシーポリシー
│  ├─ api/contact/route.ts  ← フォームの送信処理
│  ├─ globals.css           ← 配色、写真の加工、演出のCSS
│  ├─ opengraph-image.jpg   ← OGP画像
│  └─ sitemap.ts / robots.ts
└─ components/
   ├─ sections/             ← Hero / About / Service / Livers / Recruit / Company / Contact
   ├─ layout/               ← ヘッダー、フッター、オープニング、スマホ用の固定応募ボタン
   ├─ motion/               ← スクロール演出、光のカーソル、光の粒（Canvas）
   └─ ui/                   ← 写真の重ね枠、1文字ずつ出る文字、マーキー、ボタン
```

## 演出について
- **prefers-reduced-motion**（端末の「視差効果を減らす」設定）がオンの場合は、スムーススクロール、パララックス、マーキー、光の演出を止め、フェードだけで表示します。
- オープニングを短くしたり、なくしたりしたい場合は、`src/app/globals.css` の `.opening` と、`src/app/layout.tsx` の `<Opening />` を調整してください。
