import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className, onClick, variant = "primary" }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    
    // Magnetic hover logic
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        scale: 1.03,
        duration: 0.6,
        ease: "power3.out"
      });
      
      gsap.to(textRef.current, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const baseClasses = "relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-full font-mono text-sm font-semibold transition-colors duration-300";
  const variants = {
    primary: "bg-matrix text-carbon hover:text-carbon",
    secondary: "bg-lead text-silver border border-silver/20 hover:border-matrix/50 hover:text-matrix",
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="absolute inset-0 bg-white/20 translate-y-[101%] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"></span>
      <span ref={textRef} className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
