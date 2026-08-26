import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText, Github, Layers3, Sparkles, Workflow } from 'lucide-react';
import { useState, useMemo } from 'react';
import { keyProjects, personalProjects } from '../data/portfolio';
import { AnimatedSection } from './ui';
import ProjectModal from './ProjectModal';

const categoryAccents = {
  'Generative AI':    { border: 'hover:border-amber-400/50', glow: 'hover:shadow-amber-950/20', dot: 'bg-amber-500' },
  'Analytics':        { border: 'hover:border-emerald-400/50', glow: 'hover:shadow-emerald-950/20', dot: 'bg-emerald-500' },
  'Machine Learning': { border: 'hover:border-rose-400/50', glow: 'hover:shadow-rose-950/20', dot: 'bg-rose-500' },
  'Company Project':  { border: 'hover:border-blue-400/50', glow: 'hover:shadow-blue-950/20', dot: 'bg-blue-500' },
};

function ProjectCard({ project, index, onViewProcess }) {
  const accent = categoryAccents[project.category] || categoryAccents['Company Project'];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, y: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={`glass group rounded-2xl p-4 sm:p-5 md:p-6 h-full flex flex-col hover:shadow-2xl transition-[border-color,box-shadow,transform] duration-300 ${accent.border} ${accent.glow}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-3.5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold border border-accent-blue/20 bg-accent-blue/10 text-accent">
            {project.category}
          </span>
          {project.company && (
            <span className="px-2.5 py-1 rounded-md text-xs font-medium border border-surface-border bg-surface-raised text-gray-700">
              {project.company}
            </span>
          )}
        </div>

        {project.processDoc && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
            <Sparkles size={11} />
            Architecture
          </span>
        )}
      </div>

      <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-3.5 leading-snug">{project.title}</h3>

      <div className="space-y-3 sm:space-y-3.5 flex-grow">
        {[
          { label: 'Problem', value: project.problem },
          { label: 'What I did', value: project.approach },
          { label: 'Result', value: project.outcome },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-0.5">{item.label}</p>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-4 sm:mt-5 mb-4 sm:mb-5">
        {project.tech.map((tech) => (
          <span key={tech} className="px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium bg-surface-raised text-gray-700 border border-surface-border transition-colors duration-200 group-hover:border-accent-blue/20">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-surface-border">
        {/* View Process button for projects with processDoc */}
        {project.processDoc && onViewProcess && (
          <button
            type="button"
            onClick={() => onViewProcess(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-light active:scale-95 transition-all shadow-xs"
          >
            <Workflow size={13} />
            View Workflow & Architecture
          </button>
        )}
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-surface-border bg-white text-gray-700 hover:text-accent hover:border-accent/40 transition-colors"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-surface-border bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Github size={13} />
            Code
          </a>
        )}
        {project.links?.pdf && (
          <a
            href={project.links.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-surface-border bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FileText size={13} />
            Report
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Projects', count: keyProjects.length + personalProjects.length },
    { id: 'work', label: 'Work Related', count: keyProjects.length },
    { id: 'personal', label: 'Personal', count: personalProjects.length },
  ];

  const filteredKeyProjects = useMemo(() => {
    if (activeTab === 'all' || activeTab === 'work') return keyProjects;
    return [];
  }, [activeTab]);

  const filteredPersonalProjects = useMemo(() => {
    if (activeTab === 'all' || activeTab === 'personal') return personalProjects;
    return [];
  }, [activeTab]);

  const handleViewProcess = (project) => setActiveProject(project);
  const handleCloseModal = () => setActiveProject(null);

  return (
    <>
      <AnimatedSection id="projects" className="py-10 sm:py-12 md:py-16 bg-surface-raised/40" variant="slideRight">
        <div className="max-w-6xl mx-auto px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            <div>
              <p className="text-accent-light text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">Work</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Projects</h2>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl">
                A curated selection of engineering & analytics projects across enterprise scale and applied GenAI.
              </p>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="section-reveal-line mt-4 sm:mt-6 h-1 w-16 rounded-full"
              />
            </div>

            <a
              href="https://github.com/m-rishab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-surface-border bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:text-accent hover:border-accent/40 hover:bg-blue-50/50 shadow-xs transition-all"
            >
              <Layers3 size={16} />
              More on GitHub
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 p-1 sm:p-1.5 rounded-2xl border border-surface-border bg-white/90 backdrop-blur-md shadow-xs w-fit overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="project-tab-pill"
                      className="absolute inset-0 rounded-xl bg-accent shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-gray-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Key Projects Group */}
          {filteredKeyProjects.length > 0 && (
            <div className="mb-10 sm:mb-12 last:mb-0">
              <div className="mb-4 sm:mb-5">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">Enterprise & Key Work</h3>
                <p className="text-gray-600 text-xs sm:text-sm max-w-2xl">Company-based work where I contributed to analytics, automation, and AI product workflows.</p>
              </div>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredKeyProjects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      onViewProcess={handleViewProcess}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Personal Projects Group */}
          {filteredPersonalProjects.length > 0 && (
            <div className="mb-10 sm:mb-12 last:mb-0">
              <div className="mb-4 sm:mb-5">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">Personal Projects</h3>
                <p className="text-gray-600 text-xs sm:text-sm max-w-2xl">Independent AI and data systems built end-to-end — from model training to live deployment.</p>
              </div>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredPersonalProjects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      onViewProcess={handleViewProcess}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {filteredKeyProjects.length === 0 && filteredPersonalProjects.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-500">No projects found for this category.</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={handleCloseModal} />
      )}
    </>
  );
}
