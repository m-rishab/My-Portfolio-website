import { animate, createTimeline, spring } from 'animejs';

// Spring used for peppy, Google-feel springy motion
export const springy = spring({ stiffness: 180, damping: 16, mass: 0.6 });

// 3D tilt that follows the cursor. Returns a cleanup function.
// Anime.js 4 animates transforms via its own matrix handling.
export function tilt3d(element, opts = {}) {
  const max = opts.max ?? 8; // max tilt in degrees

  const onPointerMove = (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top) / height;
    const rotateY = (px - 0.5) * 2 * max;
    const rotateX = -(py - 0.5) * 2 * max;
    animate(element, {
      rotateX,
      rotateY,
      duration: 450,
      ease: 'outCubic',
    });
  };

  const onPointerLeave = () => {
    animate(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 600,
      ease: 'outExpo',
    });
  };

  element.addEventListener('pointermove', onPointerMove);
  element.addEventListener('pointerleave', onPointerLeave);

  return () => {
    element.removeEventListener('pointermove', onPointerMove);
    element.removeEventListener('pointerleave', onPointerLeave);
  };
}

// Magnetic hover: the element is gently pulled toward the cursor.
export function magnetic(el, opts = {}) {
  const strength = opts.strength ?? 0.25;

  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    animate(el, {
      x: dx * strength,
      y: dy * strength,
      duration: 500,
      ease: 'outCubic',
    });
  };

  const onLeave = () => {
    animate(el, { x: 0, y: 0, duration: 600, ease: 'outExpo' });
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return () => {
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
  };
}

// Reveal a set of elements with a springy stagger cascade on first enter.
export function revealStagger(elements, opts = {}) {
  if (!elements || elements.length === 0) return () => {};

  const from = opts.from ?? { opacity: 0, translateY: 24, filter: 'blur(6px)' };
  const delay = opts.delay ?? 90;
  const duration = opts.duration ?? 800;
  const easing = opts.easing ?? 'outQuint';
  let started = false;
  let animation = null;

  const onEnter = () => {
    if (started) return;
    started = true;

    animate(elements, {
      ...from,
      opacity: 1,
      translateY: 0,
      filter: 'blur(0px)',
      delay: (el, i) => i * delay,
      duration: (el, i) => duration + Math.min(i * 25, 250),
      ease: easing,
      ...springy,
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) onEnter();
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  elements.forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    if (animation) animation.pause();
  };
}

// Floating idle bob: gentle translateY wobble, looped, offset per element.
export function floatLoop(elements, opts = {}) {
  return animate(elements, {
    translateY: (el, i) => [0, (i % 2 === 0 ? -1 : 1) * (opts.amplitude ?? 8)],
    duration: opts.speed ?? 2800,
    delay: (el, i) => i * 120,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  });
}

// Build a cinematic entrance timeline for the hero.
export function heroTimeline(targets) {
  const tl = createTimeline({ defaults: { ...springy } });

  tl.add(targets.badge, { opacity: [0, 1], translateY: [-14, 0], duration: 500 })
    .add(targets.name, { opacity: [0, 1], translateY: [26, 0], filter: ['blur(8px)', 'blur(0px)'], duration: 700 }, '-=360')
    .add(targets.roles, { opacity: [0, 1], translateY: [18, 0], duration: 500 }, '-=520')
    .add(targets.subtitle, { opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=420')
    .add(targets.cta, { opacity: [0, 1], translateY: [14, 0], duration: 450 }, '-=380')
    .add(targets.socials, { opacity: [0, 1], translateY: [12, 0], duration: 450 }, '-=340')
    .add(targets.card, { opacity: [0, 1], translateY: [24, 0], duration: 600 }, '-=700');

  return tl;
}
