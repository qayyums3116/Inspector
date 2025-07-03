
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-inspectoriq-blue text-center">Frequently Asked Questions</h1>
          
          <div className="prose max-w-3xl mx-auto text-left">
            <Accordion type="single" collapsible className="w-full faq-accordion">
              <AccordionItem value="item-1" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">What is InspectorIQ?</AccordionTrigger>
                <AccordionContent>
                  InspectorIQ helps API inspectors create inspection reports faster. Our platform reduces report writing time by up to 80%, turning hours of work into minutes.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">How does InspectorIQ work?</AccordionTrigger>
                <AccordionContent>
                  It's simple:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Upload your inspection photos</li>
                    <li>Add basic inspection details</li>
                    <li>Let our system generate a professional report</li>
                    <li>Review and finalize</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">Will InspectorIQ replace inspectors?</AccordionTrigger>
                <AccordionContent>
                  No. InspectorIQ enhances your expertise by handling tedious paperwork. You remain the expert – we just make your job easier.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">Can I use my own report templates?</AccordionTrigger>
                <AccordionContent>
                  Yes. You can upload your existing templates, and InspectorIQ will populate them with inspection data automatically.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">What formats can I export reports in?</AccordionTrigger>
                <AccordionContent>
                  Reports can be exported as PDF or Word documents, making them easy to share.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">Can I edit the generated reports?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. You have full control to edit, add information, or modify any part of the report before finalizing it.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">Is my inspection data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes. We use encryption to protect your data and follow industry security standards.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="faq-item">
                <AccordionTrigger className="faq-trigger hover:text-inspectoriq-blue transition-colors rounded-md px-3">Who owns the data I upload?</AccordionTrigger>
                <AccordionContent>
                  You do. We don't claim ownership of your inspection data or reports.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
