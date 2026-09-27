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

  /** 所在地。事務所概要・構造化データ（Google向け）に使われます */
  address: {
    postalCode: "860-0047",
    region: "熊本県",
    locality: "熊本市西区",
    street: "春日1丁目14-1",
    /** 緯度・経度（Googleマップ・構造化データ用） */
    geo: { lat: 32.7897, lng: 130.6886 },
    building: "くまもと森都心プラザ2階 XOSS POINT.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E3%81%8F%E3%81%BE%E3%82%82%E3%81%A8%E6%A3%AE%E9%83%BD%E5%BF%83%E3%83%97%E3%83%A9%E3%82%B6",
  },

  seo: {
    title: "熊本・福岡・九州のライバー事務所｜TikTok LIVE特化のHINATA Entertainment",
    titleTemplate: "%s｜HINATA Entertainment",
    description:
      "熊本・福岡・九州のライバー事務所「HINATA Entertainment」。TikTok LIVEを中心に、ギフト配信・ショップ配信のライバーを募集しています。未経験OK、スマホ1台から始められて、専属マネージャーが配信をサポートします。熊本を拠点に、九州から全国へ。",
    keywords: [
      "ライバー事務所 熊本",
      "ライバー事務所 福岡",
      "ライバー事務所 九州",
      "ライブ配信 ライバー事務所",
      "ライブ配信 事務所 熊本",
      "ライブ配信 事務所 福岡",
      "TikTok LIVE ライバー事務所",
      "TikTok ライバー 募集",
      "ショップ配信 ライバー",
      "HINATA Entertainment",
    ],
  },

  /**
   * ライバー応募の窓口。ヒーロー・Recruit・スマホ下部のボタンに使われます。
   * 事務所のアカウントができたら、URLを入れてください（空 "" のあいだは、そのボタンは表示されません）。
   *   LINE      … 公式LINEの友だち追加URL（例：https://lin.ee/xxxxxxx）
   *   Instagram … 事務所のアカウントURL（例：https://www.instagram.com/hinata_ent/）
   *   TikTok    … 事務所のアカウントURL（例：https://www.tiktok.com/@hinata_ent）
   */
  apply: {
    // ※ 仮リンク（LINE公式のトップ）。公式LINEができたら友だち追加URLに差し替える
    line: "https://line.me/",
    instagram: "",
    tiktok: "",
  },

  /** フッターに並ぶSNS。URLが空のものは表示されません */
  sns: [
    { label: "TikTok", href: "" },
    { label: "Instagram", href: "" },
    { label: "X", href: "" },
  ],

  nav: [
    { label: "TikTok LIVE", ja: "TikTok LIVE", href: "#tiktok-live" },
    { label: "About", ja: "名前の由来", href: "#about" },
    { label: "Service", ja: "事業内容", href: "#service" },
    { label: "Livers", ja: "所属ライバー", href: "#livers" },
    { label: "Recruit", ja: "ライバー募集", href: "#recruit" },
    { label: "FAQ", ja: "よくある質問", href: "#faq" },
    { label: "Company", ja: "事務所概要", href: "#company" },
    { label: "Contact", ja: "お問い合わせ", href: "#contact" },
  ],
};

export const hero = {
  catch: ["ライバーが、", "一番輝ける場所へ。"],
  lead: "熊本発、TikTok LIVEを中心に活動するライバー事務所です。\n配信がはじめての方も、スマホ1台から始められます。",
  cta: { label: "ライバー応募", href: "#contact" },
  /** ヒーローで縦に流れる写真（左列・右列）。枚数は自由に増減できます */
  columns: [
    ["/images/livers/member-01.jpg", "/images/livers/member-04.jpg", "/images/livers/member-09.jpg", "/images/livers/member-06.jpg", "/images/livers/member-11.jpg", "/images/livers/member-03.jpg"],
    ["/images/livers/member-05.jpg", "/images/livers/member-08.jpg", "/images/livers/member-02.jpg", "/images/livers/member-07.jpg", "/images/livers/member-10.jpg"],
  ],
};

