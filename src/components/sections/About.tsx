import { motion, useMotionValue, useTransform } from 'framer-motion';
import avatar from '@/assets/avatar-portrait.jpg';
import { LampContainer } from '@/components/ui/lamp';
import { PixelCanvas } from '@/components/ui/pixel-canvas';
const About = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  return <section id="about" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30" style={{
        background: 'var(--gradient-primary)'
      }} />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20" style={{
        background: 'var(--gradient-primary)'
      }} />
      </div>

      <div className="container grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Interactive avatar */}
        <motion.div className="relative" onMouseMove={e => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }} onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}>
          <motion.div style={{
          rotateX,
          rotateY
        }} className="glass rounded-xl p-2 will-change-transform">
            <img src={avatar} alt="Futuristic developer portrait" className="rounded-lg w-full h-auto object-cover" loading="lazy" />
          </motion.div>
        </motion.div>

        {/* Right: Heading, description, lamp and single education card */}
        <div className="relative">
          <div className="pointer-events-none absolute right-0 -top-48 w-full max-w-[28rem]">
            <LampContainer className="!min-h-0 h-56 rounded-full opacity-70" />
          </div>

          <motion.h2 initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: '-100px'
        }} transition={{
          duration: 0.5
        }} className="font-display text-3xl md:text-4xl mb-4">
            About Me
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.05
        }} className="text-muted-foreground leading-relaxed">
            I specialize in crafting premium, interactive web experiences that feel fast and alive. From 3D scenes to refined UI systems, I blend aesthetics with performance to deliver delightful products.
          </motion.p>

          {/* Single education card with always-on PixelCanvas effect */}
          <motion.div initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="mt-6">
            <div style={{
            ['--active-color' as any]: '#0ea5e9'
          }} className="group relative overflow-hidden border border-border p-6 md:p-8 bg-card/60 backdrop-blur-sm rounded-3xl">
              <PixelCanvas gap={10} speed={25} colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]} variant="icon" noFocus autoplay />
              <div className="relative z-10 space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Education</p>
                <h3 className="text-lg md:text-xl font-semibold">B.Tech in Computer Science and Engineering w/s in Cyber Security</h3>
                <p className="text-muted-foreground">S.R.M University</p>
                <p className="text-muted-foreground">2021 - 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;