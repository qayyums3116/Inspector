// src/pages/ReportEditor.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ReportEditor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    // first try sessionStorage (per‐tab), then fallback to localStorage
    const viewReportUrl =
      sessionStorage.getItem("viewReportUrl") ||
      localStorage.getItem("viewReportUrl");
    const editingReportId =
      sessionStorage.getItem("editingReportId") ||
      localStorage.getItem("editingReportId");

    if (!viewReportUrl || !editingReportId) {
      toast.error("No report selected to view.");
      navigate("/dashboard", { replace: true });
      return;
    }

    const lower = viewReportUrl.toLowerCase();
    if (lower.endsWith(".pdf")) {
      setIframeUrl(viewReportUrl);
    } else {
      const encoded = encodeURIComponent(viewReportUrl);
      setIframeUrl(
        `https://view.officeapps.live.com/op/embed.aspx?src=${encoded}`
      );
    }
  }, [navigate, user]);

  if (!iframeUrl) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Loading viewer…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-3 bg-gray-100 border-b flex justify-between items-center">
        <h1 className="text-lg font-semibold">Report Viewer</h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </header>

      {/* Iframe */}
      <div style={{ flexGrow: 1 }}>
        <iframe
          src={iframeUrl}
          title="Report Viewer"
          width="100%"
          height="100%"
          className="border-none"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ReportEditor;
