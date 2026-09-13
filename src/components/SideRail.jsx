import { useEffect, useState } from 'react';
import { navLinks } from '../data/portfolio';

export default function SideRail() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4"
      aria-label="Section navigation"
    >
      {navLinks.map((link) => {
        const isActive = active === link.href.slice(1);
        return (
          <a
            key={link.href}
            href={link.href}
            className="group relative flex h-10 w-10 items-center justify-center"
            aria-label={`Go to ${link.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`rail-dot ${isActive ? 'active' : ''}`}
            />
            <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md bg-charcoal px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-headline opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}