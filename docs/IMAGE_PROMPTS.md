# 画像生成AI用 指示文ガイド

サイトの「雰囲気写真」を、画像生成AI（Adobe Firefly / ChatGPT / Midjourney など）で作るための指示文です。
**1枚ごとに「どこに使うか」「保存するファイル名」が決まっています。** 同じ名前で `public/images/` に保存すれば、コードを触らずにサイトに反映されます。

---

## まず読んでほしいこと

- **「所属ライバー」（`public/images/livers/`）にはAI画像を使わないでください。** 実在しない人を所属ライバーとして載せると、応募者やリスナーを誤解させてしまいます。ここは必ず、ご本人の許可を得た本物の写真にしてください。
- 商用利用で一番安心なのは **Adobe Firefly** です。ほかのサービスを使う場合は、各サービスの商用利用の条件を確認してください。
- 手や指、スマホ画面の中の文字、背景の看板は崩れやすいので、生成後に拡大して確認してください。
- TikTokのロゴやアプリ画面をそのまま描かせないでください（商標の問題があります）。指示文にも `no logos` を入れています。

---

## すべての指示文の最後に付ける「共通の一文」

サイトの「フィルム調」の加工となじみ、AIっぽさ（つるつるの肌、完璧すぎる光）を抑えるための一文です。

```
candid 35mm film photograph, natural light, warm muted tones, subtle film grain,
slightly imperfect framing, shallow depth of field, realistic skin texture with pores,
ordinary everyday room, not a studio, no text, no logos, no watermark
```

**比率の指定**：各項目の「比率」を、Fireflyなら縦横比の設定で、Midjourneyなら `--ar 3:4` のように末尾に付けてください。

---

## ヒーロー（トップで縦に流れる写真）

保存先：`public/images/hero/` ／ 比率：**3:4（縦長）** ／ 目安：1200×1600px
6枚を、左の列（01〜03）と右の列（04〜06）で交互に流します。人物の顔が画面の上寄りにあると、きれいに収まります。

| ファイル名 | 指示文 |
|---|---|
| `hero-01.jpg` | a young Japanese woman in her early 20s livestreaming from her small bedroom at dusk, smartphone on a tripod with a ring light, laughing while talking to the phone, fairy lights and plants in the background |
| `hero-02.jpg` | a young Japanese man with headphones around his neck, smiling at a smartphone on a stand, cozy room with a desk lamp, evening, relaxed mood |
| `hero-03.jpg` | close-up of a young Japanese woman singing softly into a small microphone clipped to her phone, eyes half closed, warm lamp light, night |
| `hero-04.jpg` | a young Japanese woman waving at a smartphone on a tripod, sitting cross-legged on a sofa, afternoon window light, casual hoodie |
| `hero-05.jpg` | a young Japanese man laughing while reading comments on a smartphone, sitting on the floor of a small apartment, evening, warm light |
| `hero-06.jpg` | a young Japanese woman with short hair doing a peace sign toward a phone on a tripod, colorful but cluttered room, natural light |

---

## About（名前の由来の3つの章）

保存先：`public/images/about/`

| ファイル名 | 比率 | 章 | 指示文 |
|---|---|---|---|
| `about-01.jpg` | 3:4 | 日の当たる場所へ | a young Japanese woman smiling in soft morning sunlight by a window, holding her smartphone, sunlight falling across her face, calm and hopeful mood |
| `about-02.jpg` | 4:5 | 九州の太陽と、火の国・熊本の熱 | a young woman filming herself with a smartphone on the grasslands of Mount Aso in Kumamoto at sunset, seen from behind, golden light, wide volcanic landscape |
| `about-03.jpg` | 3:4 | 人が集まる、温かい場所に | three young Japanese friends laughing together around a smartphone on a table in a small cafe, warm evening light, candid moment |

---

## Service（事業内容）

保存先：`public/images/service/` ／ 比率：**4:5**

| ファイル名 | 用途 | 指示文 |
|---|---|---|
| `gift.jpg` | ギフト配信 | a young Japanese woman livestreaming at night, talking and gesturing toward a smartphone on a tripod with a ring light, cozy bedroom, soft warm light |
| `shop.jpg` | ショップ配信 | a young Japanese woman holding up a skincare bottle toward a smartphone on a tripod, explaining the product, simple table with a few cosmetics, bright daytime window light |

---

## 予備（差し替えや、今後のページ用）

| 用途 | 比率 | 指示文 |
|---|---|---|
| 配信の手元 | 3:4 | over-the-shoulder view of a hand holding a smartphone showing a blurred live stream screen, warm cafe interior, bokeh lights |
| 熊本の街 | 4:5 | a young Japanese woman walking through a quiet shopping street in Kumamoto city at dusk, holding a phone on a small gimbal, candid street photo |
| 配信準備 | 3:4 | a young Japanese man adjusting a ring light and tripod in his small room before a livestream, focused expression, late afternoon light |
| 事務所のサポート | 4:5 | two young Japanese people, a manager and a streamer, looking at a laptop together and talking, bright simple office, candid |

---

## うまくいかないときの直し方

| 症状 | 指示文に足すこと |
|---|---|
| 肌がつるつるでCGっぽい | `realistic skin texture, natural imperfections, no retouching` |
| モデルの広告写真のようになる | `candid snapshot, not posed, everyday moment` |
| 色が派手すぎる | `muted colors, faded film look` |
| 顔立ちが日本人らしくない | `Japanese person from Kyushu, natural makeup` |
| 背景がきれいすぎる | `lived-in room, a little messy` |

---

## 差し替え後の確認

1. `npm run dev` で http://localhost:3000 を開く
2. ヒーロー、About、Service の写真が入れ替わっているか見る
3. 画像を差し替えた場合は、`public/images/CREDITS.md` の該当行も「AI生成（使ったサービス名）」に書き換えておく
