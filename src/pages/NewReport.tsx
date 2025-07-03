// src/pages/NewReport.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import TemplateTab, { TemplateKey } from "@/components/NewReport/TemplateTab";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

import DetailsTab1, {
  DetailsData as DetailsData1,
} from "@/components/NewReport/template1/DetailsTab";
import ImagesTab1 from "@/components/NewReport/template1/ImagesTab";
import GenerateTab1 from "@/components/NewReport/template1/GenerateTab";
import { useTemplate1ReportGenerator } from "@/components/NewReport/template1/ReportGenerator";

import DetailsTab2, {
  DetailsData as DetailsData2,
} from "@/components/NewReport/template2/DetailsTab";
import ImagesTab2 from "@/components/NewReport/template2/ImagesTab";
import GenerateTab2 from "@/components/NewReport/template2/GenerateTab";
import { useTemplate2ReportGenerator } from "@/components/NewReport/template2/ReportGenerator";

import DetailsTab3, {
  DetailsData as DetailsData3,
} from "@/components/NewReport/template3/DetailsTab";
import ImagesTab3 from "@/components/NewReport/template3/ImagesTab";
import GenerateTab3 from "@/components/NewReport/template3/GenerateTab";
import { useTemplate3ReportGenerator } from "@/components/NewReport/template3/ReportGenerator";

import { ClipboardList, ImagePlus, Sparkles } from "lucide-react";

type SubTab = "details" | "images" | "generate";

const TEMPLATE_NAMES: Record<TemplateKey, string> = {
  template1: "VERSA",
  template2: "PROtect",
  template3: "PROSERVE",
};

