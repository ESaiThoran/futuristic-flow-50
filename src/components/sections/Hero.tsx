import { motion } from 'framer-motion';
import HeroCanvas from '@/components/3d/HeroCanvas';
import MagneticButton from '@/components/ui/MagneticButton';

const Hero = () => {
  return (
    <header id="home" className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4"
          >
            Creative Developer • 3D • Motion
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-gradient text-5xl md:text-7xl leading-tight"
          >
            Building immersive, high‑performance web experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground"
          >
            I blend cutting‑edge 3D, smooth motion, and refined UI to craft delightful products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10"
          >
            <a href="#contact">
              <MagneticButton aria-label="Hire Me" className="glow-ring">
                Hire Me
              </MagneticButton>
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
