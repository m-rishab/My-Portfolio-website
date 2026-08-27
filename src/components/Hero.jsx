import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { profile, education } from '../data/portfolio';
import profilePhoto from '../../assets/img/Rishab-new.webp';
import CopyEmailButton from './CopyEmailButton';
import { heroTimeline, tilt3d, magnetic } from '../lib/animex';

const roleColorClasses = ['hero-role-yellow', 'hero-role-green', 'hero-role-blue'];

function TypingRoles() {
  const roles = profile.roles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setText(roles[0]);
      return undefined;
    }

    const current = roles[index];
    const isComplete = !deleting && text === current;
    const isCleared = deleting && text === '';
    const delay = isComplete ? 1350 : deleting ? 38 : 70;

    const timeout = setTimeout(() => {
      if (isComplete) {
        setDeleting(true);
        return;
      }

      if (isCleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
        return;
      }

      const nextLength = deleting ? text.length - 1 : text.length + 1;
      setText(current.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles, shouldReduceMotion]);

  return (
    <span
      className={`hero-role-text inline-flex min-w-[15ch] items-center font-display font-semibold ${roleColorClasses[index % roleColorClasses.length]}`}
      aria-label={text || roles[index]}
    >
      {text}
      {!shouldReduceMotion && <span className="ml-0.5 typing-caret" aria-hidden="true" />}
    </span>
  );
}

export default function Hero() {
  const socials = [
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: profile.social.github, label: 'GitHub' },
  ];

  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const rolesRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return undefined;
    const cleanup = tilt3d(cardInnerRef.current, { max: 7 });
    const cleanupMag = magnetic(badgeRef.current, { strength: 0.2 });

    const tl = heroTimeline({
      badge: badgeRef.current,
      name: nameRef.current,
      roles: rolesRef.current,
      subtitle: subtitleRef.current,
      cta: ctaRef.current,
      socials: socialsRef.current,
      card: cardRef.current,
    });

    return () => {
      cleanup();
      cleanupMag();
      tl.pause();
    };
  }, [shouldReduce]);

  return (
    <section id="about" className="relative flex items-center pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(37,99,235,0.06),transparent_34%),linear-gradient(315deg,rgba(21,128,61,0.05),transparent_30%),linear-gradient(25deg,rgba(220,38,38,0.04),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 grid-pulse" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(37,99,235,0.04),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-5 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-14 items-center">
          <div>
            <p
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs sm:text-sm text-primary mb-4 sm:mb-5"
            >
              <Sparkles size={15} />
              AI Engineer · Google Search Evaluation
            </p>

            <h1
              ref={nameRef}
              className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5"
            >
              {profile.name}
            </h1>

            <div
              ref={rolesRef}
              className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-4 sm:mb-5 min-h-8 sm:min-h-9"
            >
              <TypingRoles />
            </div>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
            >
              I analyze billions of search queries to build automated evaluation systems for large language models at Google scale.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8"
            >
              <a
                href="#projects"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-primary hover:bg-primary-light active:scale-[0.98] text-sm sm:text-base text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
              >
                View Projects
              </a>
            </div>

            <div
              ref={socialsRef}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 sm:p-3 rounded-lg glass text-gray-500 hover:text-gray-900 hover:border-accent-blue/50 transition-all hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
              <div className="inline-flex items-center gap-2 rounded-xl glass px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 min-w-0">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors min-w-0">
                  <Mail size={16} className="text-accent shrink-0" />
                  <span className="font-medium text-gray-800 truncate">{profile.email}</span>
                </a>
                <CopyEmailButton />
              </div>
            </div>
          </div>

          <div
            ref={cardRef}
            className="glass rounded-2xl p-5 sm:p-6 md:p-7"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-900 uppercase tracking-widest mb-1">About me</p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Nice to meet you</h2>
              </div>
              <div
                ref={cardInnerRef}
                className="relative shrink-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.span
                  className="pointer-events-none absolute inset-[-6px] rounded-[20px] border border-accent-blue/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.span
                  className="pointer-events-none absolute inset-[-12px] rounded-[24px] border border-accent-green/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 rounded-2xl bg-accent-blue/20 blur-xl" />
                <img
                  src={profilePhoto}
                  fetchpriority="high"
                  alt="Rishabh Mishra, AI Engineer at Google specializing in search evaluation and automated LLM testing"
                  className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-2xl border border-accent-blue/25 bg-surface object-cover shadow-2xl shadow-gray-300/60 neon-pulse"
                  style={{ objectPosition: '50% 15%' }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface-raised/50 p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-900">Education</span>
              </div>
              <p className="text-gray-900 text-xs sm:text-sm font-medium leading-snug">{education.degree}</p>
              <p className="text-accent text-[11px] sm:text-xs mt-0.5">{education.school}</p>
              <p className="text-gray-900 text-[11px] sm:text-xs mt-0.5">{education.period} · GPA: {education.gpa}</p>
            </div>
          </div>
        </div>

        <a
          href="#experience"
          className="absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-500 hover:text-accent-light transition-colors"
          aria-label="Scroll to experience"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
