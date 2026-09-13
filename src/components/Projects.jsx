import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { keyProjects, personalProjects } from '../data/portfolio';
import { SectionHeader } from './ui';
import ProjectModal from './ProjectModal';
import { useState, useCallback } from 'react';

const caseStudies = [
  {
    ...keyProjects[0],
    stat: '90% precision · 5K+ queries · 70% effort cut',
  },
  {
    ...keyProjects[1],
    stat: '10K+ AI Mode links / week',
  },
  {
    ...keyProjects[2],
    stat: '95% grounded accuracy · hallucination guardrail',
  },
];

const extraProjects = personalProjects.filter(
  (p) => p.id !== 'diet-and-workout',
);

const chipColor = (cat) => {
  const map = {
    'Machine Learning': 'chip-blue',
    'Generative AI': 'chip-violet',
    'Analytics': 'chip-green',
    'Company Project': 'chip-amber',
  };
  return map[cat] || 'chip-blue';
};

function StackCard({ project, index, total, onOpen }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'start start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.985, reduce ? 1 : 0.955]);
  const dim = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, reduce ? 1 : 0.45]);

  const onPointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - r.top}px`);
  };

  const open = (e) => {
    if (project.processDoc) {
      onOpen(project);
    } else {
      e.preventDefault();
      window.open(project.links?.github || project.links?.live, '_blank');
    }
  };

  return (
    <div
      ref={wrapRef}
      className="stack-card"
      style={{ top: `calc(76px + ${index * 14}px)` }}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={onPointerMove}
        style={{ scale, filter: reduce ? undefined : `brightness(${dim})` }}
        className="group relative grid cursor-pointer overflow-hidden rounded-[22px] bg-paper-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] min-h-[420px]"
        onClick={open}
        role="button"
        tabIndex={0}
        data-cursor="OPEN"
        onKeyDown={(e) => e.key === 'Enter' && open(e)}
        aria-label={`Open case study: ${project.title}`}
      >
        {/* cursor spotlight overlay */}
        <div className="cursor-spotlight pointer-events-none absolute inset-0 z-0" />

        {/* giant outlined numeral */}
        <span
          className="pointer-events-none absolute -bottom-8 -right-2 z-0 select-none font-display text-[clamp(6rem,12vw,13rem)] font-extrabold leading-none text-transparent opacity-40"
          style={{ WebkitTextStroke: '1.5px rgba(25, 24, 32, 0.1)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* content */}
        <div className="relative z-10 flex flex-col p-7 sm:p-9 lg:p-12 lg:pr-40">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, '0')}<span className="opacity-50">/{String(total).padStart(2, '0')}</span>
            </span>
            <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${chipColor(project.category)}`}>
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
            <span className="serif-accent font-normal normal-case text-[1.05em] text-[#2f5ce8]">{project.title.split(' ')[0]}</span>{' '}
            {project.title.split(' ').slice(1).join(' ')}
          </h3>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-body">
            {project.problem}
          </p>

          <div className="mt-6 max-w-2xl rounded-xl border border-hairline bg-paper px-4 py-3.5">
            <p className="font-mono text-sm font-medium text-ink">{project.stat}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.slice(0, 6).map((t) => (
              <span key={t} className="rounded-md bg-paper-alt px-2 py-1 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-md bg-[#2f5ce8]/10 px-2 py-1 font-mono text-[11px] text-[#2f5ce8] transition-colors hover:bg-[#2f5ce8]/15"
                aria-label={`Live demo of ${project.title}`}
              >
                live <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          <div className="mt-auto pt-8">
            <span className="inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-[#2f5ce8]">
              {project.processDoc ? 'Read the case study' : 'View project'}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
                style={{ color: '#2f5ce8' }}
              />
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const onOpen = useCallback((project) => setActiveProject(project), []);
  const closeModal = useCallback(() => setActiveProject(null), []);

  return (
    <section id="projects" className="relative bg-charcoal aurora-bg film-grain py-16 sm:py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          dark
          index="01"
          tag="Selected Work"
          title="Case studies"
        />

        <div className="flex flex-col gap-6 pb-[10vh]">
          {caseStudies.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={caseStudies.length}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* More projects */}
        <div className="mt-10 border-t border-white/10 pt-10">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-dark">
            Projects
          </p>
          <div className="flex flex-col divide-y divide-white/10">
            {extraProjects.map((p) => (
              <a
                key={p.id}
                href={p.links?.github || p.links?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <p className="font-display text-lg font-bold text-headline transition-colors group-hover:text-[#8fabf6]">
                    {p.title}
                  </p>
                  <p className="text-sm text-muted-dark">{p.approach}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dark sm:inline">
                    {p.category}
                  </span>
                  <ArrowUpRight size={18} className="text-muted-dark transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#8fabf6]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={closeModal} />}
    </section>
  );
}