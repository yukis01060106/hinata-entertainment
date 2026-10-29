import "server-only";
import { loadDefaultJapaneseParser } from "budoux";

/**
 * 日本語を文節に区切る（BudouX）。見出しを「ライバーが｜一番｜輝ける」のように文節で改行させるために使う。
 * CSS の word-break: auto-phrase は Chrome でしか効かず、iPhone の Safari で単語の途中で改行されてしまうため。
 * 区切りの計算はサーバー（書き出し時）だけで行い、ブラウザにはライブラリを送らない。
 */
const parser = loadDefaultJapaneseParser();

export function toPhrases(text: string): string[] {
  return parser.parse(text);
}
