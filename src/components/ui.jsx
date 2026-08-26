import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

/* ─── Easing ─────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

/* ─── Base fade-up (existing) ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease },
  }),
};

/* ─── Slide from left ────────────────────────────────────────── */
const slideLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease },
  }),
};

/* ─── Slide from right ───────────────────────────────────────── */
const slideRight = {
  hidden: { opacity: 0, x: 56 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease },
  }),
};

/* ─── Scale in ───────────────────────────────────────────────── */
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease },
  }),
};

/* ─── Stagger children ───────────────────────────────────────── */
const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease },
  },
};

/* ─── AnimatedSection ────────────────────────────────────────── */
export function AnimatedSection({ children, className = '', id, delay = 0, variant = 'fadeUp' }) {
  const variants = { fadeUp, slideLeft, slideRight, scaleIn };
  const chosen = variants[variant] || fadeUp;

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={chosen}
      custom={delay}
    >
      {children}
    </motion.section>
  );
}

/* ─── StaggerContainer ───────────────────────────────────────── */
export function StaggerContainer({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerVariants}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ────────────────────────────────────────────── */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
    >
      {children}
    </motion.div>
  );
}

/* ─── ParallaxBox ────────────────────────────────────────────── */
export function ParallaxBox({ children, className = '', speed = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [60 * speed * 10, -60 * speed * 10]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── RevealText (letter-by-letter) ─────────────────────────── */
export function RevealText({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.5, delay: delay + i * 0.06, ease },
            },
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── GlowCard — hover glow effect on cards ─────────────────── */
export function GlowCard({ children, className = '', color = '#2563eb' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.25, ease }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(400px circle at 50% 50%, ${color}18, transparent 70%)` }}
        whileHover={{ opacity: 1 }}
      />
      {children}
    </motion.div>
  );
}

/* ─── SectionHeading (enhanced) ─────────────────────────────── */
export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3"
        >
          <motion.span
            className="inline-block h-px w-5 sm:w-6 bg-accent-light"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            style={{ transformOrigin: 'left' }}
          />
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="section-reveal-line mt-4 sm:mt-6 h-1 w-16 rounded-full"
      />
    </div>
  );
}
