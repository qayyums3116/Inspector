// src/components/NewReport/template3/ReportGenerator.tsx
import { useState, useRef } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DetailsData3 } from "./DetailsTab";

interface ReportGeneratorParams {
  detailsData: DetailsData3;
  uploadedImages: File[];
  captions: string[];
}

type BannerState = "hidden" | "progress" | "success";

export function useTemplate3ReportGenerator({
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

  // simulate progress 0→90%
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
      toast.error("Please upload at least one image");
      return;
    }

    setBannerState("progress");
    startSimulatedProgress();

    const formData = new FormData();
    // only the fields we collect; backend will default the rest
    formData.append("unit", detailsData.unit);
    formData.append("site", detailsData.site);
    formData.append("location", detailsData.site);
    formData.append(
      "inspectionDate",
      detailsData.inspectionDate
        ? format(detailsData.inspectionDate, "MM-dd-yyyy")
        : ""
    );
    formData.append("serviceType", detailsData.service);
    formData.append("lineNumbers", detailsData.lineNumber);
    formData.append("inspector", detailsData.inspector);
    formData.append("pipeSpecification", detailsData.spec);
    formData.append("signatures", detailsData.inspector);
    formData.append("description", detailsData.spec);
    formData.append("circuitId", detailsData.circuitId);
 

    // images + captions
    captions.forEach((txt, i) =>
      formData.append(`captions[${i}]`, txt || `Image ${i + 1}`)
    );
    uploadedImages.forEach((file, i) =>
      formData.append(`images[${i}]`, file)
    );

    try {
      const res = await fetch(
        "http://3.128.160.75:8000/api/pro-surve/",
        {
          method: "POST",
          headers: { Authorization: `Token ${user.token}` },
          body: formData,
        }
      );
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();

      stopSimulatedProgress();
      setGenerationProgress(100);
      setBannerState("success");
      setIsReportGenerated(true);
      setTimeout(() => setBannerState("hidden"), 3000);

      // save + auto-download
      const url = data.s3_url as string;
      localStorage.setItem("generatedReport", url);
      sessionStorage.setItem("generatedReport", url);
      localStorage.setItem("viewReportUrl", url);
      sessionStorage.setItem("viewReportUrl", url);
      if (data.id) {
        localStorage.setItem("editingReportId", String(data.id));
        sessionStorage.setItem("editingReportId", String(data.id));
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = "PROtect_External_Piping_Report.docx";
      a.click();
    } catch (err) {
      stopSimulatedProgress();
      setBannerState("hidden");
      toast.error("Failed to generate report");
      console.error(err);
    }
  };

  const handleViewReport = () => {
    const url =
      localStorage.getItem("viewReportUrl") ||
      sessionStorage.getItem("viewReportUrl");
    if (!url) {
      toast.error("No generated report available");
      return;
    }
    const editId = localStorage.getItem("editingReportId");
    if (editId) sessionStorage.setItem("editingReportId", editId);
    window.open("/report-editor", "_blank");
  };

  const handleFeedback = (ok: boolean) =>
    ok ? toast.success("Thank you!") : toast.info("Will improve!");

  return {
    isReportGenerated,
    generationProgress,
    bannerState,
    handleGenerateReport,
    handleViewReport,
    handleFeedback,
  };
}
