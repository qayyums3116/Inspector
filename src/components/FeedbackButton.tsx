
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedbackModal from "./FeedbackModal";
import { Link } from "react-router-dom";

interface FeedbackButtonProps {
  variant?: "floating" | "standard" | "large";
  source?: "homepage" | "dashboard" | "about" | "contact";
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FeedbackButton = ({ 
  variant = "standard",
  source = "homepage",
  className = "",
  children,
  asChild = false,
  open,
  onOpenChange
}: FeedbackButtonProps) => {
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  
  // Determine if we should use controlled or uncontrolled state
  const isModalOpen = open !== undefined ? open : internalIsModalOpen;
  const setIsModalOpen = onOpenChange !== undefined ? onOpenChange : setInternalIsModalOpen;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (variant === "floating") {
    return (
      <>
        <button 
          className={`feedback-button ${className}`} 
          aria-label="Give Feedback"
          onClick={handleOpenModal}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="hidden md:inline">Feedback</span>
        </button>
        <FeedbackModal 
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
          source={source}
        />
      </>
    );
  }

  if (asChild) {
    return (
      <>
        <div onClick={handleOpenModal}>{children}</div>
        <FeedbackModal 
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
          source={source}
        />
      </>
    );
  }

  return (
    <>
      <Button 
        onClick={handleOpenModal}
        className={`bg-inspectoriq-blue hover:bg-blue-600 text-white ${variant === "large" ? "text-lg py-6" : ""} ${className}`}
        size={variant === "large" ? "lg" : "default"}
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        {children || "Give Feedback"}
      </Button>
      <FeedbackModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        source={source}
      />
    </>
  );
};

export default FeedbackButton;
