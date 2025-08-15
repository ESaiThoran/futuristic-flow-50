import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/sections/Hero';
import MyExperience from '@/components/sections/MyExperience';
import MyStack from '@/components/sections/MyStack';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary scroll-smooth">
      <NavBar />
      <main>
        <Hero />
        <MyExperience />
        <MyStack />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <footer className="py-12 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sai Thoran All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
