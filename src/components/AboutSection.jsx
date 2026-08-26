import { motion } from 'framer-motion';
import { about } from '../data/portfolio';
import { AnimatedSection, SectionHeading, StaggerContainer, StaggerItem } from './ui';

const ease = [0.22, 1, 0.36, 1];

export default function AboutSection() {
  return (
    <AnimatedSection id="about-story" className="py-10 sm:py-12 md:py-16" variant="fadeUp">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="About"
          title="The story, not the resume"
          subtitle="What drives the work."
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-8 sm:mb-10"
        >
          {about.story}
        </motion.p>

        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4 sm:mb-5">
          {about.focus}
        </p>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {about.focusCards.map((card) => (
            <StaggerItem key={card.label}>
              <div className="glass rounded-2xl p-4 sm:p-5 h-full flex flex-col hover:shadow-lg hover:border-accent-blue/30 transition-all duration-300">
                <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 mb-1.5">{card.label}</h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed flex-grow">{card.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
