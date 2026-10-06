<?php
/**
 * お問い合わせフォームの送信先（Xserver 用）。
 * フォームから JSON で受け取り、内容を確認して、事務所のメールアドレスに送る。
 * 送信先などの設定は、同じフォルダの contact-config.php（公開スクリプトが自動で作る）にある。
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require __DIR__ . '/contact-config.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => '送信方法が正しくありません。']);
}

// ほかのサイトから送らせない（ブラウザが付ける Origin を、このサイトのホストと照合する）
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    respond(403, ['error' => '送信元が正しくありません。']);
}

$raw = file_get_contents('php://input', false, null, 0, 32 * 1024);
$body = json_decode($raw === false ? '' : $raw, true);
if (!is_array($body)) {
    respond(400, ['error' => '送信内容を読み取れませんでした。']);
}

// 値はすべて文字列として扱い、長すぎるものは切る
$get = static function (string $key) use ($body): string {
    $v = $body[$key] ?? '';
    return is_string($v) ? mb_substr(trim($v), 0, 4000) : '';
};

// スパム対策：見えない入力欄に値が入っていたら、成功したふりをして捨てる
if ($get('website') !== '') {
    respond(200, ['ok' => true]);
}

$labels = [
    'name' => 'お名前',
    'age' => '年齢',
    'area' => '都道府県',
    'tiktok' => 'TikTok',
    'email' => 'メール',
    'tel' => '電話番号',
    'experience' => '配信経験',
    'genre' => '興味のある配信',
    'company' => '会社名',
    'topic' => 'お問い合わせ種別',
    'message' => '内容',
];
$required = [
    'apply' => ['name', 'age', 'area', 'email', 'experience', 'genre'],
    'business' => ['company', 'name', 'email', 'topic', 'message'],
];

$kind = $get('kind') === 'business' ? 'business' : 'apply';
foreach ($required[$kind] as $key) {
    if ($get($key) === '') {
        respond(400, ['error' => '必須項目が入力されていません。']);
    }
}
if ($get('agree') !== 'yes') {
    respond(400, ['error' => '必須項目が入力されていません。']);
}
$email = $get('email');
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(400, ['error' => 'メールアドレスの形式が正しくありません。']);
}

// 連続送信の制限：同じ接続元から10分に5回まで
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$stamp = sys_get_temp_dir() . '/hinata-contact-' . sha1($ip . __DIR__);
$now = time();
$recent = [];
if (is_file($stamp)) {
    $recent = array_filter(
        array_map('intval', explode("\n", (string) file_get_contents($stamp))),
        static fn (int $t): bool => $t > $now - 600
    );
}
if (count($recent) >= 5) {
    respond(429, ['error' => '短い時間に何度も送信されています。時間をおいて再度お試しください。']);
}
$recent[] = $now;
@file_put_contents($stamp, implode("\n", $recent), LOCK_EX);

// メール本文
$title = $kind === 'apply' ? '【ライバー応募】' : '【企業お問い合わせ】';
$lines = [];
foreach ($labels as $key => $label) {
    $v = $get($key);
    if ($v !== '') {
        $lines[] = $label . '：' . $v;
    }
}
$text = $title . "\n\n" . implode("\n", $lines) . "\n\n---\n送信日時：" . date('Y-m-d H:i') . "\n送信元：" . ($_SERVER['HTTP_HOST'] ?? '') . "\n";

// 件名・ヘッダーに改行を入れさせない（メールヘッダーの書き換え対策）
$oneLine = static fn (string $s): string => mb_substr(preg_replace('/[\r\n]+/', ' ', $s) ?? '', 0, 80);
$subject = $title . ($kind === 'business' ? $oneLine($get('company')) . ' ' : '') . $oneLine($get('name')) . ' 様';

if (!empty($config['dry_run'])) {
    error_log("[contact] dry_run のため送信しません\n" . $subject . "\n" . $text);
    respond(200, ['ok' => true]);
}

mb_language('Japanese');
mb_internal_encoding('UTF-8');
$from = (string) $config['from'];
$headers = implode("\r\n", [
    'From: ' . mb_encode_mimeheader((string) $config['from_name']) . ' <' . $from . '>',
    'Reply-To: ' . $email,
]);
$sent = mb_send_mail((string) $config['to'], $subject, $text, $headers, '-f' . $from);

if (!$sent) {
    error_log('[contact] mb_send_mail に失敗しました');
    respond(502, ['error' => '送信に失敗しました。時間をおいて再度お試しください。']);
}
respond(200, ['ok' => true]);
