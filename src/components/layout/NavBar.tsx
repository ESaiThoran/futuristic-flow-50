import GradientMenu from '@/components/ui/gradient-menu';

const NavBar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="container flex items-center justify-center py-4">
        <GradientMenu />
      </div>
    </nav>
  );
};

export default NavBar;
