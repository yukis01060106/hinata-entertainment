#!/usr/bin/env bash
# Xserver に本番サイトを公開する。
# 使い方：npm run deploy:xserver            … 書き出してアップロード
#         npm run deploy:xserver -- --dry-run … アップロードせず、送られるファイルだけ確認
# 設定はプロジェクト直下の .env.xserver（ひな形：xserver/env.example）。
set -euo pipefail
cd "$(dirname "$0")/.."

dry_run=""
[ "${1:-}" = "--dry-run" ] && dry_run="--dry-run"

if [ ! -f .env.xserver ]; then
  echo "設定ファイル .env.xserver がありません。xserver/env.example をコピーして作ってください。" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
. ./.env.xserver
set +a

for v in XSERVER_SSH_HOST XSERVER_SSH_USER XSERVER_SSH_KEY XSERVER_DOMAIN SITE_URL CONTACT_TO_EMAIL CONTACT_FROM_EMAIL; do
  if [ -z "${!v:-}" ]; then
    echo ".env.xserver の $v が空です。" >&2
    exit 1
  fi
done

key="${XSERVER_SSH_KEY/#\~/$HOME}"
ssh_cmd="ssh -p 10022 -i $key -o IdentitiesOnly=yes"
remote="$XSERVER_SSH_USER@$XSERVER_SSH_HOST"
dest="$XSERVER_DOMAIN/public_html"

# 1. 公開先のフォルダがあるか（＝ドメインが Xserver に追加済みか）を先に確かめる
if ! $ssh_cmd "$remote" "test -d '$dest'"; then
  echo "サーバーに $dest がありません。Xserver のサーバーパネルでドメインを追加してください。" >&2
  exit 1
fi

# 2. 書き出し（basePath なし、フォームは contact.php に送る）
BASE_PATH="" CONTACT_ENDPOINT="/contact.php" \
  NEXT_PUBLIC_SITE_URL="$SITE_URL" NEXT_PUBLIC_ALLOW_INDEX="${ALLOW_INDEX:-}" \
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="${GOOGLE_SITE_VERIFICATION:-}" \
  scripts/build-static.sh

# 3. Xserver 用のファイルを足す
cp xserver/contact.php xserver/.htaccess out/
node -e '
  const cfg = { to: process.env.CONTACT_TO_EMAIL, from: process.env.CONTACT_FROM_EMAIL, from_name: "HINATA Entertainment", dry_run: false };
  const json = JSON.stringify(cfg).replace(/\\/g, "\\\\").replace(/'"'"'/g, "\\'"'"'");
  require("fs").writeFileSync("out/contact-config.php", "<?php\n// scripts/deploy-xserver.sh が .env.xserver から作るファイル\nreturn json_decode('"'"'" + json + "'"'"', true);\n");
'

# 4. いまサーバーにある .htaccess が自前のものでなければ、念のため控えを取る
if [ -z "$dry_run" ]; then
  $ssh_cmd "$remote" "cd '$dest' && if [ -f .htaccess ] && ! grep -q 'HINATA Entertainment（Xserver 用）' .htaccess; then cp .htaccess .htaccess.bak-\$(date +%Y%m%d%H%M%S); fi"
fi

# 5. アップロード（サーバーにだけあるファイルは消さない）
rsync -rlvz --checksum $dry_run -e "$ssh_cmd" out/ "$remote:$dest/"

if [ -n "$dry_run" ]; then
  echo "（--dry-run のため、アップロードはしていません）"
else
  echo "公開しました：$SITE_URL/"
fi
