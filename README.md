# ぺいぱばっくらいたー — 実装引き継ぎ資料

名古屋・覚王山の本や「ぺいぱばっくらいたー」の公式サイト。
デザインテーマは **パリのブキニスト（セーヌ河岸の古書箱）／カルチェラタン**、色は **青・白・赤** の三色を軸に、ブキニストの緑をフレーム色として使用。装飾はすべてCSSで描画しており、イラストやアイコン画像は使っていません。

---

## 0. 最新の変更点（v3 — 今回）

前回（v2・3ページ版）からの差分です。**まずここを反映してください。**

| # | 変更 |
|---|---|
| 1 | **HOMEにスライドショーを追加**。位置は**店名ブロック（.hero）の下、ナビ（.nav）の上**。HOME（index.html）のみで、books.html / about.html には入れない |
| 2 | スライドは3枚：`photos/slide-1.jpg`（パリの街と本）、`slide-2.jpg`（日本の街と本）、`slide-3.jpg`（本屋の店内と本）。比率は **2200:1000**（`aspect-ratio: 2200/1000`、`object-fit: cover`） |
| 3 | 切替は**フェード（opacity 1.2s ease）で5秒ごとに自動送り**。ドット・矢印などの操作UIは**付けない**（意図的に削除済み）。左下に街路プレート風の枚数表示「N°01 / 03」のみ |
| 4 | 動作は新規ファイル `slideshow.js`（約15行・依存なし）。`index.html` の `<head>` で `defer` 読み込み。`prefers-reduced-motion` 時は自動送りしない |
| 5 | 枠は古書箱フレーム（.crate と同じ緑の二重枠＋蝶番）。CSSは `style.css` 末尾の「スライドショー」ブロック |
| 6 | 写真3枚グリッドはスライドの下にそのまま残す。間隔を `margin-top: 40px` に（`.photogrid--below-slides`） |
| 7 | **カレンダーを2026年11月に差し替え**（`photos/calendar.png`）。比率は前回と同じ 1167:985 |
| 8 | `slide-2.jpg` / `slide-3.jpg` は幅512pxと小さく、大画面ではぼやける。2200px幅の元画像が届いたら同名で上書きするだけで差し替わる |

---

## 0-b. v1 → v2 の変更点（参考）

前回の引き継ぎは1ページ完結でした。今回**3ページ構成に分割**し、内容も移動・変更しています。差分は以下のとおりです。

| # | 変更 |
|---|---|
| 1 | **1ページ完結 → 3ページ構成**。`index.html` / `books.html` / `about.html` の3枚に分割。共通のヘッダー・ナビ・フッターを各ページに複製（SSGなし・素のHTML） |
| 2 | **ナビを新設**。街路プレート風のタブ3枚（HOME / BOOKS / ABOUT US）。英字ラベル＋日本語サブラベルの2段組。現在ページは `.is-active`（緑地・白文字・浮き上がる影）で明示 |
| 3 | **「入口」という名称を廃止し HOME に**。1ページ目のラベルは「HOME / 店舗案内・営業日」 |
| 4 | **「場所」セクションを「店舗案内」に改称し、ABOUT → HOME へ移動**。HOMEは 写真3枚 → 営業スケジュール → 店舗案内 の順 |
| 5 | **本の紹介のレイアウトを全面変更**。旧：1列280pxの縦積みカード（書影104×148px）。新：`minmax(150px,1fr)` の表紙グリッドで、3:4の書影を大きく並べタイトルを下に置く（タバネルブックス参照）。余白が目立つ問題を解消 |
| 6 | **書影の高さ揺れを修正**。`.book__cover` に `overflow:hidden`、`img` を `position:absolute;inset:0;object-fit:cover` に。`aspect-ratio` は上限ではないため、これを付けないと画像の固有比で枠が伸び、行内で高さがバラつく |
| 7 | **カレンダー画像を実データに差し替え**。`photos/calendar.png`（2026年9月）。下余白をトリミング済みで、枠は `aspect-ratio:1167/985` と実寸に一致。**毎月この1ファイルを差し替える運用**（比率が変わる場合は `.crate--calendar` の `aspect-ratio` も合わせる） |
| 8 | **住所を正式表記に修正**。旧「名古屋市 覚王山／覚王山西交差点／キリン堂ビル2階」→ **愛知県名古屋市千種区覚王山通9-8-2 キリン堂ビル201** |
| 9 | **地図をGoogleマップの埋め込みに変更**。旧：画像プレースホルダー。新：`<iframe src="https://maps.google.com/maps?q=…&z=17&output=embed">`。「地図で見る」ボタンのリンク先も上記の正式住所に修正 |
| 10 | **ほんまるの1行リンクを BOOKS ページへ移動**（ページ下部、点線区切りの控えめな扱いは維持） |
| 11 | **写真のファイル名と中身の不一致を修正**。`photos/books-room.jpg` が実際には**入口の木看板**、`photos/entrance.jpg` が**本の間**の写真です。ファイル名は直さず `src` と `alt` を入れ替えて対処済み。ファイル名をリネームする場合は3ページ分の `src` を合わせて直してください |
| 12 | `--sp-section` を 86px → **70px** に圧縮（ページ分割で1ページの情報量が減ったため） |

