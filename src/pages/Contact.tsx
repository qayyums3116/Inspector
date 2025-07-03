
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Send } from "lucide-react";
import FeedbackButton from "@/components/FeedbackButton";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-12">
        <div className="text-center mb-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4 text-inspectoriq-blue">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're constantly improving InspectorIQ and value your input.
            Questions, suggestions, or feedback? Let us know below.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-10 max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-6">Share Your Thoughts With Us</h2>
            <FeedbackButton 
              variant="standard" 
              source="contact" 
              className="mx-auto"
            >
              <Send className="mr-2 h-4 w-4" /> Open Feedback Form
            </FeedbackButton>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-inspectoriq-blue">Company Information</h2>
          <div className="space-y-2 text-gray-600">
            <p className="font-medium">InspectorIQ</p>
            <p>15500 Voss Road, Suite 506</p>
            <p>Sugar Land, TX 77498</p>
            <p className="mt-4">For direct inquiries: <a href="mailto:info@inspectoriq.com" className="text-inspectoriq-blue hover:underline">info@inspectoriq.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
