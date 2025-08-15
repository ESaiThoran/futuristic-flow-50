import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import MyExperience from '@/components/sections/MyExperience';
import MyStack from '@/components/sections/MyStack';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import MyWorksSection from '@/components/sections/MyWorksSection';
import { useState } from 'react';

const Index = () => {
  const [showMyWorks, setShowMyWorks] = useState(false);
  const [activeWorksTab, setActiveWorksTab] = useState('works');
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  const handleShowMyWorks = (tab: string = 'works', videoId?: number) => {
    setActiveWorksTab(tab);
    setSelectedVideoId(videoId || null);
    setShowMyWorks(true);
  };

  const handleCloseMyWorks = () => {
    setShowMyWorks(false);
    setSelectedVideoId(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary scroll-smooth">
      <NavBar />
      <main>
        <Hero onShowMyWorks={handleShowMyWorks} />
        <MyExperience onShowMyWorks={handleShowMyWorks} />
        <MyStack />
        <Projects onShowMyWorks={handleShowMyWorks} />
        <Certifications />
        <Contact />
      </main>
      <MyWorksSection 
        isOpen={showMyWorks}
        onClose={handleCloseMyWorks}
        activeTab={activeWorksTab}
        selectedVideoId={selectedVideoId}
        onTabChange={setActiveWorksTab}
      />
      <footer className="py-12 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sai Thoran All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
