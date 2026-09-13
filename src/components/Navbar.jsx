import { useEffect, useState } from 'react';
import { FileText, Command, Menu } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';
import { openPalette } from '../lib/palette';
import { TextRoll } from './ui';
import ResumeModal from './ResumeModal';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('about');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 320 && y > lastY);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Detect when we've scrolled past the hero (dark section) into paper sections
    const heroEl = document.getElementById('about');
    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (heroEl) heroObserver.observe(heroEl);

    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.15, 0.4] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const navMode = pastHero ? 'light' : 'dark';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? navMode === 'dark'
              ? 'glass-dark py-2.5'
              : 'border-b border-hairline bg-paper-card/80 backdrop-blur-xl py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          <a
            href="#about"
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="iris-gradient flex h-9 w-9 items-center justify-center rounded-xl font-display font-bold text-white transition-transform duration-300 group-hover:scale-105">
              R
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative block px-3 py-2 text-[13px] font-medium transition-colors ${
                      navMode === 'dark'
                        ? isActive ? 'text-headline' : 'text-muted-dark hover:text-headline'
                        : isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <TextRoll label={link.label} accent={navMode === 'dark' ? '#8fabf6' : '#2f5ce8'} />
                    <span className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-transparent transition-all duration-300 group-hover:scale-x-100" style={{ background: navMode === 'dark' ? '#8fabf6' : '#2f5ce8' }} />
                    {isActive && (
                      <span className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-100" style={{ background: navMode === 'dark' ? '#8fabf6' : '#2f5ce8' }} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              className={`hidden md:inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                navMode === 'dark'
                  ? 'border-white/12 text-muted-dark hover:border-white/30 hover:text-headline'
                  : 'border-hairline text-muted hover:border-ink/30 hover:text-ink'
              }`}
              aria-label="Open command palette (⌘K)"
            >
              <Command size={13} style={{ color: navMode === 'dark' ? '#8fabf6' : '#2f5ce8' }} />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest">⌘K</span>
            </button>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="shine-sweep iris-gradient inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white transition-transform active:scale-95"
            >
              <FileText size={14} />
              <span className="hidden sm:inline">Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${
                navMode === 'dark' ? 'text-headline' : 'text-ink'
              }`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}