const NewReport: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Step 1: selected template
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | "">(
    ""
  );

  // Step 2: active sub-tab
  const [activeTab, setActiveTab] = useState<SubTab>("details");
  const navigateToTab = (tab: SubTab) => setActiveTab(tab);

  // Reset on page navigation
  useEffect(() => {
    setSelectedTemplate("");
    setActiveTab("details");
  }, [location.key]);

  // Shared image state
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const MAX_IMAGES = 13;

  const handleImageUpload = (files: FileList) => {
    if (uploadedImages.length + files.length > MAX_IMAGES) {
      toast.error(`Up to ${MAX_IMAGES} images only`);
      return;
    }
    const arr = Array.from(files);
    setUploadedImages((p) => [...p, ...arr]);
    setCaptions((p) => [...p, ...arr.map(() => "")]);
  };
  const removeImage = (i: number) => {
    setUploadedImages((p) => p.filter((_, idx) => idx !== i));
    setCaptions((p) => p.filter((_, idx) => idx !== i));
  };
  const setCaptionHandler = (i: number, text: string) =>
    setCaptions((p) => p.map((c, idx) => (idx === i ? text : c)));

  // Template 1 details state
  const [detailsData1, setDetailsData1] = useState<DetailsData1>({
    inspectionDate: undefined,
    company: "",
    unit: "",
    location: "",
    circuitId: "",
    lineNumbers: "",
    pipeSpecification: "",
    description: "",
    serviceType: "",
    pipeMaterial: "",
    designCode: "ASME B31.3",
    class: "",
    pId: "",
    workOrder: "",
    nextInspectionDate: undefined,
    typeOfInspection: "External",
    nextUTInspDate: undefined,
    locationAccess: "",
    route: "",
    insulationStatus: "",
    coatingStatus: "",
    findings: "",
  });

  // Template 2 details state
  const [detailsData2, setDetailsData2] = useState<DetailsData2>({
    clientName: "",
    facilitySite: "",
    systemId: "",
    pipeClass: "",
    pIdNo: "",
    inspectedBy: "",
    certNo: "",
    inspectionDate: undefined,
    nextInspectionDate: undefined,
    inspectionSummary: "",
    accessMethods: "",
    surfaceConditions: "",
    pipeSpecification: "",
    service: "",
    estimatedFootage: "",
    psv: "",
    primaryDiameter: "",
    setPressure: "",
  });

  // Template 3 details state
  const [detailsData3, setDetailsData3] = useState<DetailsData3>({
    unit: "",
    site: "",
    inspectionDate: undefined,
    service: "",
    lineNumber: "",
    inspector: "",
    spec: "",
    signatures: "",
    inspectionSummary: "",
    external: "",
    evidenceOfLeaks: "",
    vibration: "",
    alignment: "",
    corrosion: "",
    flangeConnection: "",
    gasketSealant: "",
    bolting: "",
    coating: "",
    mechanicalDamage: "",
    insulationJacketing: "",
    evidenceOfCUI: "",
    valves: "",
    supports: "",
    inspectionFinding: "",
    correctiveAction: "",
  });

  // Always call all three hooks for stable ordering
  const template1Gen = useTemplate1ReportGenerator({
    detailsData: detailsData1,
    uploadedImages,
    captions,
  });
  const template2Gen = useTemplate2ReportGenerator({
    detailsData: detailsData2,
    uploadedImages,
    captions,
  });
  const template3Gen = useTemplate3ReportGenerator({
    detailsData: detailsData3,
    uploadedImages,
    captions,
  });

  // Stub for any un-implemented template
  const stubGen = {
    isReportGenerated: false,
    generationProgress: 0,
    bannerState: "hidden" as any,
    handleGenerateReport: async () => toast.error("Not implemented"),
    handleViewReport: () => toast.error("Not implemented"),
    handleFeedback: (_: boolean) => {},
  };

  // Select active generator
  const {
    isReportGenerated,
    generationProgress,
    bannerState,
    handleGenerateReport,
    handleViewReport,
    handleFeedback,
  } =
    selectedTemplate === "template1"
      ? template1Gen
      : selectedTemplate === "template2"
      ? template2Gen
      : selectedTemplate === "template3"
      ? template3Gen
      : stubGen;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col w-full">
        <DashboardHeader user={user!} />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <header className="mb-4">
              <h1 className="text-2xl font-bold">Create New Inspection Report</h1>
              <p className="text-gray-500">
                {selectedTemplate
                  ? `Using ${TEMPLATE_NAMES[selectedTemplate]}`
                  : "Select a template to begin"}
              </p>
            </header>

            {!selectedTemplate ? (
              <TemplateTab
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(tpl) => {
                  setSelectedTemplate(tpl);
                  setActiveTab("details");
                }}
              />
            ) : (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-0"
              >
                <div className="bg-white rounded-t p-4 border-b shadow-sm">
                  <TabsList className="bg-gray-50 rounded-md w-full">
                    <TabsTrigger value="details" className="flex-1">
                      <ClipboardList className="mr-2 inline h-4 w-4" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex-1">
                      <ImagePlus className="mr-2 inline h-4 w-4" />
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="generate" className="flex-1">
                      <Sparkles className="mr-2 inline h-4 w-4" />
                      Generate
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="details">
                  {selectedTemplate === "template1" && (
                    <DetailsTab1
                      detailsData={detailsData1}
                      setDetailsData={setDetailsData1}
                      navigateToTab={navigateToTab}
                    />
                  )}
                  {selectedTemplate === "template2" && (
                    <DetailsTab2
                      detailsData={detailsData2}
                      setDetailsData={setDetailsData2}
                      navigateToTab={navigateToTab}
                    />
                  )}
                  {selectedTemplate === "template3" && (
                    <DetailsTab3
                      detailsData={detailsData3}
                      setDetailsData={setDetailsData3}
                      navigateToTab={navigateToTab}
                    />
                  )}
                </TabsContent>

                <TabsContent value="images">
                  {selectedTemplate === "template1" && (
                    <ImagesTab1
                      uploadedImages={uploadedImages}
                      captions={captions}
                      setCaption={setCaptionHandler}
                      handleImageUpload={handleImageUpload}
                      removeImage={removeImage}
                      navigateToTab={navigateToTab}
                      MAX_IMAGES={MAX_IMAGES}
                    />
                  )}
                  {selectedTemplate === "template2" && (
                    <ImagesTab2
                      uploadedImages={uploadedImages}
                      captions={captions}
                      setCaption={setCaptionHandler}
                      handleImageUpload={handleImageUpload}
                      removeImage={removeImage}
                      navigateToTab={navigateToTab}
                      MAX_IMAGES={MAX_IMAGES}
                    />
                  )}
                  {selectedTemplate === "template3" && (
                    <ImagesTab3
                      uploadedImages={uploadedImages}
                      captions={captions}
                      setCaption={setCaptionHandler}
                      handleImageUpload={handleImageUpload}
                      removeImage={removeImage}
                      navigateToTab={navigateToTab}
                      MAX_IMAGES={MAX_IMAGES}
                    />
                  )}
                </TabsContent>

                <TabsContent value="generate">
                  {selectedTemplate === "template1" && (
                    <GenerateTab1
                      uploadedImages={uploadedImages}
                      MAX_IMAGES={MAX_IMAGES}
                      statuses={{
                        details: true,
                        images: uploadedImages.length > 0,
                        template: true,
                      }}
                      isGenerating={bannerState === "progress"}
                      generationProgress={generationProgress}
                      isReportGenerated={isReportGenerated}
                      handleGenerateReport={handleGenerateReport}
                      handleEditReport={handleViewReport}
                      handleDownloadEdited={() => toast.error("Not implemented")}
                      handleFeedback={handleFeedback}
                      navigateToTab={navigateToTab}
                    />
                  )}
                  {selectedTemplate === "template2" && (
                    <GenerateTab2
                      uploadedImages={uploadedImages}
                      MAX_IMAGES={MAX_IMAGES}
                      statuses={{
                        details: true,
                        images: uploadedImages.length > 0,
                        template: true,
                      }}
                      isGenerating={bannerState === "progress"}
                      generationProgress={generationProgress}
                      isReportGenerated={isReportGenerated}
                      handleGenerateReport={handleGenerateReport}
                      handleEditReport={handleViewReport}
                      handleDownloadEdited={() => toast.error("Not implemented")}
                      handleFeedback={handleFeedback}
                      navigateToTab={navigateToTab}
                    />
                  )}
                  {selectedTemplate === "template3" && (
                    <GenerateTab3
                      uploadedImages={uploadedImages}
                      MAX_IMAGES={MAX_IMAGES}
                      statuses={{
                        details: true,
                        images: uploadedImages.length > 0,
                        template: true,
                      }}
                      isGenerating={bannerState === "progress"}
                      generationProgress={generationProgress}
                      isReportGenerated={isReportGenerated}
                      handleGenerateReport={handleGenerateReport}
                      handleEditReport={handleViewReport}
                      handleDownloadEdited={() => toast.error("Not implemented")}
                      handleFeedback={handleFeedback}
                      navigateToTab={navigateToTab}
                    />
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReport;
