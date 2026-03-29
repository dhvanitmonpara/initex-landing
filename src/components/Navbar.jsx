import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import { Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 w-full pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 max-w-5xl w-full mx-auto ${
          scrolled
            ? "bg-lead/60 backdrop-blur-xl border border-silver/10 shadow-lg shadow-black/50"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center gap-2 text-silver group cursor-pointer">
          <Terminal size={20} className="text-matrix group-hover:animate-pulse" />
          <span className="font-sans font-bold text-base md:text-lg tracking-tight">Initex</span>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs lg:text-sm text-silver/70">
          {["Features", "Philosophy", "Protocol"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-matrix hover:-translate-y-[1px] transition-all">
              {item}
            </a>
          ))}
        </div>

        <MagneticButton variant="primary" className="hidden sm:flex px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm">
          npx initex
        </MagneticButton>
      </nav>
    </div>
  );
}
