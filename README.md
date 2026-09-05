# ぺいぱばっくらいたー — 実装引き継ぎ資料

名古屋・覚王山の本や「ぺいぱばっくらいたー」の公式サイト（1ページ完結）。
デザインテーマは **パリのブキニスト（セーヌ河岸の古書箱）／カルチェラタン**、色は **青・白・赤** の三色を軸に、ブキニストの緑をフレーム色として使用。

---

## 1. ファイル構成

```
index.html          セマンティックなHTML（インラインCSSなし）
style.css           全スタイル（CSS変数でトークン管理）
photos/
  entrance.jpg      店の入口の看板（手描きの木看板＋カエル＋赤いP）
  books-room.jpg    新本・古本・雑貨の間（本棚が並ぶ畳の部屋）
  kamishibai.jpg    かみしばいの間（畳＋テント＋絵本）
  calendar.png      ★未入稿：今月の営業カレンダー（毎月差し替える）
  map.png           ★未入稿：お店周辺の地図または目印の写真
books/
  boxer.webp        書影：ボクサー : イランの絵本
  yamiisha.webp     書影：闇医者おえん秘録帖
  shinkansen.webp   書影：新幹線から見えたすき家へカレーを食べに行く
```

★のファイルは未入稿。`index.html` 内の `<img>` は既に参照済みなので、画像を置けば表示される。

---

## 2. フォント

Google Fonts から5書体を読み込み（`index.html` の `<link>`）。

| 用途 | フォント | ウェイト | CSS変数 |
|---|---|---|---|
| 店名（h1） | Klee One | 600 | `--f-hand` |
| セクション見出し・営業時間・CTA | Yusei Magic | 400 | `--f-display` |
| 本文・プレート・タグ | Zen Maru Gothic | 400 / 500 / 700 | `--f-body` |
| 本の番号タグ | Yomogi | 400 | `--f-tag` |
| 欧文スタンプ（italic） | EB Garamond | 400 italic | `--f-latin` |

**注意:** Yusei Magic と Klee One は太字ウェイトを持たないため、力強さは `-webkit-text-stroke: 1.4px`（h1・h2）と `0.8px`（paperback writer）で出している。Safari/Chrome前提。Firefoxでは効かないので、必要なら `text-shadow` によるフォールバックを検討。

**ファイルサイズ注意:** 日本語フォントは全字セットだと非常に重い。本番では Google Fonts URL に `&text=` パラメータで使用文字のみを指定することを推奨（元の実装ではそうしていた）。

---

## 3. カラーコード

| 役割 | HEX | CSS変数 |
|---|---|---|
| 主色（見出し・リンク） | `#16418f` | `--c-blue` |
| 副色（アクセント・CTA） | `#d7332b` | `--c-red` |
| ブキニストの緑（フレーム・装飾） | `#1f4d3d` | `--c-green` |
| 街路プレートの緑 | `#12362b` | `--c-green-dark` |
| 背景（紙色） | `#fbf6ec` | `--c-paper` |
| カード背景 | `#fdfaf4` | `--c-card` |
| 本文 | `#1c1a17` | `--c-ink` |
| 補足テキスト | `#5a554c` | `--c-ink-soft` |
| コピーライト等 | `#8a8478` | `--c-ink-faint` |
| 点線罫 | `#c8bfa8` | `--c-line` |
| 書影の枠線 | `#d8d1bf` | `--c-cover-edge` |
| 白 | `#ffffff` | `--c-white` |

リンク: 既定 `#16418f` / hover `#d7332b`。

---

## 4. 余白・サイズ

| 項目 | 値 | CSS変数 |
|---|---|---|
| コンテンツ最大幅 | 960px | `--page-max` |
| 左右パディング | 20px | `--page-pad` |
| セクション間の余白 | 86px | `--sp-section` |
| セクション内ブロック間 | 30px | `--sp-block` |
| 2カラムの間隔 | 26px | `--sp-gap` |
| 下部パディング | 90px | — |

**主要サイズ**

- 写真グリッド: `repeat(auto-fit, minmax(220px, 1fr))` / gap 12px / 各カード高さ 280px
- 2カラム: `repeat(auto-fit, minmax(260px, 1fr))`
- 本カードグリッド: `repeat(auto-fit, minmax(280px, 1fr))` / gap 2px（緑地を罫線として見せる）
- 本カード padding: 26px 22px / 内部 gap 12px
- 書影: 104 × 148px（`object-fit: cover`）
- カレンダー枠: `aspect-ratio: 1/1`（`object-fit: contain`）
- 地図枠: `aspect-ratio: 4/3`
- 丸スタンプ: LIBRAIRIE 76px / KAMISHIBAI 66px
- ボタン: padding 16px 24px、`border-radius: 999px`

**流動タイポグラフィ（clamp）**

- h1（店名）: `clamp(28px, 6.4vw, 80px)`
- h2（見出し）: `clamp(26px, 4vw, 40px)`
- paperback writer: `clamp(16px, 2.4vw, 24px)`
- 紹介文: `clamp(16px, 1.9vw, 19px)`、`line-height: 2.1`
- 営業時間: `clamp(24px, 3.6vw, 34px)`
- 住所: `clamp(20px, 2.8vw, 27px)`

