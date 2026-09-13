import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { writing, now } from '../data/portfolio';
import { SectionHeader } from './ui';

const statusColors = {
  BUILDING: 'text-[#2950c4]',
  LEARNING: 'text-[#9c5c10]',
  EXPLORING: 'text-[#6647dd]',
  MAINTAINING: 'text-[#1f7c4e]',
};

export default function WritingNow() {
  const sectionRef = useRef(null);
  const lastUpdated = useRef(
    new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  );

  return (
    <section id="now" ref={sectionRef} className="relative bg-paper py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          index="03"
          tag="Writing & Now"
          title="Notes, work, and what's next"
          accent="and"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left — writing rows */}
          <div>
            {writing.map((post, i) => (
              <a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="READ"
                className="group relative flex items-baseline gap-5 border-t border-hairline py-6 transition-all duration-300 hover:translate-x-[18px] last:border-b"
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-ink transition-colors group-hover:text-[#2950c4]">
                  {post.title}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {post.date} · write-up
                  </span>
                  <ArrowUpRight size={18} className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2950c4]" />
                </span>
              </a>
            ))}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Essays & deep-dives shipping soon
            </p>
          </div>

          {/* Right — what I'm up to */}
          <div className="rounded-2xl border border-hairline bg-paper-card p-6 sm:p-8 h-fit">
            <div className="mb-6 flex items-center justify-between">
              <p className="inline-flex items-center gap-2.5 font-display text-lg font-bold text-ink">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                What I'm up to
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Updated {lastUpdated.current}
              </span>
            </div>

            <div className="flex flex-col divide-y divide-hairline">
              {now.map((item) => {
                const label = item.label.toUpperCase().replace(/\s+/g, ' ');
                const color = label.includes('BUILD')
                  ? 'BUILDING'
                  : label.includes('LEARN')
                    ? 'LEARNING'
                    : label.includes('EXPLOR')
                      ? 'EXPLORING'
                      : 'MAINTAINING';
                return (
                  <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${statusColors[color]}`}>
                      {color}
                    </span>
                    <h4 className="mt-1 font-display text-[15px] font-bold text-ink">{item.title}</h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}