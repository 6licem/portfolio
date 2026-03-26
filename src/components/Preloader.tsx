import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';

const Preloader = () => {
  const [stage, setStage] = useState<'loading' | 'fading' | 'hidden'>('loading');

  useEffect(() => {
    // Wait for minimum time for the cinematic feel to finish
    const timer = setTimeout(() => {
      setStage('fading');
    }, 2000);

    const removeTimer = setTimeout(() => {
      setStage('hidden');
      // Re-enable scrolling when preloader finishes
      document.body.style.overflow = '';
    }, 2800);

    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out ${stage === 'fading' ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Massive native CSS blur nodes rendering directly behind the logo (Matched from Hero) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-[1400px] h-[300px] lg:h-[800px] bg-yellow-500/20 blur-[60px] lg:blur-[180px] rounded-[100%] pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] lg:w-[1000px] h-[200px] lg:h-[600px] bg-orange-500/20 blur-[40px] lg:blur-[120px] rounded-[100%] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        {/* The image itself */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-yellow-400/40 shadow-2xl" style={{ boxShadow: '0 0 50px rgba(251,191,36,0.3)' }}>
          <img 
            src={Logo} 
            alt="Rance Coon" 
            className="w-full h-full object-cover scale-110" // Scales slightly so face fills loader
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-yellow-400/10"></div>
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30"></div>
        </div>

        {/* Branding & Loading Bar */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center z-10 text-center">
            <h1 className="text-white text-xl sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Rance Coon
            </h1>
            <p className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-xs sm:text-[13px] font-bold tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-6" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }}>
              Creative Operations Consultant
            </p>
            {/* Circle Loader */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 mt-2">
                <div className="absolute inset-0 rounded-full border-2 border-stone-800/80"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-400 border-r-orange-500 animate-spin" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
