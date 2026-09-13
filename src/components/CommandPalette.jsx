import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Search, CornerDownLeft, Keyboard, Command, Mail, BookOpen, ArrowUpRight, Eye } from 'lucide-react';
import { navLinks, profile, keyProjects } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { onOpenPalette } from '../lib/palette';
import { scrollToId, stopSmoothScroll, startSmoothScroll } from '../lib/scroll';

const EXTERNAL = [
  {
    label: 'GitHub',
    hint: 'github.com/m-rishab',
    action: () => window.open(profile.social.github, '_blank'),
    icon: ArrowUpRight,
  },
  {
    label: 'LinkedIn',
    hint: 'linkedin.com/in/rishabhh-mishra',
    action: () => window.open(profile.social.linkedin, '_blank'),
    icon: ArrowUpRight,
  },
];

const buildCommands = (onSelect) => {
  const go = (id) => scrollToId(id, id === 'about' ? 0 : -80);

  const sections = navLinks.map((link) => ({
    id: `go-${link.href}`,
    label: link.label,
    hint: 'Jump to section',
    icon: CornerDownLeft,
    keywords: `${link.label} section`,
    action: () => go(link.href.slice(1)),
  }));

  const studies = keyProjects.map((p) => ({
    id: `study-${p.id}`,
    label: p.title,
    hint: 'Open case study',
    icon: BookOpen,
    keywords: `${p.title} case study ${p.category}`,
    action: () => onSelect(`case-study:${p.id}`),
    isStudy: true,
  }));

  return [
    ...sections,
    ...studies,
    {
      id: 'copy-email',
      label: 'Copy email address',
      hint: profile.email,
      icon: Mail,
      keywords: 'email copy contact',
      action: 'copy-email',
    },
    {
      id: 'reduced-motion',
      label: 'Toggle reduced motion',
      hint: 'Smooth or instant motion',
      icon: Eye,
      keywords: 'motion animation reduce preferences',
      action: 'toggle-motion',
    },
    ...EXTERNAL,
  ];
};

function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette({ onCaseStudy }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { reduceMotion, setReduceMotion, showToast } = useTheme();

  const commands = useMemo(() => buildCommands(onCaseStudy), [onCaseStudy, profile.email, keyProjects]);

  const results = useMemo(() => {
    const filtered = commands.filter(
      (c) => fuzzyMatch(query, c.label + ' ' + (c.hint || '') + ' ' + (c.keywords || '')),
    );
    return filtered.slice(0, 8);
  }, [query, commands]);

  const doOpen = useCallback(() => {
    setQuery('');
    setIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const isMod = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !e.target.closest('input, textarea');
      if (isMod || isSlash) {
        e.preventDefault();
        doOpen();
      }
    };
    const unsub = onOpenPalette(doOpen);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      unsub();
    };
  }, [doOpen]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    stopSmoothScroll();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = results[index];
        if (cmd) runCommand(cmd);
      }
    };

    const runCommand = (cmd) => {
      if (cmd.action === 'copy-email') {
        navigator.clipboard?.writeText(profile.email)
          .then(() => showToast(`Email copied — ${profile.email}`))
          .catch(() => {});
        closePalette();
        return;
      }
      if (cmd.action === 'toggle-motion') {
        setReduceMotion(!reduceMotion);
        showToast(reduceMotion ? 'Motion enabled' : 'Reduced motion enabled');
        closePalette();
        return;
      }
      if (typeof cmd.action === 'string' && cmd.action.startsWith('case-study:')) {
        closePalette();
        onCaseStudy(cmd.action);
        return;
      }
      if (cmd.isStudy) {
        closePalette();
        return;
      }
      cmd.action();
      closePalette();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      startSmoothScroll();
    };
  }, [open, results, index, reduceMotion, setReduceMotion, showToast, closePalette, onCaseStudy]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.children[index]?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center pt-[15vh] px-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={closePalette}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-hairline/60 bg-paper-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline/60">
          <Search size={18} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            className="w-full bg-transparent text-ink outline-none text-sm placeholder:text-muted"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            autoComplete="off"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-muted border border-hairline rounded px-1.5 py-0.5">
            <Keyboard size={11} /> ESC
          </kbd>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-sm text-muted text-center">No matches — try "email" or "projects"</li>
          )}
          {results.map((cmd, i) => {
            const Icon = cmd.icon || CornerDownLeft;
            return (
              <li key={cmd.id} role="option" aria-selected={i === index}>
                <button
                  type="button"
                  onClick={() => {
                    if (cmd.action === 'copy-email') {
                      navigator.clipboard?.writeText(profile.email)
                        .then(() => showToast(`Email copied — ${profile.email}`))
                        .catch(() => {});
                      closePalette();
                    } else if (cmd.action === 'toggle-motion') {
                      setReduceMotion(!reduceMotion);
                      showToast(reduceMotion ? 'Motion enabled' : 'Reduced motion enabled');
                      closePalette();
                    } else if (cmd.isStudy) {
                      closePalette();
                      onCaseStudy(cmd.action);
                    } else {
                      cmd.action();
                      closePalette();
                    }
                  }}
                  onMouseEnter={() => setIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === index ? 'bg-[#2f5ce8]/10' : ''
                  }`}
                >
                  <Icon size={15} className={`shrink-0 ${i === index ? 'text-iris-from' : 'text-muted'}`} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-ink truncate">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="block text-[11px] text-muted truncate font-mono">{cmd.hint}</span>
                    )}
                  </span>
                  {i === index && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-iris-from">↵</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-hairline/60 px-4 py-2.5 flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-[10px] text-muted font-mono uppercase tracking-widest">
            <Command size={11} /> K — open
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-muted font-mono uppercase tracking-widest">
            <CornerDownLeft size={11} /> select
          </span>
          <span className="ml-auto text-[10px] text-muted font-mono uppercase tracking-widest">Paper &amp; Iris</span>
        </div>
      </div>
    </div>
  );
}