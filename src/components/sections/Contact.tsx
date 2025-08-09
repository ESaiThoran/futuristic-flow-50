import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MagneticButton from '@/components/ui/MagneticButton';
import { toast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    if (!data.get('email') || !data.get('message')) {
      toast({ title: 'Please fill the required fields.' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.reset();
      toast({ title: 'Message sent!', description: 'Thanks for reaching out — I will reply soon.' });
    }, 900);
  }

  return (
    <section id="contact" className="py-24">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl mb-8"
        >
          Contact
        </motion.h2>

        <form onSubmit={onSubmit} className="glass rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <Input name="name" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm mb-2">Email *</label>
            <Input name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm mb-2">Message *</label>
            <Textarea name="message" placeholder="Tell me about your project..." required rows={5} />
          </div>
          <div className="pt-2 flex items-center justify-between gap-3">
            <MagneticButton disabled={loading} aria-label="Send message">
              {loading ? 'Sending…' : 'Send Message'}
            </MagneticButton>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="Email" className="hover-scale"><Mail className="h-5 w-5" /></a>
              <a href="#" aria-label="GitHub" className="hover-scale"><Github className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover-scale"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
