import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { profile } from '../data/portfolio';
import profilePhoto from '../../assets/img/Rishab-new.webp';
import { magnetic } from '../lib/animex';
import { useTheme } from '../context/ThemeContext';

const techKeywords = [
  'AI EVALUATION', 'RAG SYSTEMS', 'GOOGLE SQL', 'DASHBOARDS',
  'PROMPT ENGINEERING', 'GENAI', 'PYTHON', 'BILLION-SCALE QUERIES', 'LLMS', 'DATA PIPELINES',
];

function useISTClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  return time;
}

function TypingRoles() {
  const roles = profile.roles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { reduceMotion } = useTheme();

  useEffect(() => {
    if (reduceMotion) {
      setText(roles[0]);
      return undefined;
    }

    const current = roles[index];
    const isComplete = !deleting && text === current;
    const isCleared = deleting && text === '';
    const delay = isComplete ? 1400 : deleting ? 38 : 70;

    const timeout = setTimeout(() => {
      if (isComplete) { setDeleting(true); return; }
      if (isCleared) { setDeleting(false); setIndex((i) => (i + 1) % roles.length); return; }
      const nextLength = deleting ? text.length - 1 : text.length + 1;
      setText(current.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles, reduceMotion]);

  return (
    <span className="inline-flex items-baseline gap-2 font-mono text-sm sm:text-base text-muted-dark" aria-label={text || roles[index]}>
      <span className="text-[#8fabf6] mr-1">$</span>
      <span>{text}</span>
      {!reduceMotion && <span className="typing-caret inline-block bg-[#8fabf6]" aria-hidden="true" />}
    </span>
  );
}

function MaskedLine({ children, delay = 0, ready, className = '' }) {
  const shouldAnimate = ready;
  return (
    <span className="block overflow-hidden">
      <span
        className={`block ${className} transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] ${
          shouldAnimate ? 'translate-y-0' : 'translate-y-[115%]'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Hero({ ready }) {
  const { reduceMotion } = useTheme();
  const istTime = useISTClock();
  const primaryRef = useRef(null);
  const circularRef = useRef(null);
  const socialsRef = useRef(null);
  const imageChipRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const cleanups = [
      magnetic(primaryRef.current, { strength: 0.22 }),
      magnetic(circularRef.current, { strength: 0.18 }),
    ];
    return () => cleanups.forEach((c) => c?.());
  }, [reduceMotion]);

  const masksReady = ready || reduceMotion;

  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal film-grain aurora-bg"
    >
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-40">
        {/* Giant name */}
        <h1 className="font-display font-extrabold uppercase text-[clamp(2.75rem,9.5vw,8rem)] leading-[0.92] tracking-[-0.035em] text-headline">
          <MaskedLine delay={0} ready={masksReady}>Rishabh</MaskedLine>
          <MaskedLine delay={130} ready={masksReady}>
            <span className="text-outline" style={{ WebkitTextStrokeColor: 'rgba(243,242,238,0.4)' }}>
              Mishra
            </span>
            <span
              ref={imageChipRef}
              className="inline-block align-middle overflow-hidden rounded-2xl border-2 border-white/15 ml-3 sm:ml-5 -translate-y-[0.08em]"
              style={{ width: '0.62em', height: '0.62em' }}
            >
              <img
                src={profilePhoto}
                alt="Rishabh Mishra portrait"
                className="h-full w-full object-cover"
                style={{ objectPosition: '50% 18%' }}
                loading="eager"
              />
            </span>
          </MaskedLine>
        </h1>

        {/* Availability + location / clock row — below the name */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-headline">
              Available for work
            </span>
          </span>
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-dark">
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="tabular-nums text-headline">{istTime} IST</span>
          </span>
        </div>

        {/* Lede + typing row */}
        <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <MaskedLine delay={320} ready={masksReady}>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-dark">
              I analyze <span className="serif-accent text-[1.05em] text-[#8fabf6]">billions</span> of search queries,
              build automated{' '}
              <span className="serif-accent text-[1.05em] text-[#8fabf6]">evaluation</span>{' '}
              systems for AI answers, and turn raw data into insights teams actually trust.
            </p>
          </MaskedLine>
          <MaskedLine delay={420} ready={masksReady}>
            <TypingRoles />
          </MaskedLine>
        </div>

        {/* CTA row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            ref={primaryRef}
            href="#projects"
            className="shine-sweep magnetic-btn group inline-flex items-center gap-2 rounded-full iris-gradient px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#2f5ce8]/25"
          >
            View Case Studies
            <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            ref={circularRef}
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-headline transition-colors hover:border-white/30"
          >
            Get in touch
          </a>
          <div ref={socialsRef} className="ml-1 flex items-center gap-2">
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-muted-dark transition-all hover:border-white/30 hover:text-headline"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-muted-dark transition-all hover:border-white/30 hover:text-headline"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Vertical SCROLL cue */}
      <a
        href="#marquee"
        className="group absolute right-6 sm:right-10 bottom-36 z-10 hidden lg:flex flex-col items-center gap-3"
        aria-label="Scroll to see more"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-dark [writing-mode:vertical-lr] transition-colors group-hover:text-headline">
          Scroll
        </span>
        <span className="h-10 w-px bg-white/15 overflow-hidden relative">
          <span className="absolute top-0 left-0 h-4 w-px bg-[#8fabf6] animate-[scrollcue_2.2s_ease-in-out_infinite]" />
        </span>
        <style>{`@keyframes scrollcue { 0% { transform: translateY(-16px);} 100% { transform: translateY(44px);} }`}</style>
      </a>

      {/* Bottom tech keywords marquee — iris gradient band */}
      <div className="marquee-band absolute bottom-0 inset-x-0 z-10 overflow-hidden select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap w-max marquee-scroll marquee-motion">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {techKeywords.map((k) => (
                <span key={k} className="marquee-band-text inline-flex items-center font-mono text-xs sm:text-sm uppercase tracking-[0.18em] py-3.5 px-6">
                  {k}
                  <span className="ml-12 text-white/40">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}