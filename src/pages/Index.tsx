import { useState, createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import MyExperience from '@/components/sections/MyExperience';
import MyStack from '@/components/sections/MyStack';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import MyWorksInline from '@/components/sections/MyWorksInline';
import GlassMorphismOverlay from '@/components/ui/glass-morphism-overlay';

// Transition phases
type TransitionPhase = 'idle' | 'overlay' | 'background' | 'content' | 'closing';

// Create context for MyWorks visibility
interface MyWorksContextType {
  showMyWorks: (tab?: 'works' | 'videos', videoId?: number) => void;
}

const MyWorksContext = createContext<MyWorksContextType | undefined>(undefined);

export const useMyWorks = () => {
  const context = useContext(MyWorksContext);
  if (!context) {
    throw new Error('useMyWorks must be used within MyWorksProvider');
  }
  return context;
};

const Index = () => {
  const [myWorksVisible, setMyWorksVisible] = useState(false);
  const [myWorksTab, setMyWorksTab] = useState<'works' | 'videos'>('works');
  const [myWorksVideoId, setMyWorksVideoId] = useState<number | undefined>(undefined);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Cleanup body scroll lock and padding on component unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, []);

  const showMyWorks = useCallback((tab: 'works' | 'videos' = 'works', videoId?: number) => {
    setMyWorksTab(tab);
    setMyWorksVideoId(videoId);
    
    // Prevent body scroll when My Works section is active
    // Add padding to prevent layout shift when scrollbar disappears
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply styles to html element as well to prevent any jerking
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    
    // Start the transition sequence
    setTransitionPhase('overlay');
    setOverlayVisible(true);
  }, []);

  const handleOverlayComplete = () => {
    // After overlay completes, show the MyWorks component and start content transition
    setMyWorksVisible(true);
    setTransitionPhase('content');
  };

  const handleBackgroundComplete = () => {
    // This function is no longer needed as we transition directly to content
    // after overlay completes
  };

  const hideMyWorks = () => {
    setTransitionPhase('closing');
    
    // Start closing sequence - content slides down first
    setTimeout(() => {
      setMyWorksVisible(false);
      setMyWorksVideoId(undefined);
      
      // Then hide overlay after content is gone
      setTimeout(() => {
        setOverlayVisible(false);
        setTransitionPhase('idle');
        // Restore body scroll and reset padding when My Works section is closed
        document.documentElement.style.overflow = 'unset';
        document.documentElement.style.paddingRight = '0px';
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
      }, 500); // Reduced from 600 to match other transitions
    }, 200); // Reduced from 300 for snappier response
  };

  const contextValue = useMemo(() => ({
    showMyWorks
  }), [showMyWorks]);

  return (
    <MyWorksContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary scroll-smooth">
        <NavBar />
        <main>
          <Hero />
          <MyExperience />
          <MyStack />
          <Projects />
          <Certifications />
          <Contact />
          
          {/* MyWorks Inline Section */}
          <div id="my-works-section">
            <MyWorksInline 
              isVisible={myWorksVisible}
              onClose={hideMyWorks}
              initialTab={myWorksTab}
              initialVideoId={myWorksVideoId}
              transitionPhase={transitionPhase}
              onBackgroundComplete={handleBackgroundComplete}
            />
          </div>
        </main>
        <footer className="py-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sai Thoran All rights reserved.
        </footer>
        
        {/* Glass Morphism Overlay */}
        <GlassMorphismOverlay 
          isVisible={overlayVisible} 
          onComplete={handleOverlayComplete}
        />
      </div>
    </MyWorksContext.Provider>
  );
};

export default Index;
