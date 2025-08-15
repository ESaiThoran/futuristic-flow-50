import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from '@/components/3d/HeroCanvas';
import { GradientButton } from '@/components/ui/gradient-button';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { useTransitionNavigation } from '@/hooks/useTransitionNavigation';

const Hero = () => {
  const { navigateWithTransition } = useTransitionNavigation();
  
  // Typing effect for roles
  const roles = ['Cyber-Security', 'Ui/UX Designer', 'Frontend developer'];
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      quote: "Sai is an exceptional developer with deep expertise in cybersecurity and modern web technologies. His attention to detail and innovative solutions are outstanding.",
      name: "Tech Lead",
      designation: "Senior Developer",
      src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Working with Sai was a game-changer for our project. His UI/UX skills and frontend expertise brought our vision to life with stunning results.",
      name: "Project Manager",
      designation: "Product Lead",
      src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
    {
      quote: "Sai's cybersecurity knowledge and AI/ML implementations are cutting-edge. He consistently delivers high-quality, secure solutions that exceed expectations.",
      name: "Security Expert",
      designation: "Cybersecurity Specialist",
      src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
  ];

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
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      
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
      <div className="relative z-10 container mx-auto h-full flex items-start justify-between pt-48">
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

        {/* Right side: Testimonials */}
        <div className="hidden lg:block max-w-2xl relative -left-48 -top-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          >
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              colors={{
                name: "#f7f7ff",
                designation: "#e1e1e1",
                testimony: "#f1f1f7",
                arrowBackground: "#0582CA",
                arrowForeground: "#141414",
                arrowHoverBackground: "#f7f7ff",
              }}
              fontSizes={{
                name: "24px",
                designation: "16px",
                quote: "16px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
