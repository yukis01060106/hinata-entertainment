import { MoreLink, SunButton } from "@/components/ui/SunButton";

/** 下層ページの最後に置く、応募・お問い合わせへの入口 */
export function CtaBand() {
  return (
    <section data-sky="dusk" className="relative px-[var(--gutter)] py-[clamp(4rem,10vw,7rem)]">
      <div className="dusk relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] px-6 py-[clamp(3.5rem,9vw,6rem)] text-center" data-reveal="fade">
        <p className="cap">Join us</p>
        <p className="mt-4 font-mincho text-[clamp(1.7rem,6.4vw,3.2rem)] leading-snug font-extrabold">
          まずは気軽に、
          <br />
          ご相談ください。
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-loose md:text-base">ライバーへの応募も、企業の方からのご相談も、こちらから受け付けています。</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <SunButton href="/contact?kind=apply" variant="ink">
            ライバーに応募する
          </SunButton>
          <MoreLink href="/contact?kind=business">企業の方はこちら</MoreLink>
        </div>
      </div>
    </section>
  );
}
