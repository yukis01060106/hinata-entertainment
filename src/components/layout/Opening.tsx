import { SunSticker } from "@/components/ui/SunSticker";

/**
 * オープニング：太陽のステッカーがポンと現れ、HINATA の文字が浮かぶ。
 * CSSだけで動くので、JSの読み込みを待たずに始まる。
 * 同じタブで2回目以降に見たときは、layout の inline script がスキップさせる。
 */
export function Opening() {
  return (
    <div className="opening" aria-hidden="true">
      <div className="opening__stage">
        <SunSticker className="opening__sticker" />
        <p className="opening__word">HINATA</p>
      </div>
    </div>
  );
}
