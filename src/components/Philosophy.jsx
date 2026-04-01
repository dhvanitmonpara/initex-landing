"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(".bg-image", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
      });

      // Word reveal
      gsap.from(".reveal-word", {
        scrollTrigger: {
          trigger: ".philosophy-text",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const renderText = (text, className) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-1">
        <span className={`reveal-word inline-block ${className}`}>{word}</span>
      </span>
    ));
  };

  return (
    <section id="philosophy" ref={comp} className="relative w-full py-48 bg-carbon overflow-hidden flex items-center justify-center">
      <div 
        className="bg-image absolute inset-0 -top-24 z-0 bg-cover bg-center opacity-10 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 flex flex-col gap-8 md:gap-12 philosophy-text">
        <div className="text-lg md:text-3xl font-sans text-silver/40 max-w-2xl font-medium tracking-tight">
          {renderText("Most backend tools focus on: hidden abstractions and opaque workflows.", "")}
        </div>
        <div className="text-3xl sm:text-4xl md:text-7xl font-sans font-bold text-silver max-w-4xl tracking-tighter leading-[1.1]">
          {renderText("We focus on: ", "")}
          <span className="font-data italic font-light text-matrix tracking-widest">{renderText("explicit configuration.", "")}</span>
        </div>
      </div>
    </section>
  );
}
