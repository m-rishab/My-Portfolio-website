import Lenis from 'lenis';

let lenis = null;
let reduceMotion = false;
let rafId = null;
let destroyed = false;

export const scrollState = {
  velocity: 0,
  skew: 0,
  skewMarquee: 0,
};

function applySkew() {
  document.documentElement.style.setProperty('--skew', `${scrollState.skew.toFixed(3)}deg`);
  document.documentElement.style.setProperty('--skew-m', `${scrollState.skewMarquee.toFixed(3)}deg`);
}

function loop(time) {
  if (destroyed) return;
  if (lenis) {
    lenis.raf(time);
    const target = Math.max(-3, Math.min(3, lenis.velocity * 0.5));
    scrollState.skew += (target - scrollState.skew) * 0.09;
    const mTarget = Math.max(-9, Math.min(9, lenis.velocity * 1.3));
    scrollState.skewMarquee += (mTarget - scrollState.skewMarquee) * 0.09;
    applySkew();
  }
  rafId = requestAnimationFrame(loop);
}

function scrollToHash(targetId, offset = -80) {
  const el = document.getElementById(targetId);
  if (!el) return;
  if (lenis && !reduceMotion) {
    lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
}

function onClickCapture(e) {
  if (reduceMotion) return;
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  if (anchor.closest('[data-menu-overlay]')) return;
  const id = anchor.getAttribute('href').slice(1);
  if (!id) return;
  const isOnlyHash = anchor.getAttribute('href') === '#';
  if (isOnlyHash) {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
    return;
  }
  if (!document.getElementById(id)) return;
  e.preventDefault();
  window.history.replaceState(null, '', `#${id}`);
  scrollToHash(id, id === 'about' ? 0 : -80);
}

export function initSmoothScroll({ reduced = false } = {}) {
  reduceMotion = reduced;
  destroyed = false;

  if (reduced) {
    scrollState.skew = 0;
    scrollState.skewMarquee = 0;
    applySkew();
    return;
  }

  if (!lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  }
  rafId = requestAnimationFrame(loop);
  document.addEventListener('click', onClickCapture, true);
}

export function destroySmoothScroll() {
  destroyed = true;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  document.removeEventListener('click', onClickCapture, true);
  scrollState.skew = 0;
  scrollState.skewMarquee = 0;
  applySkew();
}

export function scrollToId(targetId, offset = -80) {
  scrollToHash(targetId, offset);
}

export function stopSmoothScroll() {
  if (lenis) lenis.stop();
}

export function startSmoothScroll() {
  if (lenis) lenis.start();
}