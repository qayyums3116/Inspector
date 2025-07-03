import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: "homepage" | "dashboard" | "about" | "contact";
}

const FeedbackModal = ({ open, onOpenChange, source = "homepage" }: FeedbackModalProps) => {
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [importance, setImportance] = useState<number>(50);
  const [issueLocation, setIssueLocation] = useState<string>("");
  const [impact, setImpact] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [keepUpdated, setKeepUpdated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (source === "dashboard") {
      setFeedbackType("feature");
    } else if (source === "about") {
      setFeedbackType("general");
    }
  }, [source]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.token) {
      toast.error("You must be signed in to submit feedback.");
      return;
    }

    const payload = {
      email: "inspectoriq2@gmail.com", // always send to this email
      message: `
        Feedback Type: ${feedbackType}
        Importance: ${feedbackType === "feature" ? importance : "N/A"}
        Issue Location: ${feedbackType === "bug" ? issueLocation : "N/A"}
        Impact: ${feedbackType === "bug" ? impact : "N/A"}
        Details: ${details}
        Keep Updated: ${keepUpdated}
        Source: ${source}
        Path: ${location.pathname}
        User Email (if kept updated): ${keepUpdated ? email : "Not provided"}
      `
    };

    try {
      const res = await fetch("http://3.128.160.75:8000/api/send-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to send feedback.");
      }

      setSubmitted(true);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping improve InspectorIQ!",
        duration: 5000,
      });

      setTimeout(() => {
        setSubmitted(false);
        setFeedbackType("");
        setImportance(50);
        setIssueLocation("");
        setImpact("");
        setDetails("");
        setKeepUpdated(false);
        setEmail("");
        onOpenChange(false);
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Failed to send feedback.");
      console.error(err);
    }
  };

  const getPlaceholderText = () => {
    switch (feedbackType) {
      case "feature":
        return "Describe the problem this feature would solve and how it would help your workflow...";
      case "bug":
        return "Please include any steps to reproduce the issue and what you expected to happen...";
      case "usability":
        return "Tell us what was difficult or confusing, and how you think it could be improved...";
      default:
        return "Please describe your idea, issue, or feedback in detail...";
    }
  };

  const getIcon = () => {
    return <MessageSquare className="h-5 w-5 text-inspectoriq-blue" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-inspectoriq-blue flex items-center gap-2">
                Help Us Build a Better InspectorIQ
              </DialogTitle>
              <DialogDescription>
                Your feedback directly shapes our development
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback-type" className="text-base font-medium">
                    What type of feedback do you have?
                  </Label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">
                        Feature suggestion
                      </SelectItem>
                      <SelectItem value="bug">
                        Bug report
                      </SelectItem>
                      <SelectItem value="usability">Usability issue</SelectItem>
                      <SelectItem value="general">General feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {feedbackType === "feature" && (
                  <div className="space-y-2">
                    <Label htmlFor="importance" className="text-base font-medium">
                      How important is this feature to your workflow?
                    </Label>
                    <div className="pt-4">
                      <Slider
                        id="importance"
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        onValueChange={(value) => setImportance(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1 text-sm text-gray-500">
                        <span>Nice to have</span>
                        <span>Critical</span>
                      </div>
                    </div>
                  </div>
                )}

                {feedbackType === "bug" && (
                  <>
                    <div>
                      <Label htmlFor="issue-location" className="text-base font-medium">
                        Where did you encounter this issue?
                      </Label>
                      <Select value={issueLocation} onValueChange={setIssueLocation}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="report">Report generation</SelectItem>
                          <SelectItem value="upload">Image upload</SelectItem>
                          <SelectItem value="other">Other (please specify)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="impact" className="text-base font-medium">
                        How does this impact your work?
                      </Label>
                      <Select value={impact} onValueChange={setImpact}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select impact" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minor">Minor inconvenience</SelectItem>
                          <SelectItem value="slows">Slows me down</SelectItem>
                          <SelectItem value="prevents">Prevents completion</SelectItem>
                          <SelectItem value="errors">Causes errors in output</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="details" className="text-base font-medium flex items-center gap-2">
                    {getIcon()}
                    <span>Tell us more</span>
                  </Label>
                  <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={getPlaceholderText()}
                    className="w-full mt-1 p-2 min-h-[120px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-inspectoriq-blue"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="keep-updated" 
                    checked={keepUpdated}
                    onCheckedChange={(checked) => {
                      setKeepUpdated(checked as boolean);
                    }} 
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="keep-updated"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me updated on this feedback
                    </Label>
                  </div>
                </div>

                {keepUpdated && (
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required={keepUpdated}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between items-center pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-inspectoriq-blue hover:bg-blue-600">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="bg-green-100 text-green-800 rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Thank you for helping improve InspectorIQ!</h3>
            <p className="text-gray-600">Your feedback has been received and will be reviewed by our team.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
