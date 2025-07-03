
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-inspectoriq-blue text-center">Terms of Service</h1>
          <div className="prose max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              Welcome to InspectorIQ. These Terms of Service ("Terms") govern your use of the InspectorIQ platform. By using our service, you agree to these Terms. If you don't agree, please don't use InspectorIQ.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Definitions</h2>
            <p className="mb-4">
              "InspectorIQ," "we," "us," and "our" refer to InspectorIQ<br />
              "You" refers to the person or company using InspectorIQ<br />
              "Content" means information, images, or other materials you upload to InspectorIQ<br />
              "Service" means all InspectorIQ applications and features
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Account Registration</h2>
            <p className="mb-4">
              You agree to provide accurate information when registering and to keep this information updated. You're responsible for keeping your password safe and for all activity under your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Acceptable Use</h2>
            <p className="mb-4">
              You may only use InspectorIQ for lawful inspection and reporting purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Break any laws</li>
              <li>Send spam</li>
              <li>Pretend to be someone else</li>
              <li>Interfere with the service</li>
              <li>Upload harmful content</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Content</h2>
            <p className="mb-4">
              You keep ownership of all content you upload to InspectorIQ. By uploading content, you give us permission to use it to provide and improve our service.
            </p>
            <p className="mb-4">
              You confirm you have the right to upload any content you provide.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Intellectual Property</h2>
            <p className="mb-4">
              InspectorIQ and its content belong to us. You may not copy or use our branding without permission.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Data Analysis</h2>
            <p className="mb-4">
              We may analyze anonymized data to improve our AI systems and service quality. Your specific inspection data remains private as outlined in our Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. No Warranty</h2>
            <p className="mb-4">
              InspectorIQ is provided "as is" without warranties. We don't guarantee the service will always be available or error-free.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Limitation of Liability</h2>
            <p className="mb-4">
              InspectorIQ is not liable for indirect damages, including lost profits or data loss, related to your use of our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Indemnification</h2>
            <p className="mb-4">
              You agree to protect InspectorIQ from claims related to your use of the service or violation of these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">11. Changes to Terms</h2>
            <p className="mb-4">
              We may update these Terms. For major changes, we'll provide at least 30 days' notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">12. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by Texas state law.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">13. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, contact us at:<br />
              InspectorIQ<br />
              15500 Voss Road, Suite 506<br />
              Sugar Land, TX 77498<br />
              Email: legal@inspectoriq.com
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">14. Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your account if you violate these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">15. Complete Agreement</h2>
            <p className="mb-4">
              These Terms represent the complete agreement between you and InspectorIQ regarding our service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
