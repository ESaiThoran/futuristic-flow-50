import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransitionProvider, usePageTransition } from "@/contexts/PageTransitionContext";
import Index from "./pages/Index";
import MyWorks from "./pages/MyWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isTransitioning, transitionDirection } = usePageTransition();
  
  return (
    <div className="relative">
      {/* Base Routes - Always rendered */}
      <Routes location="/" key="base">
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Index />} />
      </Routes>

      {/* Glassmorphism Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed inset-0 z-[9998] backdrop-blur-xl border-t border-white/10"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Overlay Routes - Slide over base */}
      <AnimatePresence mode="wait">
        {location.pathname !== '/' && (
          <motion.div
            key={location.pathname}
            initial={{ y: '100%' }}
            animate={{ 
              y: 0,
              transition: { 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6 
              }
            }}
            exit={{ 
              y: '100%',
              transition: { 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }
            }}
            className="fixed inset-0 z-[9999] bg-background"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/my-works" element={<MyWorks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransitionProvider>
          <AnimatedRoutes />
        </PageTransitionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
