import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function CopyEmailButton({ className = '', variant = 'pill' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = profile.email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        title="Copy email to clipboard"
        aria-label="Copy email address"
        className={`group inline-flex items-center gap-1.5 transition-all active:scale-95 ${
          variant === 'pill'
            ? 'px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium border border-surface-border bg-white text-gray-700 hover:border-accent-blue/40 hover:bg-blue-50/50 hover:text-accent shadow-xs'
            : 'p-1.5 sm:p-2 rounded-lg border border-surface-border bg-white text-gray-500 hover:text-accent hover:border-accent-blue/40 shadow-xs'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check size={13} className="text-emerald-600 shrink-0" />
            {variant === 'pill' && <span className="text-emerald-700 font-semibold">Copied!</span>}
          </>
        ) : (
          <>
            <Copy size={13} className="text-gray-400 group-hover:text-accent shrink-0 transition-colors" />
            {variant === 'pill' && <span>Copy</span>}
          </>
        )}
      </button>

      {/* Floating Animated Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: -34, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg flex items-center gap-1.5"
          >
            <span>Email copied to clipboard!</span>
            <span>✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
