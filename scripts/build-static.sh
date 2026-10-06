#!/usr/bin/env bash
# 静的サイト（out/）として書き出す。GitHub Pages・Xserver の公開スクリプトから呼ばれる。
# 使い方：BASE_PATH=... CONTACT_ENDPOINT=... NEXT_PUBLIC_SITE_URL=... scripts/build-static.sh
# 静的サイトでは Next.js の API（src/app/api）は動かないため、ビルドのあいだだけ外す。
set -euo pipefail
cd "$(dirname "$0")/.."
root=$(pwd)

# 開発サーバー（next dev）が残した型ファイルも API を参照するので、同じく一時的に外す
tmp=$(mktemp -d)
restore() {
  mv "$tmp/api" "$root/src/app/api" 2>/dev/null || true
  mv "$tmp/dev-types" "$root/.next/dev/types" 2>/dev/null || true
  rm -rf "$tmp"
}
trap restore EXIT
mv src/app/api "$tmp/api"
if [ -d .next/dev/types ]; then mv .next/dev/types "$tmp/dev-types"; fi

rm -rf out
STATIC_EXPORT=1 npm run build

# basePath を使うとき、OGP画像のURLに basePath が二重に付くので直す（LINE などのサムネイル用）
base="${BASE_PATH:-}"
if [ -n "$base" ]; then
  find out -name '*.html' -exec perl -pi -e "s#\Q$base$base/\E#$base/#g" {} +
fi
