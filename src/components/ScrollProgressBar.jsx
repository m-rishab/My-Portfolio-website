import { motion, useScroll } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(110deg, #2f5ce8, #7c5af0)',
      }}
      aria-hidden="true"
    />
  );
}