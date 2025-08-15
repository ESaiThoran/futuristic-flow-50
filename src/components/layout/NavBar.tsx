import GradientMenu from '@/components/ui/gradient-menu';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="container flex items-center justify-center py-4">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.60, duration: 0.6, ease: 'easeOut' }}
          className="origin-center backdrop-blur-xl bg-white/80 dark:bg-black/20 border border-white/20 dark:border-white/40 rounded-2xl shadow-xl px-6 py-2"
          style={{ transformOrigin: '50% 50%' }}
        >
          <GradientMenu />
        </motion.div>
      </div>
    </nav>
  );
};

export default NavBar;
