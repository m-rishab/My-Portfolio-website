import { GraduationCap, BookOpen } from 'lucide-react';
import { education } from '../data/portfolio';
import { AnimatedSection, SectionHeading } from './ui';
import { motion } from 'framer-motion';

export default function EducationSection() {
  return (
    <AnimatedSection id="education" className="py-12 md:py-16 bg-surface-raised/50">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          eyebrow="Background"
          title="Education"
          subtitle="Strong foundation in AI, ML, and computer science from a specialized engineering program."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-10 max-w-4xl"
        >
          <div className="flex items-start gap-5 mb-6">
            <div className="p-4 rounded-2xl bg-accent/10 text-accent-light shrink-0">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
                {education.degree}
              </h3>
              <p className="text-accent-light font-medium">{education.school}</p>
              <p className="text-gray-900 text-sm mt-1">
                {education.location} · {education.period} · GPA: {education.gpa}
              </p>
            </div>
          </div>

          <div className="border-t border-surface-border pt-6">
            <div className="flex items-center gap-2 mb-4 text-gray-900">
              <BookOpen size={18} />
              <span className="text-sm font-medium uppercase tracking-wide">Key Courses</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 rounded-lg text-sm bg-surface text-gray-900 border border-surface-border hover:border-accent/30 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
