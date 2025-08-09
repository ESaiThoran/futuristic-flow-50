import { ButtonHTMLAttributes, forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(({ className, children, onMouseMove, ...props }, ref) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
    // Magnetic translation
    const moveX = (x - rect.width / 2) * 0.06;
    const moveY = (y - rect.height / 2) * 0.06;
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    onMouseMove?.(e);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={(node) => {
        btnRef.current = node;
        if (typeof ref === 'function') ref(node as HTMLButtonElement);
        else if (ref) (ref as any).current = node;
      }}
      className={cn(
        'magnetic-btn px-6 py-3 font-display text-lg tracking-wide',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'relative isolate',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -z-0 opacity-60"
        style={{
          background: 'var(--gradient-primary)'
        }}
      />
    </button>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
