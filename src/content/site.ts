/**
 * サイトの文言・画像・ライバー情報は、すべてこのファイルで管理しています。
 * 文章を変えたいときや、ライバーを追加・差し替えたいときは、このファイルだけを編集してください。
 *
 * 画像の差し替え方：
 *   1. 新しい画像を public/images/ 以下に置く（例：public/images/livers/aoi.jpg）
 *   2. このファイルの image を "/images/livers/aoi.jpg" のように書き換える
 *   ※ 縦長（3:4）の写真がきれいに収まります。
 */

export const site = {
  name: "HINATA Entertainment",
  shortName: "HINATA",
  /** 公開するドメインが決まったら書き換えてください（OGP・サイトマップに使われます） */
  /** 公開するURL。未設定なら、Vercel で公開したときのURL（○○.vercel.app）を自動で使う */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://hinata-ent.jp"),
  /**
   * 検索エンジンに載せるかどうか。本番公開のときに、環境変数 NEXT_PUBLIC_ALLOW_INDEX=1 を設定してください。
   * 未設定のあいだ（デモ・確認用）は、Google などの検索結果に出ないようにしています。
   */
  allowIndex: process.env.NEXT_PUBLIC_ALLOW_INDEX === "1",
  locale: "ja_JP",
  company: "株式会社Rise Tech Solutions",

  seo: {
    title: "HINATA Entertainment｜熊本・九州のTikTok LIVEライバー事務所",
    titleTemplate: "%s｜HINATA Entertainment",
    description:
      "熊本のライバー事務所「HINATA Entertainment」。TikTok LIVEのギフト配信・ショップ配信ライバーを、熊本・九州から全国へ。未経験OK、専属マネージャーが配信を一からサポートします。九州No.1のライバー事務所を目指して、ライバーを募集中です。",
    keywords: [
      "熊本 ライバー事務所",
      "九州 ライバー事務所",
      "TikTok LIVE 事務所",
      "TikTok ライバー 募集",
      "ライバー事務所 熊本",
      "ライブ配信 事務所 九州",
      "ショップ配信 ライバー",
      "HINATA Entertainment",
    ],
  },

  /**
   * ライバー応募の窓口。ヒーロー・Recruit・スマホ下部のボタンに使われます。
   * それぞれ、事務所のアカウントのURLに書き換えてください（空 "" にすると、そのボタンは非表示になります）。
   *   LINE      … 公式LINEの友だち追加URL（例：https://lin.ee/xxxxxxx）
   *   Instagram … 事務所のアカウントURL（例：https://www.instagram.com/hinata_ent/）
   *   TikTok    … 事務所のアカウントURL（例：https://www.tiktok.com/@hinata_ent）
   */
  apply: {
    line: "https://line.me/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },

  sns: [
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ],

  nav: [
    { label: "About", ja: "名前の由来", href: "#about" },
    { label: "Service", ja: "事業内容", href: "#service" },
    { label: "Livers", ja: "所属ライバー", href: "#livers" },
    { label: "Recruit", ja: "ライバー募集", href: "#recruit" },
    { label: "FAQ", ja: "よくある質問", href: "#faq" },
    { label: "Company", ja: "会社概要", href: "#company" },
    { label: "Contact", ja: "お問い合わせ", href: "#contact" },
  ],
};

export const hero = {
  catch: ["ライバーが、", "一番輝ける場所へ。"],
  lead: "熊本から、ライバーが一番輝ける「ひなた」をつくる。\nTikTok LIVEのライバー事務所です。",
  cta: { label: "ライバー応募", href: "#contact" },
  /** ヒーローで縦に流れる写真（左列・右列）。枚数は自由に増減できます */
  columns: [
    ["/images/hero/hero-01.jpg", "/images/hero/hero-02.jpg", "/images/hero/hero-03.jpg"],
    ["/images/hero/hero-04.jpg", "/images/hero/hero-05.jpg", "/images/hero/hero-06.jpg"],
  ],
};

export const about = {
  lead: "HINATAという名前には、ライバーと、応援してくれる人と、熊本という土地への想いが込められています。",
  heading: "日向",
  headingRuby: "ひなた",
  chapters: [
    {
      no: "01",
      title: "日の当たる場所へ",
      body: "「ひなた」は「日の方（かた）」から生まれた言葉で、日の光が当たる場所を意味します。所属するライバー一人ひとりが、日の当たる場所で輝けるように。そのために光を当て続けることが、私たちの役目です。",
      image: "/images/about/about-01.jpg",
      caption: "日の当たる場所で",
    },
    {
      no: "02",
      title: "九州の太陽と、火の国・熊本の熱",
      body: "「日向」は、古くは「ひむか」と呼ばれた九州の地名でもあり、陽当たりが良く暖かい土地という意味を持っています。私たちが拠点とする熊本は、阿蘇の火の国です。九州の太陽と熊本の熱を名前に込めて、この地から発信していきます。",
      image: "/images/about/about-02.jpg",
      caption: "阿蘇・中岳火口",
    },
    {
      no: "03",
      title: "人が集まる、温かい場所に",
      body: "日なたに自然と人が集まるように、ライバーも、応援してくれる方も、ふらっと立ち寄りたくなる。HINATAは、そんな温かい場所でありたいと考えています。",
      image: "/images/about/about-03.jpg",
      caption: "ふらっと、立ち寄れる場所",
    },
  ],
  closing: [
    "熊本から、ライバーが一番輝ける",
    "「ひなた」をつくる。",
  ],
  closingSub: "九州No.1のライバー事務所を目指して、私たちは挑戦を続けます。",
};

export const marquees = {
  first: ["熊本から、全国へ。", "Live from Kumamoto", "ひなたをつくる。", "TikTok LIVE"],
  second: ["未経験OK", "スマホ1台からはじめる", "Kyushu to Japan", "ライバー募集中"],
};

export const service = {
  lead: "ギフト配信と、ショップ配信。\nふたつの光で、ライバーの「好き」と「得意」を仕事にします。",
  pillars: [
    {
      key: "gift",
      en: "GIFT LIVE",
      ja: "ギフト配信ライバー",
      body: "TikTok LIVEで、リスナーとの会話や歌、パフォーマンスを届けるライバー。応援の気持ちが「ギフト」として届き、それが収益になります。",
      image: "/images/service/gift.jpg",
      supports: [
        { title: "配信戦略の設計", body: "キャラクター・配信時間・企画を一緒に考え、伸びる配信スタイルをつくります。" },
        { title: "イベント・ランキング支援", body: "TikTok LIVEの公式イベントやランキングに向けて、作戦と応援体制を整えます。" },
        { title: "専属マネージャー", body: "日々の配信の振り返りから悩み相談まで、担当マネージャーが伴走します。" },
      ],
    },
    {
      key: "shop",
      en: "SHOP LIVE",
      ja: "ショップ配信ライバー",
      body: "TikTok Shopのライブ配信で、商品の魅力を伝えて販売するライバー。企業と組み、「売れる」ライブコマースを届けます。",
      image: "/images/service/shop.jpg",
      supports: [
        { title: "企業・商品のマッチング", body: "ライバーの個性に合う商品や企業案件を、事務所がご紹介します。" },
        { title: "販売トーク・台本の作成", body: "商品の見せ方、話す順番、購入につながる言葉選びまでサポートします。" },
        { title: "機材・撮影のサポート", body: "照明・カメラ・配信環境づくりをサポートし、画面の「映え」を高めます。" },
      ],
    },
  ],
};

export type Liver = {
  nameEn: string;
  nameJa: string;
  genre: "GIFT" | "SHOP";
  comment: string;
  image: string;
  tiktok?: string;
};

/**
 * 所属ライバー（仮）。配列の順番がそのまま表示順になります。
 * ※ 今の写真は Unsplash の仮素材で、写っているのは事務所と無関係の方です。公開前に必ず差し替えてください。
 */
export const livers: Liver[] = [
  { nameEn: "AOI", nameJa: "あおい", genre: "GIFT", comment: "歌とおしゃべりで、夜をあたためます。", image: "/images/livers/liver-01.jpg", tiktok: "https://www.tiktok.com/" },
  { nameEn: "HARUKA", nameJa: "はるか", genre: "SHOP", comment: "熊本の美味しいもの、全力で紹介します。", image: "/images/livers/liver-02.jpg", tiktok: "https://www.tiktok.com/" },
  { nameEn: "REN", nameJa: "れん", genre: "GIFT", comment: "ゲーム実況と雑談がメインです。", image: "/images/livers/liver-03.jpg", tiktok: "https://www.tiktok.com/" },
  { nameEn: "MIO", nameJa: "みお", genre: "SHOP", comment: "コスメとファッションが大好き。", image: "/images/livers/liver-04.jpg", tiktok: "https://www.tiktok.com/" },
  { nameEn: "SORA", nameJa: "そら", genre: "GIFT", comment: "阿蘇育ち。朝配信やってます。", image: "/images/livers/liver-05.jpg", tiktok: "https://www.tiktok.com/" },
  { nameEn: "HINA", nameJa: "ひな", genre: "GIFT", comment: "ダンスと笑顔を届けます！", image: "/images/livers/liver-06.jpg", tiktok: "https://www.tiktok.com/" },
];

export const recruit = {
  heading: ["あなたにも、", "ひなたを。"],
  lead: "特別な才能も、配信の経験もいりません。\n「やってみたい」という気持ちがあれば、光の当て方は私たちが一緒に考えます。",
  points: [
    { big: "未経験OK", body: "配信経験ゼロからでも大丈夫。はじめ方から丁寧にお伝えします。" },
    { big: "熊本・九州から全国へ", body: "地元に住んだまま、全国のリスナーに届けられます。" },
    { big: "スマホ1台で", body: "特別な機材は必要ありません。必要になったら一緒に揃えます。" },
    { big: "専属マネージャー", body: "一人で悩ませません。いつでも相談できる担当がつきます。" },
  ],
  steps: [
    { no: "01", title: "応募フォームを送信", body: "このページ下のフォームから、1分で応募できます。" },
    { no: "02", title: "面談（オンライン可）", body: "配信への想いや、やりたいことをお聞かせください。" },
    { no: "03", title: "ご契約・配信準備", body: "キャラクター設計や配信環境を、マネージャーと一緒に整えます。" },
    { no: "04", title: "ライバーデビュー", body: "いよいよ、あなたの「ひなた」が始まります。" },
  ],
};

/** 会社概要。「（仮）」の項目は確定したら書き換えてください */
/**
 * よくある質問。Googleの検索結果にも表示されることがあります。
 * ※ 報酬・費用・ノルマなどは、実際の契約条件に合わせて必ず書き換えてください。
 */
export const faq = [
  {
    q: "配信の経験がまったくなくても大丈夫ですか？",
    a: "大丈夫です。所属ライバーの多くが未経験からのスタートです。配信の始め方、話し方、配信時間の決め方まで、専属マネージャーが一緒に考えます。",
  },
  {
    q: "顔を出さずに配信することはできますか？",
    a: "ご相談ください。手元や声だけの配信、イラストを使った配信など、顔出しをしない配信スタイルもあります。面談で、ご希望に合う形を一緒に探します。",
  },
  {
    q: "所属するのに費用はかかりますか？",
    a: "登録料やレッスン料などの費用はいただいていません。配信に必要な機材も、スマホ1台から始められます。",
  },
  {
    q: "学校や仕事と両立できますか？",
    a: "できます。配信する時間帯や頻度は、生活リズムに合わせて決められます。学生の方や、お仕事をしながら配信している方もいます。",
  },
  {
    q: "配信時間などのノルマはありますか？",
    a: "厳しいノルマはありません。目標は、マネージャーと相談しながら、無理のない範囲で一緒に決めていきます。",
  },
  {
    q: "熊本・九州以外に住んでいても応募できますか？",
    a: "はい、全国どこからでも応募できます。面談やサポートはオンラインでも行っています。",
  },
  {
    q: "何歳から応募できますか？",
    a: "TikTok LIVEの利用条件にあわせて、18歳以上の方を募集しています。",
  },
];

export const company = [
  { label: "事務所名", value: "HINATA Entertainment" },
  { label: "運営会社", value: "株式会社Rise Tech Solutions" },
  { label: "所在地", value: "〒860-0000 熊本県熊本市（仮）" },
  { label: "事業内容", value: "TikTok LIVEライバーのマネジメント\nギフト配信・ショップ配信ライバーの育成\nライブコマースの企画・運営" },
  { label: "お問い合わせ", value: "本ページのお問い合わせフォームよりご連絡ください" },
];

export const contact = {
  lead: "ライバーへの応募と、企業さまからのお問い合わせは、それぞれのフォームからお送りください。",
  tabs: {
    apply: "ライバー応募",
    business: "企業のお問い合わせ",
  },
  genres: ["ギフト配信", "ショップ配信", "どちらも興味がある", "まだ決めていない"],
  experiences: ["未経験", "少しある（半年未満）", "半年以上", "他事務所に所属経験あり"],
  /** Serviceの下に出る、企業向けの一言 */
  businessNote: "ショップ配信（ライブコマース）のご依頼や、PR・タイアップのご相談も受け付けています。",
  businessTypes: ["ショップ配信（ライブコマース）のご依頼", "PR・タイアップのご相談", "取材・メディア掲載", "その他"],
};
