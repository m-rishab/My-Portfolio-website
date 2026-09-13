import { GraduationCap, BookOpen } from 'lucide-react';
import { education } from '../data/portfolio';
import { AnimatedSection, SectionHeading } from './ui';
import { motion } from 'framer-motion';

export default function EducationSection() {
  return (
    <AnimatedSection id="education" className="py-10 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Background"
          title="Education"
          subtitle="Strong foundation in AI, ML, and computer science from a specialized engineering program."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 md:p-10 max-w-4xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-primary/10 text-primary shrink-0">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {education.degree}
              </h3>
              <p className="text-primary font-medium text-sm sm:text-base">{education.school}</p>
              <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                {education.location} · {education.period} · GPA: {education.gpa}
              </p>
            </div>
          </div>

          <div className="border-t border-surface-border dark:border-slate-800 pt-6">
            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-200">
              <BookOpen size={18} className="text-primary" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Key Specialization Courses</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-surface-border dark:border-slate-700 hover:border-primary/30 transition-colors"
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
