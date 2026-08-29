import { motion } from 'framer-motion';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { experience } from '../data/portfolio';
import { AnimatedSection, SectionHeading } from './ui';

export default function ExperienceSection() {
  return (
    <AnimatedSection id="experience" className="py-10 sm:py-12 md:py-16" variant="slideLeft">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          subtitle="A quick look at the roles, tools, and work I have been closest to."
        />

        {/* Unified wide container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 divide-y divide-surface-border/60"
        >
          {experience.map((job, idx) => (
            <div
              key={job.id}
              className={`grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-5 sm:gap-6 lg:gap-10 ${
                idx === 0 ? 'pb-8 sm:pb-10' : 'pt-8 sm:pt-10'
              }`}
            >
              {/* Left Column: Company & Role Details */}
              <div className="flex flex-col justify-start">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  {/* Logo Frame */}
                  <span
                    className={`grid shrink-0 place-items-center overflow-hidden rounded-xl border border-surface-border p-2 ${
                      job.companyLogoFrameClassName || 'h-11 w-28'
                    } ${job.companyLogoClassName || 'bg-white'}`}
                  >
                    {job.companyLogo ? (
                      <motion.img
                        src={job.companyLogo}
                        alt={`${job.companyDisplay || job.company} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span className={`font-display text-base font-bold ${job.companyLogo ? 'hidden' : ''}`}>
                      {(job.companyDisplay || job.company).slice(0, 1)}
                    </span>
                  </span>

                  {/* Badge */}
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-accent-green/10 text-accent-green border border-accent-green/20">
                    {job.type}
                  </span>
                </div>

                {job.roles ? (
                  <div className="mb-1.5 space-y-1">
                    {job.roles.map((r) => (
                      <div key={r.title} className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                          {r.title}
                        </h3>
                        <span className="text-[11px] sm:text-xs text-gray-500">{r.period}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1.5">
                    {job.role}
                  </h3>
                )}

                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <span className="text-xs sm:text-sm font-medium text-accent-light">
                    {job.companyDisplay || job.company}
                  </span>
                  {job.companyWebsite && (
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                      title="Visit company website"
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={13} className="text-accent-blue/80" />
                    {job.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-accent-blue/80" />
                    {job.location}
                  </span>
                </div>
              </div>

              {/* Right Column: Clean Bullet Points */}
              <div className="flex flex-col justify-center">
                <ul className="space-y-3 sm:space-y-3.5">
                  {job.highlights.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-[14.5px] text-gray-700 leading-[1.7]"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent-blue shrink-0 shadow-sm shadow-blue-400/40" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
