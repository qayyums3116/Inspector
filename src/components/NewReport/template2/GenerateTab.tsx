// src/components/NewReport/template2/GenerateTab.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Loader,
  Sparkles,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  AlertTriangle,
  Edit,
  ThumbsUp,
  RefreshCw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GenerateTab2Props {
  uploadedImages: File[];
  MAX_IMAGES: number;
  statuses: { details: boolean; images: boolean; template: boolean };
  isGenerating: boolean;
  generationProgress: number;
  isReportGenerated: boolean;
  handleGenerateReport: () => Promise<void>;
  handleEditReport: () => void;
  handleDownloadEdited: () => Promise<void> | void;
  handleFeedback: (isPositive: boolean) => void;
  navigateToTab: (tab: "details" | "images") => void;
}

const GenerateTab2: React.FC<GenerateTab2Props> = ({
  uploadedImages,
  MAX_IMAGES,
  statuses,
  isGenerating,
  generationProgress,
  isReportGenerated,
  handleGenerateReport,
  handleEditReport,
  handleDownloadEdited,
  handleFeedback,
  navigateToTab,
}) => {
  return (
    <div className="bg-white rounded-b-md p-6 shadow-sm">
      {!isReportGenerated ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-inspectoriq-blue mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Generate Your Report</h3>
            <p className="text-gray-500 mb-6">
              Review details and generate your final report
            </p>
          </div>

          {/* Status Panel */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-medium text-lg mb-4">Report Status</h4>
            <div className="space-y-4">
              {/* Details */}
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Report Details</span>
                </div>
                {statuses.details ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </div>
              {/* Images */}
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Inspection Images</span>
                </div>
                {statuses.images ? (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {uploadedImages.length} of {MAX_IMAGES}
                    </span>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </div>
              {/* Template */}
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center">
                  <LayoutTemplate className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Report Template</span>
                </div>
                {statuses.template ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </div>
            </div>
          </div>

          {/* Generate Button / Spinner */}
          {isGenerating ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-2">
                <Loader className="h-6 w-6 text-inspectoriq-blue animate-spin mr-2" />
                <span className="text-inspectoriq-blue font-medium">
                  Generating PROtect Report... {generationProgress}%
                </span>
              </div>
              <Progress value={generationProgress} className="w-full h-2" />
              <p className="text-sm text-gray-500">
                Please wait while we process your data and generate your report..
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50 px-8"
                onClick={handleGenerateReport}
                disabled={!Object.values(statuses).every(Boolean)}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Report
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Success */}
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              Report Generated Successfully!
            </h3>
            <p className="text-gray-500 mb-6">
              Your PROtect report is ready.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center py-6 border-2 hover:bg-blue-50 transition"
              onClick={handleEditReport}
            >
              <Edit className="h-5 w-5 mr-2" />
              View Report
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center py-6 border-2 hover:bg-blue-50 transition"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Generate Another Report
            </Button>
          </div>

          {/* Feedback */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h4 className="font-medium mb-3">How was your experience?</h4>
            <p className="text-gray-500 text-sm mb-4">
              Your feedback helps us improve.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleFeedback(true)}
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Great!
              </Button>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50"
                onClick={() => handleFeedback(false)}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Needs Improvement
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateTab2;
