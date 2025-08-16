import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5 // Reduced from 0.6 to match other transitions
      }}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const StaggeredContent: React.FC<StaggeredContentProps> = ({ 
  children, 
  className = '', 
  delay = 0.9 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};