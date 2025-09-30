(() => {
  // Auto-init carousel for .banner-list (home.html)
  const track = document.querySelector('.banner-list');
  if (!track) return; // nothing to do

  // Ensure track behaves like the original expected element
  track.id = track.id || 'track';
  // parent element will act as scroll wrapper
  const wrap = track.parentElement;

  // Create prev/next controls and dots container if missing
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');
  let dotsBox = document.getElementById('dots');

  if (!prev || !next) {
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    prev = document.createElement('button');
    prev.id = 'prev';
    prev.className = 'carousel-btn prev';
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Anterior');
    prev.textContent = '\u25C0';
    next = document.createElement('button');
    next.id = 'next';
    next.className = 'carousel-btn next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Siguiente');
    next.textContent = '\u25B6';
    controls.appendChild(prev);
    controls.appendChild(next);
    // insert controls after the track
    wrap.insertBefore(controls, track.nextSibling);
  }

  if (!dotsBox) {
    dotsBox = document.createElement('div');
    dotsBox.id = 'dots';
    dotsBox.className = 'carousel-dots';
    wrap.insertBefore(dotsBox, wrap.lastElementChild);
  }

  const cards = Array.from(track.children);

  const isMobile = () => matchMedia('(max-width:767px)').matches;

  // build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.onclick = () => activate(i, true);
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  let current = 0;

  function center(i) {
    const card = cards[i];
    if (!card || !wrap) return;
    const axis = isMobile() ? 'top' : 'left';
    const size = isMobile() ? 'clientHeight' : 'clientWidth';
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: 'smooth'
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
  }

  function activate(i, scroll) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  prev.onclick = () => go(-1);
  next.onclick = () => go(1);

  addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) go(1);
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) go(-1);
  }, { passive: true });

  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && activate(i, true));
    card.addEventListener('click', () => activate(i, true));
  });

  let sx = 0, sy = 0;
  track.addEventListener('touchstart', (e) => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
      go((isMobile() ? dy : dx) > 0 ? -1 : 1);
  }, { passive: true });

  if (window.matchMedia('(max-width:767px)').matches) dotsBox.hidden = true;

  addEventListener('resize', () => center(current));

  // init
  toggleUI(0);
  center(0);
})();