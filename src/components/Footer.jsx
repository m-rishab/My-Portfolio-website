import { useEffect, useState } from 'react';
import { ArrowUp, Command } from 'lucide-react';
import { profile } from '../data/portfolio';
import { openPalette } from '../lib/palette';
import { TextRoll } from './ui';

export default function Footer() {
  const year = new Date().getFullYear();
  const [istTime, setIstTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setIstTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(istTime);

  return (
    <footer className="relative bg-charcoal border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:px-6 sm:flex-row">
        <p className="font-mono text-[11px] text-muted-dark">
          © {year} {profile.name}. Built in React — design by Paper &amp; Iris.
        </p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openPalette}
            className="group hidden sm:inline-flex items-center gap-2 font-mono text-[11px] text-muted-dark transition-colors hover:text-headline"
          >
            <Command size={12} style={{ color: '#8fabf6' }} />
            <TextRoll label="Try ⌘K anywhere" accent="#8fabf6" />
          </button>
          <span className="hidden sm:inline-block h-3 w-px bg-white/10" />
          <span className="font-mono text-[11px] tabular-nums text-headline" title="Live IST time">
            {time} <span className="text-muted-dark">IST</span>
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-white/10" />
          <a
            href="#about"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dark transition-colors hover:text-headline"
            aria-label="Back to top"
          >
            <TextRoll label="Top" accent="#8fabf6" />
            <ArrowUp size={13} style={{ color: '#8fabf6' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}