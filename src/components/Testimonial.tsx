// src/components/Testimonial.tsx
import React from "react";
import { QuoteIcon } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-inspectoriq-gray">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6">
            <QuoteIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-inspectoriq-blue" />
          </div>
          <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-12 italic text-center">
            “InspectorIQ has revolutionized our inspection process. The AI-powered report
            generation saves us hours on each inspection report.”
          </blockquote>
          <div className="text-center">
            <p className="font-semibold text-sm sm:text-base md:text-lg">
              Jon Rodriguez
            </p>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Senior Inspector, Global Energy Corp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
