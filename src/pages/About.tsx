
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackButton from "@/components/FeedbackButton";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-inspectoriq-blue text-center">About InspectorIQ</h1>
          
          <div className="prose max-w-3xl mx-auto text-left">
            <p className="mb-6">
              InspectorIQ was created by API inspectors who know firsthand how demanding fieldwork can be—especially when long hours in the field are followed by even longer hours writing reports. Our mission is to streamline the inspection process by reducing report writing time by up to 80%, giving you more time to focus on conducting thorough inspection and identifying critical issues.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Vision</h2>
            <p className="mb-6">
              We believe technology should empower inspectors, not replace us. By automating tedious reports, we make our workday more productive and satisfying—allowing us to concentrate on using our expertise where it counts.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Join Us</h2>
            <p className="mb-6">
              InspectorIQ is in its early stages. We need your feedback to make it better. Have ideas for features or improvements? Let us know - your input directly shapes our development.
            </p>
            
            <div className="flex justify-center">
              <FeedbackButton variant="large" source="about">
                Help Us Build a Better InspectorIQ
              </FeedbackButton>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
