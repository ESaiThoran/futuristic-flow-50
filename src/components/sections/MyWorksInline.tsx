import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

type TransitionPhase = 'idle' | 'overlay' | 'background' | 'content' | 'closing';

interface MyWorksInlineProps {
  isVisible: boolean;
  onClose: () => void;
  initialTab?: 'works' | 'videos';
  initialVideoId?: number;
  transitionPhase?: TransitionPhase;
  onBackgroundComplete?: () => void;
}

const MyWorksInline = ({ 
  isVisible, 
  onClose, 
  initialTab = 'works', 
  initialVideoId,
  transitionPhase = 'idle',
  onBackgroundComplete
}: MyWorksInlineProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');

  // Reset states when component becomes visible
  useEffect(() => {
    if (isVisible && transitionPhase === 'idle') {
      setBackgroundVisible(false);
      setContentVisible(false);
    }
  }, [isVisible, transitionPhase]);

  // Update tab when props change
  useEffect(() => {
    setActiveTab(initialTab);
    
    // If a specific videoId is provided and we're on videos tab, scroll to that video after render
    if (initialTab === 'videos' && initialVideoId && contentVisible) {
      setTimeout(() => {
        const el = document.getElementById(`video-${initialVideoId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800); // Give time for the animations to complete
    }
  }, [initialTab, initialVideoId, contentVisible]);

  // Handle transition phases
  useEffect(() => {
    if (transitionPhase === 'content') {
      // Show background immediately when content phase starts
      setBackgroundVisible(true);
      // Start content animation after a brief delay
      setTimeout(() => {
        setContentVisible(true);
      }, 200);
    } else if (transitionPhase === 'closing') {
      setContentVisible(false);
      setTimeout(() => {
        setBackgroundVisible(false);
      }, 300);
    }
  }, [transitionPhase]);

  const handleTabChange = (tab: 'works' | 'videos') => {
    if (tab === activeTab || isTabTransitioning) return;
    
    // Determine transition direction
    // works to videos: slide left (current goes left, new comes from right)
    // videos to works: slide right (current goes right, new comes from left)
    setTransitionDirection(tab === 'videos' ? 'left' : 'right');
    
    setIsTabTransitioning(true);
    // Reduce delay to match other transitions
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsTabTransitioning(false);
      }, 500); // Updated to match transition duration
    }, 100); // Reduced for snappier response
  };

  const worksData = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and TypeScript.",
      image: "/placeholder.svg",
      category: "Web Development"
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "An intelligent chat application powered by machine learning algorithms.",
      image: "/placeholder.svg",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "Mobile App Design",
      description: "UI/UX design for a cross-platform mobile application.",
      image: "/placeholder.svg",
      category: "Design"
    }
  ];

  const videoData = [
    {
      id: 1,
      title: "JARVIS System Demo",
      description: "Demonstration of the AI-powered JARVIS system for system automation.",
      videoUrl: "#",
      thumbnail: "/placeholder.svg",
      duration: "3:45"
    },
    {
      id: 2,
      title: "Phishing Detection Tool",
      description: "Real-time demonstration of the AI-powered phishing detection Chrome extension.",
      videoUrl: "#",
      thumbnail: "/placeholder.svg",
      duration: "2:30"
    },
    {
      id: 3,
      title: "Cryptography Tool Demo",
      description: "Showcase of the cryptography and steganography web tool capabilities.",
      videoUrl: "#",
      thumbnail: "/placeholder.svg",
      duration: "4:15"
    },
    {
      id: 4,
      title: "Emotion Detection Demo",
      description: "Live demonstration of the voice emotion recognition system.",
      videoUrl: "#",
      thumbnail: "/placeholder.svg",
      duration: "3:20"
    },
    {
      id: 5,
      title: "Restaurant Management System",
      description: "Complete walkthrough of the restaurant management system features.",
      videoUrl: "#",
      thumbnail: "/placeholder.svg",
      duration: "5:10"
    }
  ];

  if (!isVisible) return null;

  console.log('MyWorksInline render:', { isVisible, transitionPhase, backgroundVisible, contentVisible });

  return (
    <AnimatePresence>
      {/* Full Screen Background Layer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={backgroundVisible ? { y: 0 } : { y: '100%' }}
        exit={{ y: '100%' }}
        transition={{ 
          duration: 0.5, // Reduced from 0.6 to match other transitions
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="fixed inset-0 z-50 text-foreground selection:bg-accent/30 selection:text-primary overflow-auto"
        style={{
          background: 'transparent',
        }}
      >
        {/* Close Button - Motion from left */}
        <motion.button 
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: contentVisible ? 0 : -100, 
            opacity: contentVisible ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: contentVisible ? 0.1 : 0, // Reduced from 0.2 to make it snappier
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          onClick={onClose}
          className="fixed top-6 left-6 z-50 px-4 py-2 rounded-lg border-2 border-white/20 bg-black/40 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 shadow-2xl"
        >
          <IoClose className="text-lg" />
          Close
        </motion.button>

        {/* Tab Navigation - Motion from right */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ 
            x: contentVisible ? 0 : 100, 
            opacity: contentVisible ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: contentVisible ? 0.2 : 0, // Reduced from 0.3 to make it snappier
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="flex space-x-1 bg-black/40 backdrop-blur-sm p-1 rounded-lg shadow-lg border border-white/20">
            <button
              onClick={() => handleTabChange('works')}
              disabled={isTabTransitioning}
              className={`px-6 py-2 rounded-md transition-all duration-200 border disabled:opacity-50 ${
                activeTab === 'works'
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-transparent text-white border-transparent hover:bg-white/10 hover:border-white/20'
              }`}
          key={`heading-${activeTab}`}
          initial={{ opacity: 0, y: -20 }}
              My Works
            opacity: contentVisible ? 1 : 0, 
            y: contentVisible ? 0 : -20 
              onClick={() => handleTabChange('videos')}
          exit={{ opacity: 0, y: 20 }}
              disabled={isTabTransitioning}
            duration: 0.4, 
                activeTab === 'videos'
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-transparent text-white border-transparent hover:bg-white/10 hover:border-white/20'
              }`}
            >
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="font-display text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {activeTab === 'works' ? 'My Works' : 'Project Works'}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        <main className="container pb-16 pt-20">
          {/* Heading - Fade in at place */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: contentVisible ? 1 : 0, 
              scale: contentVisible ? 1 : 0.9 
            }}
            transition={{ 
              duration: 0.5, 
              delay: contentVisible ? 0.1 : 0,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="flex items-center justify-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {activeTab === 'works' ? 'My Works' : 'Project Works'}
            </h1>
          </motion.div>

          {/* Tab Content Container - Cards slide from bottom */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: contentVisible ? 0 : 100, 
              opacity: contentVisible ? 1 : 0 
            }}
            transition={{ 
              duration: 0.6, 
              delay: contentVisible ? 0.4 : 0,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'works' && (
                <motion.div
                  key="works"
                  initial={{ 
                    x: isTabTransitioning ? (transitionDirection === 'right' ? '-100%' : 0) : 0, 
                    opacity: 1 
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ 
                    x: transitionDirection === 'left' ? '-100%' : '100%', 
                    opacity: 1 
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8"
                >
                  {worksData.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
                    >
                      <div className="aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-muted-foreground overflow-hidden relative group">
                        <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 relative">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-400/30 backdrop-blur-sm">
                            {work.category}
                          </span>
                        </div>
                        <h2 className="font-semibold text-xl text-white mb-2">{work.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">{work.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'videos' && (
                <motion.div
                  key="videos"
                  initial={{ 
                    x: isTabTransitioning ? (transitionDirection === 'left' ? '100%' : 0) : 0, 
                    opacity: 1 
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ 
                    x: transitionDirection === 'right' ? '100%' : '-100%', 
                    opacity: 1 
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8"
                >
                  {videoData.map((video, index) => (
                    <motion.div
                      id={`video-${video.id}`}
                      key={video.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
                    >
                      <div className="relative aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                          <motion.div 
                            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-6 relative">
                        <h2 className="font-semibold text-xl text-white mb-2">{video.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">{video.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyWorksInline;
