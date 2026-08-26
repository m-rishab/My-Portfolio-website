import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';
import ResumeModal from './ResumeModal';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');
  const [resumeOpen, setResumeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

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
      { rootMargin: '-34% 0px -52% 0px', threshold: [0.08, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-gray-200/80 py-3' : 'bg-white/60 backdrop-blur-md py-5'
        }`}
      >
        <motion.div
          className="google-accent-sweep fixed left-0 top-0 z-[60] h-0.5 w-full origin-left"
          style={{ scaleX }}
        />
        <nav className="max-w-6xl mx-auto px-4 sm:px-5 flex items-center justify-between">
          <a href="#about-story" className="flex items-center gap-3 group">
            <span className="google-accent-sweep w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="font-display font-semibold text-gray-900 hidden sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href.slice(1) ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                  {active === link.href.slice(1) && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="google-accent-sweep absolute inset-x-3 bottom-1 h-0.5 rounded-full"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-accent hover:bg-accent-light active:scale-95 text-white transition-all shadow-xs"
              >
                <FileText size={16} />
                Resume
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border border-surface-border shadow-lg mt-2 sm:mt-3 mx-3 sm:mx-4 rounded-2xl overflow-hidden"
            >
              <ul className="p-3 sm:p-4 space-y-0.5 sm:space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.href.slice(1) ? 'page' : undefined}
                      className={`relative block px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-colors ${
                        active === link.href.slice(1)
                          ? 'bg-gray-100 text-gray-900 font-semibold'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                      {active === link.href.slice(1) && (
                        <motion.span
                          layoutId="active-mobile-nav-underline"
                          className="google-accent-sweep absolute bottom-2 left-4 h-0.5 w-8 rounded-full"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setResumeOpen(true);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 rounded-xl text-accent font-semibold hover:bg-blue-50/50 transition-colors"
                  >
                    <FileText size={16} />
                    View & Download Resume
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