/** ヒーロー直後の「なぜTikTok LIVEなのか」。事務所がTikTok LIVEを中心にしていることを伝える */
export const tiktokLive = {
  heading: ["TikTok LIVEなら、", "HINATAへ。"],
  lead: "HINATAは、TikTok LIVEを中心に活動するライバー事務所です。\nひとつのアプリに絞っているからこそ、配信のコツやイベントの情報をしっかりお伝えできます。",
  reasons: [
    {
      en: "Discover",
      title: "おすすめから、新しいリスナーに出会える",
      body: "TikTokでは、フォロワーが少ないうちでも「おすすめ」にライブが表示されることがあります。配信を始めたばかりでも、たくさんの人に見てもらえるチャンスがあります。",
    },
    {
      en: "Gift & Shop",
      title: "ギフトとショップ、2つの収入源",
      body: "リスナーから贈られる「ギフト」に加えて、TikTok Shopでの商品販売でも収入を得られます。自分に合ったスタイルを選べます。",
    },
    {
      en: "Specialist",
      title: "TikTok LIVEにくわしいスタッフがサポート",
      body: "イベントやランキングの情報、配信の見せ方、見てもらいやすい時間帯まで。TikTok LIVEに絞って集めた情報とノウハウで、一人ひとりをサポートします。",
    },
  ],
};

export const about = {
  lead: "HINATAという名前には、ライバー、応援してくださるみなさん、そして熊本への想いを込めています。",
  heading: "日向",
  headingRuby: "ひなた",
  chapters: [
    {
      no: "01",
      title: "日の当たる場所へ",
      body: "「ひなた」は、日の光が当たる場所のこと。所属するライバー一人ひとりが、日の当たる場所で輝けるように。そのための舞台を整え、応援し続けるのが私たちの役目です。",
      image: "/images/livers/member-10.jpg",
      caption: "日の当たる場所で",
    },
    {
      no: "02",
      title: "九州の太陽と、\n火の国・熊本の熱",
      body: "「日向（ひむか）」は、古くから九州にある地名でもあり、日当たりがよく暖かい土地という意味があります。そして私たちの拠点・熊本は、阿蘇を抱く「火の国」。九州の太陽と熊本の熱を名前に込めて、ここから発信していきます。",
      image: "/images/about/kumamoto-castle.jpg",
      alt: "夕暮れの熊本城",
      caption: "熊本城",
    },
    {
      no: "03",
      title: "人が集まる、温かい場所に",
      body: "日なたには、自然と人が集まってきます。ライバーも、応援してくださる方も、気軽に立ち寄れる。HINATAは、そんな温かい場所でありたいと考えています。",
      image: "/images/livers/member-07.jpg",
      caption: "気軽に立ち寄れる場所",
    },
  ],
  closing: [
    "熊本から、ライバーが一番輝ける",
    "「ひなた」をつくる。",
  ],
  closingSub: "九州No.1のライバー事務所を目指して、挑戦を続けます。",
};

export const marquees = {
  first: ["TikTok LIVE特化", "熊本から全国へ", "Live from Kumamoto", "ライバー事務所 HINATA"],
  second: ["未経験OK", "熊本・福岡・九州で募集中", "スマホ1台で始められる", "ライバー募集中"],
};

