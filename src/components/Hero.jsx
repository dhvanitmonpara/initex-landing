import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const comp = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="relative w-full h-[100dvh] min-h-[600px] flex items-end pb-16 md:pb-24 px-4 md:px-12 overflow-hidden">
      {/* Background Image with Heavy Overlay */}
      <div 
        className="absolute top-20 md:top-24 inset-x-0 bottom-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute top-20 md:top-24 inset-x-0 bottom-0 z-0 bg-gradient-to-t from-carbon via-carbon/80 to-transparent" />
      <div className="absolute top-20 md:top-24 inset-x-0 bottom-0 z-0 bg-carbon/40 mix-blend-multiply" />
      <div className="absolute top-20 md:top-24 inset-x-0 h-48 z-0 bg-gradient-to-b from-carbon to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:w-2/3 lg:w-1/2 gap-4 md:gap-6 items-start">
        <h1 className="flex flex-col gap-1 md:gap-2">
          <span className="hero-text font-sans font-bold text-4xl sm:text-5xl md:text-7xl tracking-tighter text-silver">
            Scaffold the
          </span>
          <span className="hero-text font-data italic font-light text-5xl sm:text-6xl md:text-8xl tracking-widest text-matrix">
            Backend Architecture.
          </span>
        </h1>
        
        <p className="hero-text font-mono text-silver/70 text-base md:text-lg max-w-md mt-2 md:mt-4 leading-relaxed">
          An opinionated CLI tool to abstract boilerplate and explicitly define your underlying system. No magic, just mechanics.
        </p>

        <div className="hero-text mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
          <MagneticButton variant="primary" className="bg-matrix text-carbon px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto">
            Scaffold Your Backend <ChevronRight size={20} className="ml-2" />
          </MagneticButton>
          <div className="flex flex-col text-[10px] md:text-xs font-data text-silver/50 uppercase tracking-widest border-l-2 border-white/10 pl-4 py-1">
            <span>System Status</span>
            <span className="text-matrix flex items-center gap-2"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-matrix animate-pulse"></span> Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
