import { useState, useRef } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DetailsData2 } from "./DetailsTab";

interface ReportGeneratorParams {
  detailsData: DetailsData2;
  uploadedImages: File[];
  captions: string[];
}

type BannerState = "hidden" | "progress" | "success";

export function useTemplate2ReportGenerator({
  detailsData,
  uploadedImages,
  captions,
}: ReportGeneratorParams) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [bannerState, setBannerState] = useState<BannerState>("hidden");
  const progressIntervalRef = useRef<number | null>(null);

  const startSimulatedProgress = () => {
    setGenerationProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = window.setInterval(() => {
      setGenerationProgress((p) => (p < 90 ? p + 1 : p));
    }, 200);
  };

  const stopSimulatedProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleGenerateReport = async () => {
    if (!user?.token) {
      toast.error("Session expired. Please sign in again.");
      navigate("/signin", { replace: true });
      return;
    }
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setBannerState("progress");
    startSimulatedProgress();

    const formData = new FormData();
    // Core fields
    formData.append("clientName", detailsData.clientName);
    formData.append("facilitySite", detailsData.facilitySite);
    formData.append("systemId", detailsData.systemId);
    formData.append("pipeClass", detailsData.pipeClass);
    formData.append("pIdNo", detailsData.pIdNo);
    formData.append("inspectedBy", detailsData.inspectedBy);
    formData.append("certNo", detailsData.certNo);
    formData.append(
      "inspectionDate",
      detailsData.inspectionDate ? format(detailsData.inspectionDate, "MM-dd-yyyy") : ""
    );
    formData.append(
      "nextInspectionDate",
      detailsData.nextInspectionDate ? format(detailsData.nextInspectionDate, "MM-dd-yyyy") : ""
    );
    formData.append("circuitId", detailsData.circuitId);
    formData.append("findings", detailsData.findings);
    // Send only the selected values (not arrays) for accessMethods and surfaceConditions
    formData.append("accessMethods", detailsData.accessMethods);
    formData.append("surfaceConditions", detailsData.surfaceConditions);

    // Additional piping fields
    formData.append("pipeSpecification", detailsData.pipeSpecification);
    formData.append("service", detailsData.service);
    formData.append("estimatedFootage", detailsData.estimatedFootage);
    formData.append("psv", detailsData.psv);
    formData.append("primaryDiameter", detailsData.primaryDiameter);
    formData.append("setPressure", detailsData.setPressure);

    // Image captions & files
    captions.forEach((txt, i) => formData.append(`captions[${i}]`, txt || `Image ${i + 1}`));
    uploadedImages.forEach((file, i) => formData.append(`images[${i}]`, file));

    try {
      const res = await fetch("http://3.128.160.75:8000/api/protect-piping/", {
        method: "POST",
        headers: { Authorization: `Token ${user.token}` },
        body: formData,
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();

      stopSimulatedProgress();
      setGenerationProgress(100);
      setBannerState("success");
      setIsReportGenerated(true);
      setTimeout(() => setBannerState("hidden"), 3000);

      const url = data.s3_url as string;
      localStorage.setItem("generatedReport", url);
      sessionStorage.setItem("generatedReport", url);
      localStorage.setItem("viewReportUrl", url);
      sessionStorage.setItem("viewReportUrl", url);
      if (data.id) {
        localStorage.setItem("editingReportId", String(data.id));
        sessionStorage.setItem("editingReportId", String(data.id));
      }

      const dl = document.createElement("a");
      dl.href = url;
      dl.download = "PROSURVE_External_Piping_Report.docx";
      dl.click();
    } catch (err) {
      stopSimulatedProgress();
      setBannerState("hidden");
      toast.error("Failed to generate report");
      console.error(err);
    }
  };

  const handleViewReport = () => {
    const url = localStorage.getItem("viewReportUrl") || sessionStorage.getItem("viewReportUrl");
    if (!url) {
      toast.error("No generated report available to view.");
      return;
    }
    const editId = localStorage.getItem("editingReportId");
    if (editId) {
      sessionStorage.setItem("editingReportId", editId);
    }
    window.open("/report-editor", "_blank");
  };

  return {
    isReportGenerated,
    generationProgress,
    bannerState,
    handleGenerateReport,
    handleViewReport,
  };
}