---

## 1. ファイル構成

```
index.html          HOME（写真3枚／営業スケジュール／店舗案内）
books.html          BOOKS（本の紹介／ほんまるへのリンク）
about.html          ABOUT US（お店のこと／お問い合わせ）
style.css           全スタイル（CSS変数でトークン管理・インラインCSSなし）
slideshow.js        HOMEのスライドショー（フェード・5秒自動送り）
photos/
  entrance.jpg      新本・古本・雑貨の間 ※名前と中身が逆（上記#11）
  books-room.jpg    店の入口の看板     ※名前と中身が逆（上記#11）
  kamishibai.jpg    かみしばいの間
  calendar.png      2026年11月の営業カレンダー（毎月差し替え）
  slide-1.jpg       スライド1：パリの街と本のコラージュ（2200×1000）
  slide-2.jpg       スライド2：日本の街と本のコラージュ（512×217・要高解像度版）
  slide-3.jpg       スライド3：本屋の店内と本のコラージュ（512×217・要高解像度版）
books/
  boxer.webp        書影：ボクサー : イランの絵本
  yamiisha.webp     書影：闇医者おえん秘録帖
  shinkansen.webp   書影：新幹線から見えたすき家へカレーを食べに行く
```

未入稿は書影4点（鈍獣／ジョン・バーリコーン／ねこのセーター／仮面紳士）。`.book__cover--empty` の空枠で場所を確保しているので、画像が届いたら枠の中に `<img src="…" alt="…">` を1行足すだけで入ります（番号タグ `.book__num` はそのまま）。

---

## 2. フォント

Google Fonts から5書体。各ページの `<head>` に同じ `<link>`。

| 用途 | フォント | ウェイト | CSS変数 |
|---|---|---|---|
| 店名（h1） | Klee One | 600 | `--f-hand` |
| セクション見出し・営業時間・CTA・フッター | Yusei Magic | 400 | `--f-display` |
| 本文・プレート・ナビ | Zen Maru Gothic | 400 / 500 / 700 | `--f-body` |
| 本の番号タグ | Yomogi | 400 | `--f-tag` |
| 欧文（ナビ英字・チケットスタンプ） | EB Garamond | 400 / italic | `--f-latin` |

**太字について:** Yusei Magic と Klee One に太字ウェイトが無いため、力強さは `-webkit-text-stroke` で出しています（h1・h2 = 1.4px、paperback writer = 0.8px）。Chrome/Safari前提。Firefoxでは効かないので、必要なら `text-shadow` でフォールバックしてください。

**ファイルサイズ注意:** 日本語フォントは全字セットだと非常に重い（オフライン版が20MB超になりました）。本番では Google Fonts URL に `&text=` で使用文字のみを指定するか、サブセット済みフォントをセルフホストしてください。

---

## 3. カラーコード

| 役割 | HEX | CSS変数 |
|---|---|---|
| 主色（見出し・リンク） | `#16418f` | `--c-blue` |
| 副色（アクセント・CTA） | `#d7332b` | `--c-red` |
| ブキニストの緑（フレーム・装飾・ナビ） | `#1f4d3d` | `--c-green` |
| 街路プレートの緑（ナビ選択時） | `#12362b` | `--c-green-dark` |
| 背景（紙色） | `#fbf6ec` | `--c-paper` |
| カード背景 | `#fdfaf4` | `--c-card` |
| 本文 | `#1c1a17` | `--c-ink` |
| 補足テキスト | `#5a554c` | `--c-ink-soft` |
| コピーライト等 | `#8a8478` | `--c-ink-faint` |
| 点線罫 | `#c8bfa8` | `--c-line` |
| 書影の枠線 | `#d8d1bf` | `--c-cover-edge` |

リンク: 既定 `#16418f` / hover `#d7332b`。

---

## 4. 余白・サイズ

| 項目 | 値 | CSS変数 |
|---|---|---|
| コンテンツ最大幅 | 960px | `--page-max` |
| 左右パディング | 20px | `--page-pad` |
| セクション間 | 70px | `--sp-section` |
| セクション内ブロック間 | 30px | `--sp-block` |
| 2カラムの間隔 | 26px | `--sp-gap` |

**主要サイズ**

- 写真グリッド: `repeat(auto-fit, minmax(220px,1fr))` / gap 12px / 高さ280px
- 2カラム（カレンダー・店舗案内）: `repeat(auto-fit, minmax(260px,1fr))`
- 本グリッド: `repeat(auto-fill, minmax(150px,1fr))` / gap 28px 20px
- 書影: `aspect-ratio: 3/4`（`overflow:hidden` + absolute img で厳密固定）
- カレンダー枠: `aspect-ratio: 1167/985`（画像実寸）／`object-fit: contain`
- 地図枠: `aspect-ratio: 4/3`
- 丸スタンプ: LIBRAIRIE 76px / KAMISHIBAI 66px
- ナビタブ: padding 11px 18px、`rotate(-1deg)`、英字19px／日本語10.5px
- ボタン: padding 16px 24px、`border-radius: 999px`

