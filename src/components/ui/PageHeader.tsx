import Link from "next/link";
import { site } from "@/content/site";
import { Split } from "@/components/ui/Split";

type Props = { path: string; title: string; en: string; lead: string };

/** 下層ページの見出し：パンくずリスト、大きな英字、ページ名（h1）、導入文 */
export function PageHeader({ path, title, en, lead }: Props) {
  // Google にページの階層を伝える（検索結果に「トップ › 事業内容」のように出る）
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: title, item: `${site.url}${path}/` },
    ],
  };
  return (
    <section data-sky="dawn" className="relative overflow-hidden px-[var(--gutter)] pt-32 pb-[clamp(3rem,8vw,6rem)] md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <span aria-hidden="true" className="sun float float--slow pointer-events-none absolute -top-[14vmin] -right-[12vmin] aspect-square w-[46vmin] opacity-60 blur-[2px]" />
      <div className="relative mx-auto max-w-7xl">
        <nav aria-label="パンくずリスト" className="cap" data-reveal="fade">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:text-deep hover:underline">
                Top
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <Split as="p" lines={[en]} className="display mt-8 text-[clamp(4.2rem,20vw,13rem)] italic" />
        <h1 className="mt-4 font-display text-[clamp(1.6rem,6vw,2.8rem)] leading-snug font-bold" data-reveal="fade">
          {title}
        </h1>
        {/* lead の改行は PC だけで効かせる（スマホは自然に折り返す） */}
        <p className="mt-6 max-w-xl text-[0.95rem] leading-[2.1] text-ink/80 md:text-base" data-reveal="fade">
          {lead.split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br className="hidden md:block" />}
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
