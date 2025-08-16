import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { useTransitionNavigation } from '@/hooks/useTransitionNavigation';

const Hero = () => {
  const { navigateWithTransition } = useTransitionNavigation();
  
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
    <header id="home" className="relative min-h-[92vh] w-full overflow-visible">
      
      {/* Quote beside navbar */}
      <div className="relative z-20 container mx-auto pt-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.02 }}
          className="text-sm md:text-base font-mono text-left tracking-tighter [word-spacing:-2px]"
        >
          <span className="text-cyan-400">&lt;/&gt;</span>
          <span className="text-gradient ml-1">Teach me - I remember, Involve me - I learn</span>
        </motion.p>
      </div>
      <div className="relative z-10 container mx-auto h-full flex items-start pt-48">
        <div className="max-w-3xl">

          {/* Line 1: Hello */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display leading-tight text-5xl md:text-7xl"
          >
            <span className="block mb-2">Hello..!</span>
          </motion.h1>

          {/* Line 2: Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="font-display leading-tight text-5xl md:text-7xl"
          >
            <span className="block">
              <span className="text-gradient">Sai Thoran</span>
              <span className="ml-2">here</span>
              <span className="ml-2 wave-hand inline-block" aria-hidden>
                👋🏻
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="mt-4 text-lg md:text-2xl text-muted-foreground font-mono"
            aria-live="polite"
          >
            <span>{text}</span>
            <span className="inline-block w-0.5 h-6 bg-current ml-1 animate-pulse" aria-hidden />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
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
