import React from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-silver pt-16 md:pt-24 pb-12 px-6 md:px-12 rounded-t-[2rem] md:rounded-t-[4rem] relative z-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 md:w-1/3">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Terminal size={20} md={{size: 24}} className="text-matrix group-hover:animate-pulse" />
            <span className="font-sans font-bold text-xl md:text-2xl tracking-tight text-white">Initex</span>
          </div>
          <p className="font-mono text-xs md:text-sm text-silver/50 leading-relaxed">
            The hyper-utility explicit backend scaffolding CLI. No magic. Just mechanics. Built for engineers.
          </p>
          <div className="flex items-center gap-2 md:gap-3 font-data text-[10px] md:text-xs mt-2 md:mt-4">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-matrix animate-pulse shadow-[0_0_10px_#00FF41]"></span>
            <span className="uppercase tracking-widest text-matrix">System Operational</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:w-1/2 md:justify-end font-mono text-xs md:text-sm">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="font-bold text-silver mb-1 md:mb-2 font-sans tracking-tight">Navigation</span>
            <a href="#features" className="text-silver/50 hover:text-matrix transition-colors">Features</a>
            <a href="#philosophy" className="text-silver/50 hover:text-matrix transition-colors">Philosophy</a>
            <a href="#protocol" className="text-silver/50 hover:text-matrix transition-colors">Protocol</a>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="font-bold text-silver mb-1 md:mb-2 font-sans tracking-tight">Resources</span>
            <a href="#" className="text-silver/50 hover:text-matrix transition-colors">Documentation</a>
            <a href="#" className="text-silver/50 hover:text-matrix transition-colors">GitHub Repo</a>
            <a href="#" className="text-silver/50 hover:text-matrix transition-colors">NPM Package</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-silver/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-silver/40 text-center md:text-left">
        <span>&copy; {new Date().getFullYear()} Initex CLI. All rights reserved.</span>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-silver">Privacy Policy</a>
          <a href="#" className="hover:text-silver">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
