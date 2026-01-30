import React, { useEffect, useState } from 'react';
import { ShieldCheck, Video } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.2 seconds
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2200);

    // Complete after animation ends
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[60] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-700 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Main Container for Synchronized Animation */}
      <div className="flex flex-col items-center justify-center animate-in zoom-in fade-in duration-1000 slide-in-from-bottom-10">
        
        <div className="relative mb-6">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Icon Composition */}
          <div className="relative z-10">
            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 shadow-2xl shadow-indigo-500/20">
              <Video className="w-16 h-16 text-indigo-400" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-[#0f172a] p-1.5 rounded-full">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-full backdrop-blur-md">
                 <ShieldCheck className="w-8 h-8 text-emerald-400 animate-[pulse_3s_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name - Part of the same entrance animation now */}
        <div className="text-center space-y-3 z-10">
          <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-lg">
            TrustMarket
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-indigo-500"></div>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em]">Verified Commerce</p>
            <div className="h-px w-8 bg-indigo-500"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;