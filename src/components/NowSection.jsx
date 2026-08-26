import { motion } from 'framer-motion';
import { now } from '../data/portfolio';
import { AnimatedSection, SectionHeading, StaggerContainer, StaggerItem } from './ui';

const ease = [0.22, 1, 0.36, 1];

export default function NowSection() {
  return (
    <AnimatedSection id="now" className="py-10 sm:py-12 md:py-16" variant="slideLeft">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Now"
          title="What I'm doing right now"
          subtitle="A live status page. Updated regularly. Because static bios lie."
        />

        <StaggerContainer className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {now.map((item) => (
            <StaggerItem key={item.label}>
              <div className="glass rounded-2xl p-4 sm:p-5 h-full hover:shadow-lg hover:border-accent-blue/30 transition-all duration-300">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-accent mb-1">
                  {item.label}
                </p>
                <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
