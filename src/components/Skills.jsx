import { skills } from '../data/portfolio';
import { AnimatedSection } from './ui';
import { motion } from 'framer-motion';

const categoryColors = [
  'text-accent-blue',
  'text-accent-green',
  'text-accent-yellow',
  'text-accent-red',
];

export default function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="py-10 sm:py-12 md:py-16 border-t border-surface-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-4 sm:gap-x-8 sm:gap-y-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-wrap items-center gap-1.5 sm:gap-2"
            >
              <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest shrink-0 ${categoryColors[i % categoryColors.length]}`}>
                {group.category}
              </span>
              <span className="text-surface-border text-[10px] sm:text-xs">·</span>
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs bg-white text-gray-600 border border-surface-border hover:border-accent-blue/30 hover:text-gray-900 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
