#!/usr/bin/env bash
# GitHub Pages（https://<user>.github.io/<repo>/）にデモを公開する。
# 使い方：npm run deploy:pages
set -euo pipefail
cd "$(dirname "$0")/.."

remote=$(git remote get-url origin)
repo=$(basename -s .git "$remote")
owner=$(basename "$(dirname "$remote")")
base="/$repo"

# デモなので、フォームは送信しない（CONTACT_ENDPOINT を空に）・検索エンジンにも載せない
BASE_PATH="$base" CONTACT_ENDPOINT="" NEXT_PUBLIC_SITE_URL="https://$owner.github.io$base" NEXT_PUBLIC_ALLOW_INDEX="" \
  scripts/build-static.sh
touch out/.nojekyll

cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$remote" gh-pages
echo "公開しました：https://$owner.github.io$base/ （反映まで1〜2分）"
