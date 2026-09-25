/** 大きな文字が横に流れる。スクロールの速さに合わせて加速する */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => {
        const isLatin = /^[\x00-\x7F]+$/.test(item);
        return (
          <span key={i} className="flex items-center">
            <span
              className={`px-[0.45em] leading-none ${
                isLatin
                  ? "font-serif text-[clamp(3.2rem,12vw,9rem)] italic"
                  : "font-mincho text-[clamp(2.4rem,9vw,6.6rem)] font-extrabold"
              }`}
            >
              {item}
            </span>
            <span className="sun size-[clamp(0.9rem,2.4vw,1.6rem)] shrink-0" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="marquee border-y border-ink/10 py-[clamp(1.6rem,5vw,3.5rem)]" data-marquee={reverse ? "reverse" : "forward"}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
