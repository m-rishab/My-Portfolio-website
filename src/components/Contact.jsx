import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Check, Copy } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { magnetic } from '../lib/animex';
import { SplitText } from './ui';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const orbWrapRef = useRef(null);
  const orbRef = useRef(null);
  const { reduceMotion, showToast } = useTheme();

  useEffect(() => {
    if (reduceMotion) return undefined;
    return magnetic(orbWrapRef.current, { strength: 0.3 });
  }, [reduceMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      showToast('Email copied to clipboard');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      showToast('Could not copy — use your email client');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal aurora-bg film-grain py-24 sm:py-32 md:py-40">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs text-[#8fabf6]">04</span>
          <span className="section-tag text-muted-dark">Contact</span>
          <span className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
        </div>

        <h2 className="heading-skew heading-dark font-display font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.75rem,9vw,8rem)] text-headline">
          <SplitText text="Let's build something" accent="something" />
        </h2>

        <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* email + socials */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-dark mb-3">
              The fastest way to reach me
            </p>
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex items-center gap-3 font-mono text-[clamp(1.05rem,3.4vw,1.75rem)] text-headline underline decoration-[rgba(139,171,246,0.5)] decoration-2 underline-offset-8 transition-colors hover:decoration-[#8fabf6]"
            >
              {copied ? "copied ✓" : "say hello"}
              <span className="text-sm font-sans text-muted-dark">@</span>
            </button>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-muted-dark transition-all hover:border-white/30 hover:text-headline"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-muted-dark transition-all hover:border-white/30 hover:text-headline"
              >
                <Github size={17} />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-muted-dark transition-all hover:border-white/30 hover:text-headline"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          {/* Rotating circular button */}
          <div ref={orbWrapRef} className="magnetic-btn self-center lg:ml-auto">
            <button
              ref={orbRef}
              type="button"
              onClick={() => (window.location.href = `mailto:${profile.email}`)}
              aria-label="Say hello"
              className="orb-btn group relative mx-auto grid h-36 w-36 place-items-center rounded-full transition-all duration-300"
            >
              <svg viewBox="0 0 100 100" className="rotate-text absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <path id="circ-path" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="orb-text fill-current font-mono text-[8.2px] tracking-[0.3em] text-headline group-hover:text-white">
                  <textPath href="#circ-path">OPEN TO WORK · SAY HELLO ·</textPath>
                </text>
              </svg>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full iris-gradient text-white shadow-lg shadow-[#2f5ce8]/30 transition-transform duration-300 group-hover:scale-110">
                <Copy size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Giant reverse outline marquee */}
      <div className="marquee-skew relative z-10 mt-20 overflow-hidden select-none border-t border-white/10 pt-8" aria-hidden="true">
        <div className="flex whitespace-nowrap w-max marquee-scroll" style={{ animationDirection: 'reverse' }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center font-display font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl tracking-[-0.03em]">
                  <span className="px-6 text-transparent" style={{ WebkitTextStroke: '1.5px rgba(243,242,238,0.25)' }}>
                    Let's work together
                  </span>
                  <span className="text-2xl sm:text-4xl iris-gradient-text">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}