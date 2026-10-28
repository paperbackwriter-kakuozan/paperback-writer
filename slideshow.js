// HOMEのスライドショー（フェード切替・自動送り）
// .slideshow 内の .slideshow__slide を data-interval ミリ秒ごとに順番に表示する
document.querySelectorAll('.slideshow').forEach((root) => {
  const slides = [...root.querySelectorAll('.slideshow__slide')];
  const cur = root.querySelector('.slideshow__cur');
  const interval = Number(root.dataset.interval) || 5000;
  if (slides.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
    if (cur) cur.textContent = 'N°' + String(i + 1).padStart(2, '0');
  }, interval);
});
