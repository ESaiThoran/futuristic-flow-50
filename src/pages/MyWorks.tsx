import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const MyWorks = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('works');

  // Initialize tab from URL params and ensure we scroll to top on mount or tab change
  useEffect(() => {
    const tab = searchParams.get('tab') || 'works';
    setActiveTab(tab);
    // If a specific videoId is provided, scroll to that video after render
    const videoIdParam = searchParams.get('videoId');
    if (tab === 'videos' && videoIdParam) {
      const el = document.getElementById(`video-${videoIdParam}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      // Default scroll to top when navigating here or switching tabs
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Replace the current history entry to avoid backtracking through tab changes
    setSearchParams({ tab }, { replace: true });
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <main className="container pt-16 pb-16">
        <div className="flex items-center justify-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl">My Works</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="fixed top-6 right-6 z-50 flex space-x-1 bg-black/80 backdrop-blur-sm p-1 rounded-lg shadow-lg border-2 border-white">
            <button
              onClick={() => handleTabChange('works')}
              className={`px-6 py-2 rounded-md transition-all duration-200 border ${
                activeTab === 'works'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-transparent hover:bg-white hover:text-black hover:border-white'
              }`}
            >
              My Works
            </button>
            <button
              onClick={() => handleTabChange('videos')}
              className={`px-6 py-2 rounded-md transition-all duration-200 border ${
                activeTab === 'videos'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-transparent hover:bg-white hover:text-black hover:border-white'
              }`}
            >
              Project Videos
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'works' && (
          <div className="space-y-8">
            {worksData.map((work) => (
              <div key={work.id} className="rounded-xl overflow-hidden border border-border bg-card/60">
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
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-8">
            {videoData.map((video) => (
              <div id={`video-${video.id}`} key={video.id} className="rounded-xl overflow-hidden border border-border bg-card/60">
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
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Back Button */}
      <button 
        onClick={handleBack} 
        className="fixed top-6 left-6 z-50 px-4 py-2 rounded-lg border-2 border-white bg-black/80 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
      >
        <IoArrowBack className="text-lg" />
        Back
      </button>
    </div>
  );
};

export default MyWorks;
