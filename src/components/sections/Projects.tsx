import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Project = {
  id: number;
  title: string;
  category: 'Web' | '3D' | 'UI';
  blurb: string;
};

const categories = ['All', 'Web', '3D', 'UI'] as const;

const data: Project[] = [
  { id: 1, title: 'Neon SaaS Dashboard', category: 'Web', blurb: 'Premium analytics dashboard with motion & glassmorphism.' },
  { id: 2, title: 'Galaxy Explorer', category: '3D', blurb: 'R3F scene with interactive particles and space vibes.' },
  { id: 3, title: 'Brand UI Kit', category: 'UI', blurb: 'Design system with tokens, components, and motion.' },
  { id: 4, title: 'Wave Studio', category: '3D', blurb: 'Shader-based wave backgrounds with performance focus.' },
  { id: 5, title: 'Commerce Glow', category: 'Web', blurb: 'High‑conversion storefront with smooth micro‑interactions.' },
  { id: 6, title: 'UI Motion Pack', category: 'UI', blurb: 'Reusable motion patterns and transitions for apps.' },
];

const Projects = () => {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const filtered = useMemo(() => (active === 'All' ? data : data.filter(p => p.category === active)), [active]);

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl mb-8"
        >
          Projects
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-colors border',
                active === cat
                  ? 'bg-accent/20 text-primary border-accent/40'
                  : 'bg-secondary/30 text-muted-foreground hover:bg-secondary border-border'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <TiltCard key={p.id} index={i}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full text-left">
                    <article className="glass rounded-xl p-5 min-h-[180px]">
                      <div className="text-xs text-muted-foreground">{p.category}</div>
                      <h3 className="mt-2 font-medium text-lg">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                      <div className="mt-4 text-sm opacity-70">Click for details</div>
                    </article>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{p.title}</DialogTitle>
                    <DialogDescription>
                      {p.blurb} – Built with performance, accessibility, and motion best practices.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground">
                    Category: {p.category}
                  </div>
                </DialogContent>
              </Dialog>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  function onMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8; // tilt strength
    const ry = (px - 0.5) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function onLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="will-change-transform"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default Projects;
