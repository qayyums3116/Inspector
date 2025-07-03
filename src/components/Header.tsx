// src/components/Header.tsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loggedIn = pathname.startsWith("/dashboard");

  const handleSignOut = () => {
    // TODO: clear real auth tokens here
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/lovable-uploads/ffecffb1-2389-4496-a62f-74d3a0c40b1a.png"
            alt="InspectorIQ Logo"
            className="h-6 sm:h-8 md:h-10"
          />
        </Link>

        {/* Nav / Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {loggedIn ? (
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              className="text-gray-700 hover:text-inspectoriq-blue text-sm sm:text-base"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                className="text-gray-700 hover:text-inspectoriq-blue text-sm sm:text-base"
                asChild
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                className="bg-inspectoriq-blue text-white hover:bg-blue-600 text-sm sm:text-base"
                asChild
              >
                <Link to="/signup">
                  {isMobile ? "Sign Up" : "Get Started"}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
