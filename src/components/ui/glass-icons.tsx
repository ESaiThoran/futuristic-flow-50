import React from "react";

// Interfaces
export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

// Gradient mapping
const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
  pink: "linear-gradient(hsl(333, 90%, 55%), hsl(318, 90%, 55%))",
  teal: "linear-gradient(hsl(173, 80%, 40%), hsl(158, 80%, 40%))",
  cyan: "linear-gradient(hsl(193, 90%, 45%), hsl(188, 90%, 45%))",
  yellow: "linear-gradient(hsl(53, 95%, 55%), hsl(48, 95%, 55%))",
  rose: "linear-gradient(hsl(3, 85%, 60%), hsl(348, 85%, 60%))",
  violet: "linear-gradient(hsl(263, 90%, 55%), hsl(248, 90%, 55%))",
  lime: "linear-gradient(hsl(83, 90%, 45%), hsl(78, 90%, 45%))",
  amber: "linear-gradient(hsl(43, 98%, 55%), hsl(38, 98%, 55%))",
};

// Component definition
export const Component = ({ items, className }: GlassIconsProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isSequencing, setIsSequencing] = React.useState(false);

  React.useEffect(() => {
    if (!isSequencing) return;
    
    let currentIndex = 0;
    setActiveIndex(0);
    
    const interval = setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= items.length) {
        clearInterval(interval);
        // Keep all icons active after sequence completes
        setActiveIndex(-1); // -1 means all active
      } else {
        setActiveIndex(currentIndex);
      }
    }, 80); // 80ms delay between each icon
    
    return () => clearInterval(interval);
  }, [isSequencing, items.length]);

  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  const isIconActive = (index: number): boolean => {
    if (!isSequencing) return false;
    return activeIndex === -1 || index <= (activeIndex ?? -1);
  };

  return (
    <div
      className={`grid gap-8 grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 mx-auto py-8 overflow-visible ${
        className || ""
      }`}
      onMouseEnter={() => setIsSequencing(true)}
      onMouseLeave={() => {
        setIsSequencing(false);
        setActiveIndex(null);
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          className={`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
            item.customClass || ""
          }`}
        >
          {/* Back layer */}
          <span
            className={`absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-200 ease-out origin-[100%_100%] rotate-[15deg] ${
              isIconActive(index) ? '[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]' : ''
            }`}
            style={{
              ...getBackgroundStyle(item.color),
              boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
            }}
          ></span>

          {/* Front layer */}
          <span
            className={`absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-200 ease-out origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform ${
              isIconActive(index) ? '[transform:translateZ(2em)]' : ''
            }`}
            style={{
              boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <span
              className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center"
              aria-hidden="true"
            >
              {item.icon}
            </span>
          </span>

          {/* Label */}
          <span className={`absolute top-full left-0 right-0 text-center whitespace-pre-line leading-[1.4] text-base transition-[opacity,transform] duration-200 ease-out translate-y-0 ${
            isIconActive(index) ? 'opacity-100 [transform:translateY(20%)]' : 'opacity-0'
          }`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Component;