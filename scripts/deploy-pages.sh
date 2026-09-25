#!/usr/bin/env bash
# GitHub Pages（https://<user>.github.io/<repo>/）にデモを公開する。
# 使い方：npm run deploy:pages
# 静的サイトではお問い合わせ送信（/api/contact）は動かないため、Pages 版ではビルドから外す。
set -euo pipefail
cd "$(dirname "$0")/.."

remote=$(git remote get-url origin)
repo=$(basename -s .git "$remote")
owner=$(basename "$(dirname "$remote")")
base="/$repo"

tmp=$(mktemp -d)
trap 'mv "$tmp/api" src/app/api 2>/dev/null || true; rm -rf "$tmp"' EXIT
mv src/app/api "$tmp/api"

GITHUB_PAGES=1 PAGES_BASE_PATH="$base" NEXT_PUBLIC_SITE_URL="https://$owner.github.io$base" npm run build

# OGP画像のURLに basePath が二重に付くので直す（LINE などのサムネイル用）
find out -name '*.html' -exec perl -pi -e "s#\Q$base$base/\E#$base/#g" {} +
touch out/.nojekyll

cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$remote" gh-pages
echo "公開しました：https://$owner.github.io$base/ （反映まで1〜2分）"
