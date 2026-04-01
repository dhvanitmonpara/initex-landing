"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DemoVideo from "../components/DemoVideo";
import Features from "../components/Features";
import Philosophy from "../components/Philosophy";
import Protocol from "../components/Protocol";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";

// Note: LocomotiveScroll or similar smooth scrolling could be added here
// For simplicity and stability with ScrollTrigger, we use native scrolling with smooth behavior

export default function App() {
  useEffect(() => {
    // Add smooth scrolling to the document
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-carbon text-silver font-sans relative selection:bg-matrix selection:text-carbon">
      <Navbar />
      <main>
        <Hero />
        <DemoVideo videoUrl="https://youtu.be/VbBP5RlmFJs" />
        <Features />
        <Philosophy />
        <Protocol />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
