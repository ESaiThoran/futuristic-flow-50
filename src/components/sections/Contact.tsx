import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MagneticButton from '@/components/ui/MagneticButton';
import { toast } from '@/hooks/use-toast';
import { PixelCanvas } from '@/components/ui/pixel-canvas';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const headline = "I'm always interested in hearing about New Opportunities and Ideas. 🧔🏻 🤝 🤔";
  const tokens = useMemo(() => headline.split(' '), [headline]);
  const tokenAnims = useMemo(
    () => tokens.map(() => ({ delay: 0.8 + Math.random() * 0.6, y: 6 + Math.random() * 10, rotate: (Math.random() - 0.5) * 6 })),
    [tokens]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    if (!data.get('entry.2072079095') || !data.get('entry.881789676')) {
      toast({ title: 'Please fill the required fields.' });
      e.preventDefault();
      return;
    }
    
    setStatus('loading');
    
    // Let the form submit to Google Forms naturally
    // The form will submit to the hidden iframe
    // We'll show UI feedback after a short delay
    
    setTimeout(() => {
      setStatus('sent');
      form.reset();
      toast({ title: 'Message sent!', description: 'Thanks for reaching out — I will reply soon.' });
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  }

  return (
    <section id="contact" className="py-24">
      <div className="container max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl mb-12 text-center"
        >
          Get in Touch 📥
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: animated headline */}
          <div className="order-1 md:order-1">
            <p className="text-xl md:text-2xl leading-relaxed text-primary/90">
              {tokens.map((word, idx) => (
                <motion.span
                  key={`${word}-${idx}`}
                  initial={{ opacity: 0, y: tokenAnims[idx].y, rotate: tokenAnims[idx].rotate }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: tokenAnims[idx].delay, ease: 'easeOut' }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Right: form card with entering background effect */}
          <div className="order-2 md:order-2">
            <motion.form
              onSubmit={onSubmit}
              action="https://docs.google.com/forms/d/e/1FAIpQLSdt4BlGBv9DlqhQZfr4BKUA1YgRjYUipiAiRZRZKw7y-54bgQ/formResponse"
              method="POST"
              target="hidden_iframe"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative overflow-hidden border border-border p-6 md:p-8 bg-card/60 backdrop-blur-sm rounded-3xl space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                aria-hidden
              >
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={['#e0f2fe', '#7dd3fc', '#0ea5e9']}
                  variant="icon"
                  noFocus
                  autoplay
                  style={{ pointerEvents: 'none' }}
                />
              </motion.div>

              <div className="relative z-10 space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-primary">Name</label>
                  <Input name="entry.1400455273" type="text" placeholder=" " required />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-primary">Email / Phone (with code) *</label>
                  <Input name="entry.2072079095" type="text" placeholder=" " required />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-primary">What's in your Mind *</label>
                  <Textarea name="entry.881789676" placeholder=" " required rows={5} />
                </div>
                <div className="pt-2 flex items-center justify-center">
                  <MagneticButton type="submit" disabled={status === 'loading'} aria-label="Send Message">
                    {status === 'loading'
                      ? 'Sending…'
                      : status === 'sent'
                      ? "Data Sent, I'll get back to U"
                      : 'Send Message'}
                  </MagneticButton>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
        <iframe name="hidden_iframe" id="hidden_iframe" className="hidden" />
      </div>
    </section>
  );
};

export default Contact;
