import { motion } from 'framer-motion';
import Timeline from '@/components/ui/timeline';
import { useRef, useState, useEffect } from 'react';
import { useMyWorks } from '@/pages/Index';
import aijImage from '@/assets/aij.jpeg';
import pdtImage from '@/assets/pdt.jpeg';
import cstImage from '@/assets/cst.jpg';
import hciImage from '@/assets/hci.png';
import rmsImage from '@/assets/rms.jpg';
const Projects = () => {
  const { showMyWorks } = useMyWorks();

  const handleImageClick = (projectTitle: string) => {
    // Map projects to corresponding video IDs
    const projectTitleToVideoId: Record<string, number> = {
      'JARVIS for System': 1,
      'Phishing Detection Tool': 2,
      'Cryptography with Steganography Web Tool': 3,
      'Emotion Detection from Voice': 4,
      'Restaurant Management System': 5,
    };

    const videoId = projectTitleToVideoId[projectTitle];
    if (videoId) {
      showMyWorks('videos', videoId);
    } else {
      showMyWorks('videos');
    }
  };

  const HoverViewImage = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const lastClientRef = useRef<{ x: number; y: number } | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const targetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const updateTargetFromClient = (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetPosRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    };

    const animate = () => {
      setCursorPos(prev => {
        const tx = targetPosRef.current.x;
        const ty = targetPosRef.current.y;
        const nx = prev.x + (tx - prev.x) * 0.2;
        const ny = prev.y + (ty - prev.y) * 0.2;
        return { x: nx, y: ny };
      });
      if (isHovering) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      lastClientRef.current = { x: e.clientX, y: e.clientY };
      updateTargetFromClient(e.clientX, e.clientY);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    useEffect(() => {
      const handleScrollOrResize = () => {
        if (!isHovering || !lastClientRef.current) return;
        updateTargetFromClient(lastClientRef.current.x, lastClientRef.current.y);
      };
      window.addEventListener('scroll', handleScrollOrResize, { passive: true });
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize as any);
        window.removeEventListener('resize', handleScrollOrResize as any);
      };
    }, [isHovering]);

    return (
      <div
        ref={containerRef}
        className="relative cursor-pointer rounded-lg overflow-hidden group"
        onClick={onClick}
        onMouseEnter={(e) => {
          setIsHovering(true);
          lastClientRef.current = { x: e.clientX, y: e.clientY };
          updateTargetFromClient(e.clientX, e.clientY);
          if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <img src={src} alt={alt} className="rounded-lg object-cover h-32 md:h-48 lg:h-64 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] transition-all duration-300" />
        <div
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 will-change-transform ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black font-semibold uppercase text-xs md:text-sm shadow-2xl">
            view
          </div>
        </div>
      </div>
    );
  };

  const timelineData = [
    {
      title: 'JARVIS for System',
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full mb-2">
              AI Assistant
            </span>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Enabled it with natural language understanding and responding. Conversational and operational response also performance actions & efficient task execution.
          </p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">LLM</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Python</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">TensorFlow</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Torch</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">pandas</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">selenium</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <HoverViewImage src={aijImage} alt="JARVIS for System" onClick={() => handleImageClick('JARVIS for System')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Phishing Detection Tool',
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-full mb-2">
              AI Chrome Extension
            </span>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Developed Real time Chrome extension that employs machine learning algorithm Random Forest to detect and mitigate phishing websites. The AI system achieved 93% accuracy.
          </p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">JavaScript</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">CSS & HTML</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Python</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">AI & ML</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <HoverViewImage src={pdtImage} alt="Phishing Detection Tool" onClick={() => handleImageClick('Phishing Detection Tool')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Cryptography with Steganography Web Tool',
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 rounded-full mb-2">
              Web Development
            </span>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Developed a website that encrypts and conceals data in media files (Image, Video, Audio, txt-file) using advanced cryptographic and steganographic techniques, aim to withstand quantum computers.
          </p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">JavaScript</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">CSS</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Python</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Flask</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">pandas</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">cryptography</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">steganography</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <HoverViewImage src={cstImage} alt="Cryptography with Steganography Web Tool" onClick={() => handleImageClick('Cryptography with Steganography Web Tool')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Emotion Detection from Voice',
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 rounded-full mb-2">
              HCI & ML
            </span>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Developed a sophisticated Speech Emotion Recognition (SER) system utilizing LSTM neural network. It accurately interpret intricate emotional states.
          </p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">TKinter</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">ML</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Python</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <HoverViewImage src={hciImage} alt="Emotion Detection from Voice" onClick={() => handleImageClick('Emotion Detection from Voice')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Restaurant Management System',
      content: (
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-full mb-2">
              Web Development
            </span>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Developed and implemented a comprehensive website with UI/UX frontend and backend. Implemented with user facilities like creating accounts, finding items, managing cart, saving inventory, self-order at dining, easy navigation and payment.
          </p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">JavaScript</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">CSS</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">HTML</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">PHP</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">SQL</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <HoverViewImage src={rmsImage} alt="Restaurant Management System" onClick={() => handleImageClick('Restaurant Management System')} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl mb-4 text-right pr-32"
        >
          ↙ Projects
        </motion.h2>
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default Projects;
