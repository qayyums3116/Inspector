import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import NewReport from "./pages/NewReport";
import Reports from "./pages/Reports";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import ReportEditor from "./pages/ReportEditor";  // <-- Import your new ReportEditor component

const queryClient = new QueryClient();

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  useEffect(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response: any) => {
          console.log("Encoded JWT ID token:", response.credential);
          // handle login credential here, e.g., send to backend for verification
        },
      });
      window.google.accounts.id.prompt(); // show One Tap or sign-in prompt
    } else {
      console.error("Google Identity Services not loaded");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />       {/* your custom toaster */}
        <Sonner />       {/* sonner toaster */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Authentication */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected / App pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-report" element={<NewReport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={<Settings />} />

            {/* Report Editor route */}
            <Route path="/report-editor" element={<ReportEditor />} />

            {/* Public pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