**流動タイポグラフィ（clamp）**

- h1（店名）`clamp(28px, 6.4vw, 80px)` / h2 `clamp(26px, 4vw, 40px)`
- paperback writer `clamp(16px, 2.4vw, 24px)`
- 紹介文 `clamp(16px, 1.9vw, 19px)`（`line-height: 2.1`）
- 営業時間 `clamp(24px, 3.6vw, 34px)` / 住所 `clamp(20px, 2.8vw, 27px)`

---

## 5. CSSで描いている装飾

| クラス | 内容 |
|---|---|
| `.awning` | 最上部のカフェ天幕ストライプ＋スカラップ |
| `.tricolore` | 青・白・赤の三色ライン |
| `.tiles` | ビストロの市松タイル帯（`repeating-conic-gradient`） |
| `.spines` | 本の背表紙が並ぶストライプ帯（BOOKSページ下部） |
| `.plate` | パリの街路プレート（緑地・白フチ・二重shadow）。ヘッダー「RUE DU KAKUOZAN」と店舗案内「KAKUOZAN NISHI」 |
| `.navtab` | 同じプレート意匠のナビタブ |
| `.stamp--dashed` | 店名横の破線丸スタンプ「LIBRAIRIE」 |
| `.stamp--ticket` | BOOKSのチケット風黒丸スタンプ「KAMISHIBAI」（上下にスプロケット穴） |
| `.crate` | 古書箱フレーム（緑の二重枠＋蝶番 `.crate__hinge` ＋箱番号タグ `.crate__tag`） |
| `.section__dash` / `.section__fleur` | 見出し横の点線罫＋フルール・ド・リス（`⚜` U+269C のテキスト。フォント依存） |
| `.contact` | 切手の裏のような斜めハッチ背景 |
| `.book__num` | 吊り下げ札風の番号タグ |
| `body` の背景 | 紙の目のような極薄横罫 |

---

## 6. 各ページの構成（上から順）

### 共通（3ページとも）
天幕ストライプ → トリコロール → ヘッダー（NAGOYA · KAKUOZAN ＋ RUE DU KAKUOZAN プレート／h1 店名＋LIBRAIRIEスタンプ／paperback writer＋タグライン） → ナビ3タブ → 市松タイル帯 →〈各ページ本文〉→ 緑の帯 → フッター（緑プレートの店名／コピーライト）

### index.html（HOME）
0. **スライドショー**（店名の下・ナビの上。HOMEのみ）
1. 古書箱フレームの写真3枚（入口の看板 / 本の間 / かみしばいの間）
2. 営業スケジュール — カレンダー画像 ＋ OPEN 金土日月 11:00–16:00 / CLOSED 火水木 / 現金のみの注記
3. 店舗案内 — 住所／KAKUOZAN NISHI プレート／道案内／「地図で見る」ボタン／Googleマップ埋め込み

### books.html（BOOKS）
1. 本の紹介 — KAMISHIBAI スタンプ／リード文／表紙グリッド7点＋「棚の本はお店で。」の赤タイル
2. 背表紙ストライプ帯
3. ほんまるへの1行リンク（点線区切り、支店的な控えめな扱い）

### about.html（ABOUT US）
1. お店のこと — 店主の紹介文（**原文どおり。書き換えないでください**）
2. お問い合わせ — Instagram / 公式LINE

---

## 7. 実装上の注意

- **本の紹介にリンクは張らない。** 以前は「ほんまる」の書籍ページへ飛んでいましたが、飛ばさない仕様です。`<li class="book">` は非インタラクティブ。
- 外部リンクは4つのみ: Googleマップ検索、ほんまるの棚（`/jinbocho/shelf/419`）、Instagram（`@honya.paperbackwriter`）、公式LINE（`https://lin.ee/8o9iqLu`）。すべて `target="_blank" rel="noopener"`。
- `lin.ee` の短縮リンクは環境によりPCブラウザから直接開けないことがあります（LINEアプリ内遷移を前提とした挙動）。実機で確認してください。
- **Googleマップ埋め込みはネット接続が必要。** オフライン配布版では表示されません。オフライン版を作るなら地図はスクリーンショット画像＋リンクに差し替えてください。
- レイアウトは `auto-fit`/`auto-fill` グリッドと flex `gap` のみ。固定幅はスタンプ・タグだけなので、狭い画面でも1カラムに落ちます。
- ナビは素の `<a href>` によるページ遷移です。SPAにする場合は `.is-active` の付与ロジックだけ移植すれば見た目は保てます。
