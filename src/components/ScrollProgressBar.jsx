import { motion, useScroll } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #8ab4f8, #f28b82, #fdd663, #81c995)',
      }}
    />
  );
}
