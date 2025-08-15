import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface MyWorksSectionProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  selectedVideoId: number | null;
  onTabChange: (tab: string) => void;
}

const MyWorksSection = ({ isOpen, onClose, activeTab, selectedVideoId, onTabChange }: MyWorksSectionProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // If a specific videoId is provided, scroll to that video after render
      if (activeTab === 'videos' && selectedVideoId) {
        setTimeout(() => {
          const el = document.getElementById(`video-${selectedVideoId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, activeTab, selectedVideoId]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 bg-background overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
              <div className="container flex items-center justify-between py-4">
                <h1 className="font-display text-2xl md:text-3xl">My Works</h1>
                
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => onTabChange('works')}
                    className={`px-4 py-2 rounded-md transition-all duration-200 text-sm ${
                      activeTab === 'works'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    My Works
                  </button>
                  <button
                    onClick={() => onTabChange('videos')}
                    className={`px-4 py-2 rounded-md transition-all duration-200 text-sm ${
                      activeTab === 'videos'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Project Videos
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="container py-8">
              <AnimatePresence mode="wait">
                {activeTab === 'works' && (
                  <motion.div
                    key="works"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                        className="rounded-xl overflow-hidden border border-border bg-card/60"
                      >
                        <div className="aspect-video w-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center text-muted-foreground">
                          <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {work.category}
                            </span>
                          </div>
                          <h2 className="font-semibold text-lg">{work.title}</h2>
                          <p className="text-sm text-muted-foreground">{work.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'videos' && (
                  <motion.div
                    key="videos"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                        className="rounded-xl overflow-hidden border border-border bg-card/60"
                      >
                        <div className="relative aspect-video w-full bg-gradient-to-br from-zinc-800 to-zinc-700">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h2 className="font-semibold text-lg">{video.title}</h2>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyWorksSection;