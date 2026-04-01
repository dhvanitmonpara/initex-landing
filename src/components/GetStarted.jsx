"use client";

import { Terminal } from "lucide-react";
import { useState } from "react";
import MagneticButton from "./MagneticButton";

export default function GetStarted() {
  const [copied, setCopied] = useState(false);

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
        <div className="relative group w-full max-w-sm mb-6 md:mb-8">
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx initex@latest myapp");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="bg-[#050505] cursor-pointer hover:bg-matrix/10 hover:border-matrix/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300 border border-silver/10 rounded-2xl p-3 md:p-4 flex items-center justify-center gap-3 md:gap-4 w-full shrink-0 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix/5 to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full" />
            <span className="text-matrix font-data text-lg md:text-xl shrink-0">{'>'}</span>
            <span className="font-data text-silver text-base md:text-xl tracking-wide truncate">npx initex</span>
          </button>

          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 pb-1.5 pt-2 bg-carbon border border-silver/10 rounded-lg text-xs font-mono text-silver/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            {copied ? <span className="text-matrix">Copied!</span> : "Copy command"}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-carbon border-b border-r border-silver/10 rotate-45" />
          </div>
        </div>

        <MagneticButton onClick={() => window.open("https://npmjs.com/package/initex", "_blank")} variant="primary" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 shadow-[0_0_30px_rgba(0,255,65,0.2)] w-full sm:w-auto">
          Read the Docs
        </MagneticButton>
      </div>
    </section>
  );
}
