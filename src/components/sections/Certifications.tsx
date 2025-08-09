import { useEffect, useState } from 'react';
import certificate from '@/assets/certificate-hero.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';

const items = [certificate, certificate, certificate, certificate];

const Certifications = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      try { api.scrollNext(); } catch {}
    }, 3000);
    return () => clearInterval(id);
  }, [api]);

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
          Certifications
        </motion.h2>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {items.map((src, idx) => (
              <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="glass rounded-xl overflow-hidden">
                    <img
                      src={src}
                      alt={`Certificate ${idx + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Certifications;
