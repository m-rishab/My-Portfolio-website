import { motion } from 'framer-motion';
import { about } from '../data/portfolio';
import { AnimatedSection, SectionHeading } from './ui';

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
};

export default function AboutSection() {
  return (
    <AnimatedSection id="about-story" className="py-10 sm:py-12 md:py-16" variant="fadeUp">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="About"
          title="The story, not the resume"
          subtitle="What drives the work."
        />

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Story */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8"
            >
              {about.story}
            </motion.p>

            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
              {about.focus}
            </p>
          </div>

          {/* Right: Focus Cards — 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {about.focusCards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  boxShadow: '0 20px 40px -12px rgba(37, 99, 235, 0.15)',
                  transition: { duration: 0.25, ease },
                }}
                className="glass rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col cursor-default border border-transparent hover:border-accent-blue/30 transition-[border-color] duration-300"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-2 sm:mb-3">
                  <span className="font-display text-sm sm:text-base font-bold text-accent">
                    {card.label.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-xs sm:text-sm lg:text-base font-bold text-gray-900 mb-1 leading-snug">{card.label}</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed hidden sm:block">{card.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
