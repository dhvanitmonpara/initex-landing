import React from "react";
import MagneticButton from "./MagneticButton";
import { Terminal } from "lucide-react";

export default function GetStarted() {
  return (
    <section className="py-24 md:py-48 px-4 md:px-6 w-full flex flex-col justify-center items-center relative overflow-hidden border-t border-silver/5">
      <div className="absolute inset-0 bg-carbon bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-matrix/5 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        <Terminal size={48} className="text-matrix mb-6 md:mb-8 md:w-12 md:h-12 w-10 h-10" />
        <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-silver tracking-tighter mb-4 md:mb-6">
          Initialize <span className="font-data italic font-light text-matrix tracking-widest flex flex-col sm:inline-block">System.</span>
        </h2>
        <p className="font-mono text-silver/60 mb-8 md:mb-12 text-sm md:text-base">
          Run the sequence. Scaffold your infrastructure in seconds. No account required.
        </p>
        
        <div className="bg-[#050505] border border-silver/10 rounded-2xl p-3 md:p-4 flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-sm shrink-0">
          <span className="text-matrix font-data text-lg md:text-xl shrink-0">{'>'}</span>
          <span className="font-data text-silver text-base md:text-xl tracking-wide truncate">npx initex</span>
        </div>
        
        <MagneticButton onClick={() => window.open("https://npmjs.com/package/initex", "_blank")} variant="primary" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 shadow-[0_0_30px_rgba(0,255,65,0.2)] w-full sm:w-auto">
          Read the Docs
        </MagneticButton>
      </div>
    </section>
  );
}
