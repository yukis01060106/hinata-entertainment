import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Shippori_Mincho_B1 } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Opening } from "@/components/layout/Opening";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { MotionController } from "@/components/motion/MotionController";
import { LightCursor } from "@/components/motion/LightCursor";
import { Grain } from "@/components/motion/Grain";
import "./globals.css";

// 日本語の見出し用の明朝体だけWebフォントにする（preload せず、必要な文字だけ順次読み込む）。
// 本文のゴシック体は端末標準（iPhoneはヒラギノ角ゴ、AndroidはNoto Sans）を使い、表示速度を優先。
const shippori = Shippori_Mincho_B1({ weight: "800", subsets: ["latin"], variable: "--font-shippori", display: "swap", preload: false });
// 英字：雑誌のような細身のセリフ体と、キャプション用の等幅フォント
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const dmMono = DM_Mono({ weight: "400", subsets: ["latin"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

// 構造化データ（Googleに「熊本のライバー事務所」だと伝える）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: ["HINATA", "ひなたエンターテインメント"],
  url: site.url,
  description: site.seo.description,
  parentOrganization: { "@type": "Organization", name: site.company },
  address: { "@type": "PostalAddress", addressRegion: "熊本県", addressCountry: "JP" },
  areaServed: ["熊本県", "九州", "日本"],
  knowsAbout: ["TikTok LIVE", "ライブ配信", "ライバーマネジメント", "ライブコマース"],
  sameAs: site.sns.map((s) => s.href),
};

// JS有効の目印と、同じタブで2回目以降はオープニングを省略する処理（描画前に実行）
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('hinata-opening')){d.classList.add('skip-opening')}else{sessionStorage.setItem('hinata-opening','1')}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${shippori.variable} ${instrument.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-ink px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          本文へスキップ
        </a>
        <div className="sky" aria-hidden="true" />
        <Opening />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCTA />
        <LightCursor />
        <Grain />
        <MotionController />
      </body>
    </html>
  );
}
