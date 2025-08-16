import GradientMenu from '@/components/ui/gradient-menu';
import { motion } from 'framer-motion';
import { useMyWorks } from '@/pages/Index';

const NavBar = () => {
  const { showMyWorks } = useMyWorks();

  return (
    <nav className="fixed top-0 inset-x-0 z-30">
      <div className="container flex items-center justify-center py-4">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.60, duration: 0.6, ease: 'easeOut' }}
          className="origin-center px-6 py-2 rounded-2xl will-change-transform"
          style={{
            transformOrigin: '50% 50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        >
          <GradientMenu />
        </motion.div>
      </div>
    </nav>
  );
};

export default NavBar;
