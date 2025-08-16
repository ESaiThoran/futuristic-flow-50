import { motion } from 'framer-motion';
import { BentoDemo } from '@/components/sections/demo';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl mb-8"
        >
          Certifications ⤵
        </motion.h2>

        <BentoDemo />
      </div>
    </section>
  );
};

export default Certifications;
