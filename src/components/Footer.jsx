import { ArrowUp, Heart } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-gray-900 text-xs sm:text-sm flex items-center gap-1 text-center sm:text-left">
          © {year} {profile.name}. Built with
          <Heart size={14} className="text-red-400 inline" aria-hidden="true" />
          React & Framer Motion
        </p>

        <a
          href="#about"
          className="inline-flex items-center gap-2 text-sm text-gray-900 hover:text-accent-light transition-colors"
          aria-label="Scroll to top"
        >
          Back to top
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
