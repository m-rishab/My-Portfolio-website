import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function NameMarquee() {
  const text = 'RISHABH MISHRA . ';
  const repeats = 14;
  const content = text.repeat(repeats);

  return (
    <div className="relative py-8 sm:py-10 md:py-12 overflow-hidden select-none" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900/[0.04]"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <span className="pr-8">{content}</span>
        <span className="pr-8">{content}</span>
      </motion.div>
    </div>
  );
}
