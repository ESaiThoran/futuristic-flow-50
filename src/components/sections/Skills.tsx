import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'React & TypeScript', level: 92 },
  { name: 'Framer Motion', level: 88 },
  { name: 'Three.js / R3F', level: 80 },
  { name: 'CSS Architecture', level: 90 },
  { name: 'Performance', level: 86 },
  { name: 'Design Systems', level: 84 },
];

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl mb-8"
        >
          Skills
        </motion.h2>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <motion.article
              key={s.name}
              className="glass rounded-xl p-5 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div className="font-medium mb-3">{s.name}</div>
              <Progress value={inView ? s.level : 0} className="h-2" />
              <div className="mt-2 text-xs text-muted-foreground">{s.level}%</div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-10" style={{ background: 'var(--gradient-primary)' }} />
      </div>
    </section>
  );
};

export default Skills;
