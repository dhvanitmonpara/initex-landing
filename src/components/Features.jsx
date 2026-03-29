import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Database, Key, Server, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Sub-component: Diagnostic Shuffler Card
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Runtime Fixed", icon: <Cpu size={16} /> },
    { id: 2, title: "Auth Pre-wired", icon: <Key size={16} /> },
    { id: 3, title: "DB Connected", icon: <Database size={16} /> },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-lead border border-silver/10 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      <div>
        <h3 className="font-sans font-bold text-xl text-silver mb-2">Opinionated Backend in Minutes</h3>
        <p className="font-mono text-sm text-silver/60">Scaffold a production-ready Express backend with runtime, database, auth, cache, and tooling decisions handled upfront.</p>
      </div>
      
      <div className="relative h-48 w-full flex justify-center items-end pb-4">
        {cards.map((card, idx) => {
          const isTop = idx === 0;
          return (
            <div 
              key={card.id}
              className={`absolute w-4/5 p-4 rounded-xl border flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
              style={{
                zIndex: 10 - idx,
                transform: `translateY(-${idx * 16}px) scale(${1 - idx * 0.05})`,
                opacity: 1 - idx * 0.3,
                backgroundColor: isTop ? "#080808" : "#1A1A1A",
                borderColor: isTop ? "#00FF4150" : "rgba(224, 224, 224, 0.1)",
                color: isTop ? "#00FF41" : "#E0E0E0"
              }}
            >
              {card.icon}
              <span className="font-data text-sm">{card.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Sub-component: Telemetry Typewriter Card
const TelemetryTypewriter = () => {
  const [text, setText] = useState("");
  const fullText = "SAVE preset.yaml\\nINJECT config -> initex.js\\nDEPLOY target [production]\\nSUCCESS.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => { i = 0; setInterval(); }, 5000); // simplify loop
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-lead border border-silver/10 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between shadow-2xl">
      <div>
        <h3 className="font-sans font-bold text-xl text-silver mb-2">Reusable Infrastructure Presets</h3>
        <p className="font-mono text-sm text-silver/60">Save your backend configuration as JSON or YAML presets and reuse the same setup across projects.</p>
      </div>
      
      <div className="bg-carbon border border-silver/10 rounded-xl p-4 h-48 relative font-data text-xs text-matrix leading-relaxed">
        <div className="absolute top-2 right-4 flex items-center gap-2 text-[10px] text-silver/40 px-2 py-1 rounded bg-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live Feed
        </div>
        <div className="mt-6 whitespace-pre-wrap">
          {text}
          <span className="animate-pulse bg-matrix w-2 h-[1em] inline-block ml-1 align-middle"></span>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Cursor Protocol Scheduler
const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(".cursor-svg", { x: 20, y: 150 })
        .to(".cursor-svg", { x: 140, y: 60, duration: 1, ease: "power2.inOut" })
        .to(".cursor-svg", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .set(".cell-active", { backgroundColor: "#00FF41", color: "#080808" })
        .to(".cursor-svg", { x: 250, y: 140, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(".cursor-svg", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .set(".btn-save", { backgroundColor: "#00FF41", color: "#080808" })
        .to(".cursor-svg", { opacity: 0, duration: 0.3, delay: 0.5 })
        .set(".cell-active, .btn-save", { clearProps: "all" })
        .set(".cursor-svg", { opacity: 1, x: 20, y: 150 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-lead border border-silver/10 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
      <div>
        <h3 className="font-sans font-bold text-xl text-silver mb-2">Explicit Configuration, No Magic</h3>
        <p className="font-mono text-sm text-silver/60">No hidden abstractions or surprise behavior. Everything generated is clear, visible, and in your control.</p>
      </div>
      
      <div className="h-48 w-full border border-silver/10 rounded-xl bg-carbon p-4 relative">
        <div className="grid grid-cols-7 gap-1 font-data text-[10px] text-center mb-4 text-silver/40">
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
          {Array.from({length: 14}).map((_, i) => (
            <div key={i} className={`h-8 rounded-[4px] border border-white/5 flex items-center justify-center ${i === 10 ? 'cell-active' : ''} transition-colors`}>
              {i+1}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 btn-save px-4 py-1.5 rounded-full border border-silver/20 text-xs font-data transition-colors">
          Configure
        </div>
        
        {/* Animated Cursor */}
        <div className="cursor-svg absolute w-5 h-5 z-20" style={{ pointerEvents: 'none' }}>
           <svg viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" className="drop-shadow-md">
             <path d="M5 2l11 11h-5l5 7-3 2-5-7-4 4z" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><DiagnosticShuffler /></div>
        <div className="feature-card"><TelemetryTypewriter /></div>
        <div className="feature-card"><CursorProtocolScheduler /></div>
      </div>
    </section>
  );
}
