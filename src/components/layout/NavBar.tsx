import MagneticButton from '@/components/ui/MagneticButton';

const NavBar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="container flex items-center justify-between gap-4 py-4">
        <a href="#home" className="font-display text-lg text-gradient">Portfolio</a>
        <div className="glass rounded-full px-3 py-1.5 hidden md:flex items-center gap-2">
          <a href="#about" className="story-link px-3 py-1 text-sm">About</a>
          <a href="#skills" className="story-link px-3 py-1 text-sm">Skills</a>
          <a href="#projects" className="story-link px-3 py-1 text-sm">Projects</a>
          <a href="#certifications" className="story-link px-3 py-1 text-sm">Certifications</a>
          <a href="#contact" className="px-1">
            <MagneticButton className="px-4 py-1.5 text-sm">Hire Me</MagneticButton>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
