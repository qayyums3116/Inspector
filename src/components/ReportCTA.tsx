// src/components/ReportCTA.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const ReportCTA: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const startPath = user?.token ? "/signin" : "/signin";

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
            Ready to generate reports faster and more accurately?
          </h2>
          <Button
            className="w-full sm:w-auto bg-inspectoriq-blue hover:bg-blue-600 text-white font-medium py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg flex items-center justify-center mx-auto"
            onClick={() => navigate(startPath)}
          >
            <FileText className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            <span>Start a New Report</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReportCTA;
