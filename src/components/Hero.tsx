// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const { user } = useAuth();
  // if we have a token, go to /new-report; otherwise force /signin
  const startPath = user?.token ? "/new-report" : "/signin";

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-inspectoriq-gray">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
            Simplify Your API Inspection Workflow
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
            Upload photos, fill details, generate professional reports in minutes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="w-full sm:w-auto bg-inspectoriq-blue hover:bg-blue-600 text-white py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg"
            >
              <Link to={startPath}>Start a New Report</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-inspectoriq-blue text-inspectoriq-blue hover:bg-inspectoriq-blue/10 py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg flex justify-center"
            >
              <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              <span>Watch Demo</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
