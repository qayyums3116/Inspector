// src/components/NewReport/template1/ReportGenerator.tsx
import { useState, useRef } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DetailsData } from "./DetailsTab";

interface ReportGeneratorParams {
  detailsData: DetailsData;
  uploadedImages: File[];
  captions: string[];
}

type BannerState = "hidden" | "progress" | "success";

export function useTemplate1ReportGenerator({
  detailsData,
  uploadedImages,
  captions,
}: ReportGeneratorParams) {
  const MAX_IMAGES = 13;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [bannerState, setBannerState] = useState<BannerState>("hidden");
  const progressIntervalRef = useRef<number | null>(null);

  // Simulate progress from 0 → 90%
  const startSimulatedProgress = () => {
    setGenerationProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = window.setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev < 90) return prev + 1;
        clearInterval(progressIntervalRef.current!);
        return prev;
      });
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

    // Build form data exactly as before
    const formData = new FormData();
    formData.append("unit", detailsData.unit);
    formData.append(
      "inspectionDate",
      detailsData.inspectionDate
        ? format(detailsData.inspectionDate, "MM-dd-yyyy")
        : ""
    );
    formData.append("company", detailsData.company);
    formData.append("location", detailsData.location);
    formData.append("class", detailsData.class);
    formData.append("circuitId", detailsData.circuitId);
    formData.append("description", detailsData.description);
    formData.append("designCode", detailsData.designCode);
    formData.append("pipeSpecification", detailsData.pipeSpecification);
    formData.append("workOrder", detailsData.workOrder);
    formData.append("pId", detailsData.pId);
    formData.append(
      "nextInspectionDate",
      detailsData.nextInspectionDate
        ? format(detailsData.nextInspectionDate, "MM-dd-yyyy")
        : ""
    );
    formData.append("typeOfInspection", detailsData.typeOfInspection);
    formData.append(
      "nextUtInspectionDate",
      detailsData.nextUTInspDate
        ? format(detailsData.nextUTInspDate, "MM-dd-yyyy")
        : ""
    );
    formData.append("lineNumbers", detailsData.lineNumbers);
    formData.append("serviceType", detailsData.serviceType);
    formData.append("pipeMaterial", detailsData.pipeMaterial);
    formData.append("route", detailsData.route);
    formData.append("insulationStatus", detailsData.insulationStatus);
    formData.append("coatingStatus", detailsData.coatingStatus);
    formData.append("findings", detailsData.findings);

    captions.forEach((txt, i) =>
      formData.append(`captions[${i}]`, txt || `Image ${i + 1}`)
    );
    uploadedImages.forEach((file, i) =>
      formData.append(`images[${i}]`, file)
    );

    try {
      const res = await fetch(
        "http://3.128.160.75:8000/api/generate-report/",
        {
          method: "POST",
          headers: { Authorization: `Token ${user.token}` },
          body: formData,
        }
      );
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();

      // Finish progress → success
      stopSimulatedProgress();
      setGenerationProgress(100);
      setBannerState("success");
      setIsReportGenerated(true);
      setTimeout(() => setBannerState("hidden"), 3000);

      // Persist & auto-download
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
      dl.download = "Inspection_Report.docx";
      dl.click();
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
      toast.error("No generated report available to view.");
      return;
    }
    const editId = localStorage.getItem("editingReportId");
    if (editId) {
      sessionStorage.setItem("editingReportId", editId);
    }
    window.open("/report-editor", "_blank");
  };

  const handleFeedback = (ok: boolean) =>
    ok ? toast.success("Thank you!") : toast.info("Will improve!");

  return {
    // state
    isReportGenerated,
    generationProgress,
    bannerState,

    // actions
    handleGenerateReport,
    handleViewReport,
    handleFeedback,
  };
}