export const service = {
  lead: "TikTok LIVEでの「ギフト配信」と「ショップ配信」。\nライバーの「好き」や「得意」を、仕事にしていきます。",
  pillars: [
    {
      key: "gift",
      en: "GIFT LIVE",
      ja: "ギフト配信ライバー",
      body: "TikTok LIVEで、リスナーとの会話や歌、パフォーマンスを届けるライバーです。応援の気持ちが「ギフト」として贈られ、それが収入になります。",
      image: "/images/livers/member-04.jpg",
      supports: [
        { title: "配信スタイルづくり", body: "キャラクターや配信時間、企画を一緒に考えて、伸びる配信スタイルをつくります。" },
        { title: "イベント・ランキング対策", body: "TikTok LIVEの公式イベントやランキングに向けて、作戦と応援体制を整えます。" },
        { title: "専属マネージャー", body: "日々の配信の振り返りから悩みごとの相談まで、担当マネージャーがそばでサポートします。" },
      ],
    },
    {
      key: "shop",
      en: "SHOP LIVE",
      ja: "ショップ配信ライバー",
      body: "TikTok Shopのライブ配信で、商品の魅力を伝えて販売するライバーです。企業と組んで、しっかり「売れる」ライブコマースを届けます。",
      image: "/images/livers/member-08.jpg",
      supports: [
        { title: "企業・商品とのマッチング", body: "ライバーの個性に合う商品や企業の案件を、事務所からご紹介します。" },
        { title: "販売トーク・台本づくり", body: "商品の見せ方や話す順番、購入につながる言葉選びまでサポートします。" },
        { title: "機材・撮影のサポート", body: "照明やカメラなどの配信環境を整えて、画面の見栄えをよくします。" },
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
 * 所属ライバー。配列の順番がそのまま表示順になります。
 * ※ 今の写真・名前はイメージ用です（写真はAIで生成した架空の人物）。実際の所属ライバーが決まったら差し替えてください。
 */
export const livers: Liver[] = [
  { nameEn: "HINANO", nameJa: "ひなの", genre: "GIFT", comment: "笑い声の大きさには自信あり。毎晩にぎやかに配信中！", image: "/images/livers/member-01.jpg" },
  { nameEn: "SAKI", nameJa: "さき", genre: "SHOP", comment: "ナチュラルコスメが大好き。本音でレビューしています。", image: "/images/livers/member-02.jpg" },
  { nameEn: "RIKO", nameJa: "りこ", genre: "SHOP", comment: "元アパレル店員。着回しとコーデ提案が得意です。", image: "/images/livers/member-03.jpg" },
  { nameEn: "AIRI", nameJa: "あいり", genre: "GIFT", comment: "夜の歌枠で、一日の終わりに寄り添います。", image: "/images/livers/member-04.jpg" },
  { nameEn: "MAYU", nameJa: "まゆ", genre: "SHOP", comment: "熊本の美味しいもの、全力で紹介します。", image: "/images/livers/member-05.jpg" },
  { nameEn: "TAKUMI", nameJa: "たくみ", genre: "GIFT", comment: "ゲーム実況と雑談がメイン。初見さん大歓迎です。", image: "/images/livers/member-06.jpg" },
  { nameEn: "YUTO", nameJa: "ゆうと", genre: "GIFT", comment: "深夜のゆる雑談枠。眠れない夜に気軽に来てね。", image: "/images/livers/member-07.jpg" },
  { nameEn: "MOE", nameJa: "もえ", genre: "GIFT", comment: "寝る前のまったり配信。一緒にのんびりしませんか？", image: "/images/livers/member-08.jpg" },
  { nameEn: "CHIHIRO", nameJa: "ちひろ", genre: "SHOP", comment: "毎日使えるプチプラ雑貨を、使い心地まで紹介します。", image: "/images/livers/member-09.jpg" },
  { nameEn: "MIO", nameJa: "みお", genre: "GIFT", comment: "阿蘇育ち。朝の配信で、元気をおすそわけします。", image: "/images/livers/member-10.jpg" },
  { nameEn: "YUI", nameJa: "ゆい", genre: "GIFT", comment: "配信歴3か月。未経験から、毎日楽しく続けています。", image: "/images/livers/member-11.jpg" },
];

export const recruit = {
  heading: ["次に輝くのは、", "あなたです。"],
  lead: "特別な才能も、配信の経験もいりません。\n「やってみたい」という気持ちがあれば、あとは私たちが一緒に考えます。",
  points: [
    { big: "未経験OK", body: "配信がはじめてでも大丈夫。始め方から丁寧にお伝えします。" },
    { big: "熊本・福岡・九州から全国へ", body: "地元に住んだまま、全国のリスナーに配信を届けられます。" },
    { big: "スマホ1台で", body: "特別な機材は必要ありません。必要になったら一緒に揃えましょう。" },
    { big: "専属マネージャー", body: "ひとりで悩まなくて大丈夫。いつでも相談できる担当がつきます。" },
  ],
  steps: [
    { no: "01", title: "応募フォームを送信", body: "このページ下のフォームから、1分で応募できます。" },
    { no: "02", title: "面談（オンライン可）", body: "配信への想いや、やってみたいことをお聞かせください。" },
    { no: "03", title: "ご契約・配信準備", body: "キャラクターづくりや配信環境の準備を、マネージャーと一緒に進めます。" },
    { no: "04", title: "ライバーデビュー", body: "いよいよ配信スタート。事務所みんなで応援します。" },
  ],
};

/**
 * よくある質問。Googleの検索結果にも表示されることがあります。
 * ※ 報酬・費用・ノルマなどは、実際の契約条件に合わせて必ず書き換えてください。
 */
export const faq = [
  {
    q: "配信の経験がまったくなくても大丈夫ですか？",
    a: "大丈夫です。はじめての方も大歓迎です。配信の始め方や話し方、配信する時間帯まで、専属マネージャーが一緒に考えます。",
  },
  {
    q: "TikTok以外のアプリでも配信できますか？",
    a: "HINATAはTikTok LIVEに特化した事務所のため、サポートもTikTok LIVEが中心です。ほかのアプリで配信していた方も大歓迎です。詳しくは面談でご相談ください。",
  },
  {
    q: "顔を出さずに配信することはできますか？",
    a: "ご相談ください。手元だけ・声だけの配信や、イラストを使った配信など、顔を出さないスタイルもあります。面談で、ご希望に合う形を一緒に考えます。",
  },
  {
    q: "所属するのに費用はかかりますか？",
    a: "登録料やレッスン料などの費用はかかりません。機材も、スマホ1台あれば始められます。",
  },
  {
    q: "学校や仕事と両立できますか？",
    a: "できます。配信の時間帯や頻度は、生活リズムに合わせて決められます。学生の方や、お仕事をしている方も歓迎です。",
  },
  {
    q: "配信時間などのノルマはありますか？",
    a: "厳しいノルマはありません。目標はマネージャーと相談しながら、無理のない範囲で決めていきます。",
  },
  {
    q: "福岡など、熊本以外に住んでいても所属できますか？",
    a: "はい、所属できます。熊本・福岡をはじめ九州のどこに住んでいても、また九州以外の方も大歓迎です。面談やふだんのサポートは、オンラインでも行っています。",
  },
  {
    q: "何歳から応募できますか？",
    a: "TikTok LIVEの利用条件にあわせて、18歳以上の方を募集しています。",
  },
];

export const company: { label: string; value: string; link?: { label: string; href: string } }[] = [
  { label: "事務所名", value: "HINATA Entertainment" },
  {
    label: "所在地",
    value: `〒${site.address.postalCode}\n${site.address.region}${site.address.locality}${site.address.street}\n${site.address.building}`,
    link: { label: "Googleマップで見る", href: site.address.mapUrl },
  },
  { label: "活動エリア", value: "熊本を拠点に、福岡・九州全域で活動\n全国どこからでも、オンラインで所属できます" },
  { label: "事業内容", value: "TikTok LIVEライバーのマネジメント\nギフト配信・ショップ配信ライバーの育成\nライブコマースの企画・運営" },
  { label: "お問い合わせ", value: "このページのお問い合わせフォームからご連絡ください" },
];

export const contact = {
  lead: "ライバーへの応募と、企業の方からのお問い合わせは、それぞれのフォームからお送りください。",
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
