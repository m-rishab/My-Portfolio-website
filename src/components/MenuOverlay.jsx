import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';
import { openPalette } from '../lib/palette';
import { scrollToId, stopSmoothScroll, startSmoothScroll } from '../lib/scroll';

const ease = [0.76, 0, 0.24, 1];

export default function MenuOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    stopSmoothScroll();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      startSmoothScroll();
    };
  }, [open, onClose]);

  const go = (href) => {
    onClose();
    setTimeout(() => scrollToId(href.slice(1), href === '#about' ? 0 : -80), 60);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-charcoal film-grain aurora-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 pt-5">
            <span className="iris-gradient flex h-9 w-9 items-center justify-center rounded-xl font-display font-bold text-white">
              R
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-headline transition-colors hover:border-white/30"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav
            data-menu-overlay
            className="flex flex-1 flex-col justify-center px-6 sm:px-12 pb-8 overflow-hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="group flex items-baseline gap-4 py-2"
                    initial={{ y: '115%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '115%' }}
                    transition={{ delay: 0.06 * i, duration: 0.9, ease }}
                  >
                    <span className="font-mono text-xs text-[#8fabf6]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display font-extrabold uppercase leading-none tracking-[-0.02em] text-[clamp(2.4rem,10vw,4.5rem)] text-headline transition-colors group-hover:text-[#8fabf6]">
                      {link.label}
                    </span>
                    <ArrowUpRight size={20} className="text-muted-dark ml-auto" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => scrollToId('contact'), 60);
                }}
                className="shine-sweep iris-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              >
                <Mail size={15} />
                {profile.email}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => openPalette(), 60);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-headline transition-colors hover:border-white/30"
              >
                <FileText size={15} />
                Commands (⌘K)
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}