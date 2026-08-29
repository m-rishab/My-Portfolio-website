import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative z-10 flex flex-col w-full max-w-5xl h-[88vh] rounded-2xl border border-surface-border bg-white shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border bg-slate-50/90 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-accent-blue/10 text-accent">
                <FileText size={18} />
              </span>
              <div>
                <h3 className="font-display font-bold text-gray-900 text-sm sm:text-base">
                  {profile.name} — Resume
                </h3>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Data Scientist, AI Engineer & Data Analyst
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={profile.cvPreviewUrl || profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent hover:bg-accent-light text-white transition-colors shadow-xs"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </a>

              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-surface-border bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Open in Tab</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors ml-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full bg-slate-100 p-2 sm:p-3 overflow-hidden">
            <iframe
              src={profile.cvPreviewUrl || profile.cvUrl}
              title="Resume Viewer"
              className="w-full h-full rounded-xl border border-surface-border bg-white shadow-inner"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
