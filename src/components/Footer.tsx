// src/components/Footer.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const links = [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/terms", label: "Terms" },
    { to: "/privacy", label: "Privacy" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-4 sm:py-6 md:py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          {/* Nav on mobile first, copy below; reversed on desktop */}
          <nav className="order-1 md:order-2 w-full md:w-auto flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4">
            {links.map((link, idx) => (
              <React.Fragment key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-600 hover:text-inspectoriq-blue transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
                >
                  {link.label}
                </Link>
                {idx < links.length - 1 && (
                  <span className="hidden md:inline-block text-gray-300">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="order-2 md:order-1 mt-4 md:mt-0 text-gray-500 text-xs sm:text-sm md:text-sm text-center md:text-left">
            © 2025 InspectorIQ. All Rights Reserved.
          </div>
        </div>
      </div>

      {isHomePage && (
        <FeedbackButton variant="floating" source="homepage" />
      )}
    </footer>
  );
};

export default Footer;
