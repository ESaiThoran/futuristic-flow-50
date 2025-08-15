import React from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type RainbowButtonProps = {
  wrapperClassName?: string;
};

export const Button = ({ wrapperClassName = '' }: RainbowButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-center py-24 ${wrapperClassName}`}>
      <div className="rainbow-border-wrapper">
        <button onClick={() => navigate('/my-works?tab=works')} className="relative w-[400px] h-12 flex items-center justify-center px-6 bg-black rounded-xl border-none text-white cursor-pointer font-black transition-all duration-300 z-10 group overflow-hidden">
          <span className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 whitespace-nowrap group-hover:translate-x-full group-hover:opacity-0 flex items-center gap-2"># Check out MY WORKS<IoArrowForward className="text-xl" /></span>
          <IoArrowForward className="absolute left-0 -translate-x-full opacity-0 text-xl transition-all duration-300 delay-200 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100" />
        </button>
      </div>
      
      <style>{`
        .rainbow-border-wrapper {
          position: relative;
          padding: 2px;
          border-radius: 12px;
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000);
          background-size: 300%;
          animation: rainbow 3s linear infinite;
        }
        .rainbow-border-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000);
          background-size: 300%;
          animation: rainbow 3s linear infinite;
          filter: blur(15px);
          opacity: 0.6;
          z-index: -1;
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};
