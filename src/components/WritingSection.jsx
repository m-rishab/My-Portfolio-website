import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { writing } from '../data/portfolio';
import { AnimatedSection, SectionHeading, StaggerContainer, StaggerItem } from './ui';

const ease = [0.22, 1, 0.36, 1];

export default function WritingSection() {
  return (
    <AnimatedSection id="writing" className="py-10 sm:py-12 md:py-16" variant="fadeUp">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Writing"
          title="Latest from me"
          subtitle="Projects and work I've been closest to."
        />

        <StaggerContainer className="space-y-3 sm:space-y-4">
          {writing.map((item) => (
            <StaggerItem key={item.title}>
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4, transition: { duration: 0.2, ease } }}
                className="glass group block rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-lg hover:border-accent-blue/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-400 group-hover:text-accent transition-colors shrink-0"
                  />
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-accent transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.tech && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium border border-surface-border bg-surface-raised text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
