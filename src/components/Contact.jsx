import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Mail, Phone } from 'lucide-react';
import { profile } from '../data/portfolio';
import { AnimatedSection, SectionHeading } from './ui';
import CopyEmailButton from './CopyEmailButton';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    setStatus('Opening your email client…');
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <AnimatedSection id="contact" className="py-10 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Connect"
          title="Contact Me"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            {/* Email Card with Copy Button */}
            <div className="flex items-center justify-between glass rounded-2xl p-4 sm:p-5 hover:border-accent/30 transition-colors group">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="p-2.5 sm:p-3 rounded-xl bg-accent/10 text-accent-light group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-900 uppercase tracking-wide">Email</p>
                  <p className="text-gray-900 text-xs sm:text-sm truncate">{profile.email}</p>
                </div>
              </a>
              <CopyEmailButton />
            </div>

            {/* Phone Card */}
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 sm:gap-4 glass rounded-2xl p-4 sm:p-5 hover:border-accent/30 transition-colors group"
            >
              <span className="p-2.5 sm:p-3 rounded-xl bg-accent/10 text-accent-light group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </span>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-900 uppercase tracking-wide">Phone</p>
                <p className="text-gray-900 text-xs sm:text-sm">{profile.phone}</p>
              </div>
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 glass rounded-2xl p-4 sm:p-5 hover:border-accent/30 transition-colors group"
            >
              <span className="p-2.5 sm:p-3 rounded-xl bg-accent/10 text-accent-light group-hover:scale-110 transition-transform">
                <Linkedin size={20} />
              </span>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-900 uppercase tracking-wide">LinkedIn</p>
                <p className="text-gray-900 text-xs sm:text-sm">Connect professionally</p>
              </div>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5"
          >
            <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900 mb-2">Send a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-surface-border text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent transition-colors text-sm"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-surface-border text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>

            <input
              type="text"
              required
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-surface-border text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent transition-colors text-sm"
            />

            <textarea
              required
              rows={4}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-surface-border text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
            />

            {status && <p className="text-xs sm:text-sm text-accent">{status}</p>}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-accent hover:bg-accent-light text-white text-sm sm:text-base font-medium transition-all hover:scale-105"
            >
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </AnimatedSection>
  );
}
