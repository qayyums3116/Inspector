
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-inspectoriq-gray">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-inspectoriq-blue mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/" className="bg-inspectoriq-blue hover:bg-blue-600">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