---

## 5. 画像・装飾の用途

**写真（実写・3枚 + 未入稿2枚）**

| ファイル | 用途 |
|---|---|
| `photos/entrance.jpg` | メインビジュアル1枚目。店の入口の看板 |
| `photos/books-room.jpg` | メインビジュアル2枚目。新本・古本・雑貨の間 |
| `photos/kamishibai.jpg` | メインビジュアル3枚目。かみしばいの間 |
| `photos/calendar.png` | 営業スケジュールの月間カレンダー（毎月差し替え運用） |
| `photos/map.png` | 場所セクションの地図・目印 |

**書影（4冊は未入手）**

`books/boxer.webp` `books/yamiisha.webp` `books/shinkansen.webp` の3点のみ実画像。鈍獣・ジョン・バーリコーン・ねこのセーター・仮面紳士は `.book__cover--empty` の空枠（104×148px）で場所を確保している。画像が用意できたら `<div class="book__cover book__cover--empty">` を `<img class="book__cover" src="…" alt="…">` に置き換える。

**アイコン・イラストは使用していない。装飾はすべてCSSで描画。**

| クラス | 内容 |
|---|---|
| `.awning` | ページ最上部のカフェ天幕ストライプ＋スカラップ（`repeating-linear-gradient` + `repeating-radial-gradient`） |
| `.tricolore` | 青・白・赤の三色ライン（flexで3分割） |
| `.tiles` | ビストロの市松タイル帯（`repeating-conic-gradient`） |
| `.spines` | 本の背表紙が並ぶストライプ帯 |
| `.plate` | パリの街路プレート（緑地・白フチ・二重shadow）× 3箇所 |
| `.stamp--dashed` | 破線の丸スタンプ「LIBRAIRIE」 |
| `.stamp--ticket` | チケット風の黒丸スタンプ「KAMISHIBAI」（上下にスプロケット穴） |
| `.crate` | 古書箱フレーム（緑の二重枠 + 上辺の蝶番 `.crate__hinge` + 箱番号タグ `.crate__tag`） |
| `.section__dash` + `.section__fleur` | 見出し横の点線罫 + フルール・ド・リス（`⚜` テキスト） |
| `.contact` | 切手の裏のような斜めハッチ背景 |
| `.book__num::before` | 吊り下げ札風の番号タグの穴 |

唯一の絵文字的グリフは `⚜`（U+269C, FLEUR-DE-LIS）。テキストとして出力しているのでフォント依存。

---

## 6. ページ構成（上から順）

1. **装飾帯** — カフェ天幕ストライプ＋スカラップ
2. **装飾帯** — トリコロールライン
3. **ヘッダー**（`<header class="hero">`）
   - アイブロウ「NAGOYA · KAKUOZAN」＋街路プレート「RUE DU KAKUOZAN」
   - h1 店名「ぺいぱばっくらいたー」＋丸スタンプ「LIBRAIRIE」
   - 「paperback writer」／タグライン「新本・古本・雑貨と、かみしばいの部屋」
4. **装飾帯** — ビストロタイル
5. **メインビジュアル** — 古書箱フレームの写真3枚（入口 / 本の間 / かみしばいの間）
6. **お店のこと** — 紹介文（店主の文章を原文どおり掲載）
7. **営業スケジュール** — カレンダー画像 ＋ OPEN 金・土・日・月 11:00–16:00 / CLOSED 火・水・木 / 現金のみの注記
8. **本のこと** — 街路プレート「LIBRAIRIE」＋チケットスタンプ「KAMISHIBAI」／本カード7点（**リンクなし・クリック不可**）＋「棚の本はお店で。」の赤いCTAタイル
9. **装飾帯** — 本の背表紙ストライプ
10. **場所** — 住所（覚王山西交差点 キリン堂ビル2階）／街路プレート「KAKUOZAN NISHI」／Googleマップへのリンク／地図画像
11. **ほんまる** — 神保町「ほんまる」への控えめな1行リンク（点線区切り、支店的な扱い）
12. **お問い合わせ** — Instagram（@honya.paperbackwriter）／公式LINE（`https://lin.ee/8o9iqLu`）
13. **フッター** — 緑プレートの店名 ／ © paperback writer / 名古屋 覚王山

**ナビゲーションは無し**（1ページ完結、スクロールのみ）。

---

## 7. 実装上の注意

- **本の紹介はリンクを張らない。** 以前は「ほんまる」の書籍ページへ飛んでいたが、飛ばさない仕様に変更済み。`<li class="book">` は非インタラクティブ。
- 外部リンクは3つのみ: Googleマップ検索、ほんまるの棚（`/jinbocho/shelf/419`）、Instagram、公式LINE。すべて `target="_blank" rel="noopener"`。
- `lin.ee` の短縮リンクは環境によりブラウザから直接開けない場合がある（LINEアプリ内遷移を前提としているため）。実機での動作確認を推奨。
- 全レイアウトは `auto-fit` グリッドと flex `gap` で組んでおり、固定幅は書影・スタンプ・タグのみ。狭い画面でも1カラムに落ちる。
- カレンダー画像は毎月差し替える運用。`photos/calendar.png` を上書きするだけで済むようにしている。
