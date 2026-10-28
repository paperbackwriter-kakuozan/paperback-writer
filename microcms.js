// microCMS連携：おすすめ本（books.html）・営業カレンダー画像（index.html）の動的取得
// 読み取り専用（GET）のAPIキーのみ使用。該当要素が無いページでは何もしない。
const MICROCMS_DOMAIN = 'paperbackwriter.microcms.io';
const MICROCMS_API_KEY = 'r2lOtu74fmKa7v9jJ7xWUcu37Jt2ytt5SvJM';

async function microcmsGet(path) {
  const res = await fetch(`https://${MICROCMS_DOMAIN}/api/v1/${path}`, {
    headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY },
  });
  if (!res.ok) throw new Error(`microCMS ${path}: HTTP ${res.status}`);
  return res.json();
}

async function renderBooks() {
  const list = document.querySelector('.books');
  if (!list) return;
  const cta = list.querySelector('.book--cta');
  try {
    const { contents } = await microcmsGet('books?limit=20');
    contents.forEach((book, i) => {
      const li = document.createElement('li');
      li.className = 'book';

      const cover = document.createElement('div');
      cover.className = 'book__cover';

      const imageUrl = book.image?.url;
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = book.title ?? '';
        cover.appendChild(img);
      } else {
        cover.classList.add('book__cover--empty');
      }

      const num = document.createElement('span');
      num.className = 'book__num';
      num.textContent = String(i + 1).padStart(2, '0');
      cover.appendChild(num);

      const title = document.createElement('h3');
      title.className = 'book__title';
      title.textContent = book.title ?? '';

      const desc = document.createElement('p');
      desc.className = 'book__desc';
      desc.textContent = book.description ?? '';

      li.append(cover, title, desc);
      list.insertBefore(li, cta);
    });
  } catch (err) {
    console.error('おすすめ本の取得に失敗しました', err);
  }
}

async function renderCalendar() {
  const img = document.querySelector('.crate--calendar img');
  if (!img) return;
  try {
    const data = await microcmsGet('calendar');
    const url = Array.isArray(data.contents) ? data.contents[0]?.image?.url : data.image?.url;
    if (url) img.src = url;
  } catch (err) {
    console.error('営業カレンダーの取得に失敗しました', err);
  }
}

renderBooks();
renderCalendar();
