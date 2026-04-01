"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, Cpu, HardDrive } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    num: "01",
    title: "Scaffold",
    desc: "Generate the foundational Express architecture instantly. Run the CLI and bypass boilerplate setup.",
    icon: <Settings size={24} className="text-matrix" />,
    Visual: () => (
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48 animate-[spin_10s_linear_infinite] opacity-50">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00FF41" strokeWidth="2" strokeDasharray="10 5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#E0E0E0" strokeWidth="1" />
        </svg>
      </div>
    )
  },
  {
    num: "02",
    title: "Configure",
    desc: "Define your runtime, database strategy, and authentication methods. Either via prompts or a YAML preset.",
    icon: <Cpu size={24} className="text-matrix" />,
    Visual: () => (
      <div className="w-full h-full flex flex-col justify-center gap-4 px-12 relative overflow-hidden">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="h-2 w-full bg-silver/10 rounded-full overflow-hidden relative"></div>
        ))}
        <div className="absolute top-0 bottom-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-matrix/40 to-transparent flex items-center justify-center animate-[scan_3s_linear_infinite] blur-md pointer-events-none transform -translate-y-1/2"></div>
      </div>
    )
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Take complete ownership of the generated monolithic architecture without lock-in. Compile. Run. Ship.",
    icon: <HardDrive size={24} className="text-matrix" />,
    Visual: () => (
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-64 h-32 opacity-80">
          <path 
            className="stroke-matrix stroke-2 fill-none animate-[pulse_2s_ease-in-out_infinite]"
            d="M 10 50 L 40 50 L 50 20 L 60 80 L 70 50 L 100 50 L 110 30 L 120 70 L 130 50 L 190 50" 
          />
        </svg>
      </div>
    )
  }
];

export default function Protocol() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card");

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.2,
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top center",
            end: "top top",
            scrub: true,
          }
        });
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={comp} className="relative w-full bg-lead py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center mb-32">
        <h2 className="font-sans font-bold text-4xl text-silver tracking-tight">The Protocol</h2>
        <p className="font-mono text-silver/50 mt-4 max-w-xl text-center text-sm">A systematic approach to backend engineering.</p>
      </div>

      <div className="w-full flex flex-col items-center pb-48">
        {STAGES.map((stage, idx) => (
          <div 
            key={idx} 
            className="protocol-card sticky top-24 md:top-32 w-full max-w-5xl md:h-[60vh] h-auto min-h-[500px] bg-carbon rounded-[2rem] md:rounded-[3rem] border border-silver/10 shadow-2xl flex flex-col md:flex-row overflow-hidden mb-6 md:mb-12 origin-top"
          >
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-silver/10">
              <div className="font-data text-matrix text-5xl md:text-6xl mb-6 opacity-50">{stage.num}</div>
              <div className="mb-4 md:mb-6">{stage.icon}</div>
              <h3 className="font-sans font-bold text-2xl md:text-3xl text-silver mb-3 md:mb-4">{stage.title}</h3>
              <p className="font-mono text-silver/60 text-base md:text-lg leading-relaxed">{stage.desc}</p>
            </div>
            
            {/* Right Visual */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#050505] flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-matrix to-transparent mix-blend-overlay"></div>
              <stage.Visual />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
