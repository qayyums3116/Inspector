// src/components/HowItWorks.tsx
import React from "react";
import { ClipboardCheck, Image, Settings } from "lucide-react";

const HowItWorks = () => {
  const features = [
    {
      icon: <ClipboardCheck className="h-10 w-10 sm:h-12 sm:w-12 text-inspectoriq-blue" />,
      title: "Automated Reporting",
      description: "Quickly generate accurate and standards-compliant inspection reports.",
      delay: "animate-fade-in-delay-1",
    },
    {
      icon: <Image className="h-10 w-10 sm:h-12 sm:w-12 text-inspectoriq-blue" />,
      title: "Photo Integration",
      description: "Easily upload and tag photos to include in your reports.",
      delay: "animate-fade-in-delay-2",
    },
    {
      icon: <Settings className="h-10 w-10 sm:h-12 sm:w-12 text-inspectoriq-blue" />,
      title: "Customizable Templates",
      description: "Upload your own templates, and let the software auto-fill them seamlessly.",
      delay: "animate-fade-in-delay-3",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`
                w-full
                bg-white 
                p-4 sm:p-6 
                rounded-xl 
                border border-gray-100 
                shadow-sm 
                opacity-0 
                ${feature.delay}
              `}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
