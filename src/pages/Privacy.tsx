
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-inspectoriq-blue text-center">Privacy Policy</h1>
          
          <div className="prose max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              InspectorIQ respects your privacy. This policy explains how we collect and use information when you use our platform. If you don't agree with this policy, please don't use InspectorIQ.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Personal Information</h3>
            <p className="mb-4">
              When you register or contact us, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Phone number</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Inspection Data</h3>
            <p className="mb-4">
              When using InspectorIQ, you may upload:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Equipment photographs</li>
              <li>Inspection findings</li>
              <li>Equipment details</li>
              <li>Location information</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4 mb-2">2.3 Usage Information</h3>
            <p className="mb-4">
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Features used</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and improve our service</li>
              <li>Process transactions</li>
              <li>Send necessary communications</li>
              <li>Respond to your requests</li>
              <li>Offer customer support</li>
              <li>Understand how people use our service</li>
              <li>Train our AI to better detect defects and apply codes</li>
              <li>Prevent fraud</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Retention</h2>
            <p className="mb-4">
              We keep your information only as long as necessary. Inspection data is retained while your account is active unless you request deletion.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Information Sharing</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">5.1 Service Providers</h3>
            <p className="mb-4">
              We may share information with contractors who help provide our service.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">5.2 Business Transfers</h3>
            <p className="mb-4">
              If our company is sold, your information may be transferred as part of that transaction.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">5.3 Legal Requirements</h3>
            <p className="mb-4">
              We may share information when required by law.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">5.4 With Permission</h3>
            <p className="mb-4">
              We may share information with your consent.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Data Security</h2>
            <p className="mb-4">
              We use industry-standard security measures to protect your information. However, no online service is 100% secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have rights to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Restrict how we use your information</li>
              <li>Transfer your information</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact info@inspectoriq.com.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Children's Privacy</h2>
            <p className="mb-4">
              InspectorIQ is not for children under 13, and we don't knowingly collect information from them.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Policy Updates</h2>
            <p className="mb-4">
              We may update this policy occasionally. We'll post updates on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this policy, contact us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
