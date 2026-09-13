import { experience, education } from '../data/portfolio';
import { SectionHeader } from './ui';
import { ExternalLink, GraduationCap } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-paper py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          index="02"
          tag="Career"
          title="Where the work happens"
          accent="work"
        />

        <div className="flex flex-col divide-y divide-hairline">
          {experience.map((job, idx) => (
            <div
              key={job.id}
              className="group grid gap-6 py-10 transition-all duration-500 lg:grid-cols-[0.9fr_1.1fr] lg:py-12"
              style={{ transform: 'translateX(0)' }}
            >
              {/* Left — identity */}
              <div className="flex items-start gap-4">
                <span
                  className={`grid h-[52px] w-[52px] shrink-0 place-items-center overflow-hidden rounded-[14px] border border-hairline ${job.companyLogoClassName || 'bg-paper-card'}`}
                >
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyDisplay || job.company} logo`}
                      className="h-full w-full object-contain p-1.5"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="font-display font-bold text-ink">{(job.companyDisplay || job.company).slice(0, 1)}</span>
                  )}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {job.period}
                  </p>
                  <p className="mt-1.5 font-display text-xl font-bold text-ink">
                    {job.role || job.roles?.[0]?.title}
                  </p>
                  <p className="mt-0.5 text-[15px] font-medium">
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2950c4] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-[#2950c4]"
                    >
                      {job.companyDisplay || job.company}
                      {job.companyWebsite && <ExternalLink size={12} className="opacity-50" />}
                    </a>
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {job.location} · {job.type}
                    {job.roles?.[1] && <span> · incl. {job.roles[1].title} ({job.roles[1].period})</span>}
                  </p>
                </div>
              </div>

              {/* Right — highlights with dash bullets */}
              <ul className="space-y-3.5">
                {job.highlights.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-[1.7] text-body"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="mt-[0.6em] h-[2px] w-5 shrink-0 bg-gradient-to-r from-[#2f5ce8] to-[#7c5af0]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education summary row */}
          <div className="flex items-start gap-4 py-10 lg:py-12">
            <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] border border-hairline bg-paper-card">
              <GraduationCap size={22} className="text-[#2f5ce8]" />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{education.period} · GPA {education.gpa}</p>
              <p className="mt-1.5 font-display text-xl font-bold text-ink">{education.degree}</p>
              <p className="mt-0.5 text-[15px] text-[#2950c4]">{education.school}</p>
              <p className="mt-2.5 flex flex-wrap gap-2">
                {education.courses.slice(0, 6).map((course) => (
                  <span key={course} className="rounded-md border border-hairline bg-paper-alt px-2.5 py-1 font-mono text-[11px] text-muted">
                    {course}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}