import { Fragment } from "react";
import { toPhrases } from "@/lib/phrase";

/** 見出しなどを文節で改行させる（文節の間だけ改行してよい印 <wbr> を入れ、それ以外では改行しない） */
export function Phrase({ children }: { children: string }) {
  return (
    <span className="phrase">
      {toPhrases(children).map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {p}
        </Fragment>
      ))}
    </span>
  );
}
