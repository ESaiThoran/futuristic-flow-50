import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from '@/components/3d/HeroCanvas';
import { GradientButton } from '@/components/ui/gradient-button';

const Hero = () => {
  // Typing effect for roles
  const roles = ['Cyber-Security', 'Ui/UX Designer', 'Frontend developer'];
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 90;
    const pauseTime = 900;

    const handle = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) setIsDeleting(true);
      } else {
        setText(current.slice(0, Math.max(0, charIndex - 1)));
        setCharIndex((c) => Math.max(0, c - 1));
        if (charIndex - 1 <= 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, charIndex === roles[roleIndex].length && !isDeleting ? pauseTime : typingSpeed);

    return () => clearTimeout(handle);
  }, [roles, roleIndex, charIndex, isDeleting]);

  return (
    <header id="home" className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="relative z-10 container mx-auto h-full flex items-center justify-start">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-wide text-muted-foreground mb-4 italic"
          >
            Teach me - I remember, Involve me - I learn
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display leading-tight text-5xl md:text-7xl"
          >
            <span className="block mb-2">Hello..!</span>
            <span className="block">
              <motion.span
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-gradient"
              >
                Sai Thoran
              </motion.span>
              <span className="ml-2">here</span>
              <span className="ml-2 wave-hand inline-block" aria-hidden>
                👋🏻
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-lg md:text-2xl text-muted-foreground font-mono"
            aria-live="polite"
          >
            <span>{text}</span>
            <span className="type-caret ml-1" aria-hidden />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <GradientButton aria-label="LinkedIn">LinkedIn</GradientButton>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <GradientButton aria-label="GitHub" variant="variant">GitHub</GradientButton>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <GradientButton aria-label="Resume" variant="emerald">Resume</GradientButton>
            </a>
          </motion.div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
