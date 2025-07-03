// src/pages/Index.tsx
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonial from "@/components/Testimonial";
import ReportCTA from "@/components/ReportCTA";
import Footer from "@/components/Footer";

const Index = () => {
  // 0) Remove unintended Google Identity Services script
  useEffect(() => {
    const gsi = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (gsi) {
      gsi.remove();
      console.info("Removed stray GSI script");
    }
  }, []);

  // 1) Scroll‐fade observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll<HTMLElement>(".section-fade > *")
      .forEach((el) => observer.observe(el));
    return () => {
      document
        .querySelectorAll<HTMLElement>(".section-fade > *")
        .forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Testimonial />
        <ReportCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
