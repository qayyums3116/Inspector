// src/pages/Dashboard.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FilePlus,
  Search,
  Eye,
  Filter,
  ChevronDown,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface Report {
  id: number;
  report_name: string;
  s3_url: string;
  created_at: string;
  unit: string | null;
  status?: "Completed" | "Draft";
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Completed" | "Draft"
  >("All");

  // Fetch reports from API
  const fetchReports = useCallback(async () => {
    if (!user?.id || !user.token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://3.128.160.75:8000/api/user/${user.id}/reports/`,
        { headers: { Authorization: `Token ${user.token}` } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Report[] = await res.json();
      setReports(data);
    } catch (err: any) {
      toast({
        title: "Failed to load reports",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // initial load
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // re-fetch when window regains focus
  useEffect(() => {
    window.addEventListener("focus", fetchReports);
    return () => window.removeEventListener("focus", fetchReports);
  }, [fetchReports]);

  // Stats
  const totalReports = reports.length;
  const completedReports = reports.filter((r) => r.status !== "Draft").length;
  const HOURS_PER_REPORT = 1;
  const timeSaved = completedReports * HOURS_PER_REPORT;
  const completionPct = totalReports
    ? Math.round((completedReports / totalReports) * 100)
    : 0;

  // Top-5 recent
  const recentReports = useMemo(
    () =>
      [...reports]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 5)
        .map((r) => ({
          id: r.id,
          title: r.report_name,
          date: r.created_at,
          circuitId: r.unit || "—",
          status: r.status || "Completed",
          s3_url: r.s3_url,
        })),
    [reports]
  );

  // Filter + search
  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return recentReports.filter(
      (rep) =>
        (statusFilter === "All" || rep.status === statusFilter) &&
        (rep.title.toLowerCase().includes(q) ||
          rep.circuitId.toLowerCase().includes(q) ||
          rep.date.includes(q))
    );
  }, [recentReports, statusFilter, searchTerm]);

  // Open the editor with the selected report (no download)
  const handleView = (r: { id: number; s3_url: string }) => {
    localStorage.removeItem("viewReportUrl");
    localStorage.removeItem("editingReportId");
    localStorage.setItem("viewReportUrl", r.s3_url);
    localStorage.setItem("editingReportId", String(r.id));
    window.open(`${window.location.origin}/report-editor`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col w-full">
        <DashboardHeader user={user!} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Title + New */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              {/* Only show 'Start New Report' button — no dashboard redirects here */}
              <Button asChild className="bg-inspectoriq-blue text-white">
                <Link to="/new-report">
                  <FilePlus className="h-5 w-5 mr-2" />
                  Start a New Report
                </Link>
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3">Report Completion</h3>
                <Progress value={completionPct} className="h-2.5 mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {completedReports} of {totalReports} complete
                  </span>
                  <span className="font-medium text-green-600">{completionPct}%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Estimated Time Saved</h3>
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-inspectoriq-blue" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{timeSaved} hrs</p>
                <p className="text-sm text-gray-500">
                  Based on {HOURS_PER_REPORT} hr per report
                </p>
              </div>
            </div>

            {/* Recent table */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">
                  Recent API Inspection Reports
                </h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search"
                      className="pl-10 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Status: {statusFilter}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(["All", "Completed", "Draft"] as const).map((s) => (
                        <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                          {s}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {loading ? (
                <p className="p-6 text-center">Loading…</p>
              ) : filtered.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full md:table">
                    <tbody>
                      {filtered.map((r) => (
                        <tr key={r.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-inspectoriq-blue cursor-pointer"
                            onClick={() => handleView(r)}
                          >
                            {r.title}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500">{r.circuitId}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">
                            {new Date(r.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                r.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(r)}
                              className="text-inspectoriq-blue"
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  No reports match your criteria.
                </p>
              )}

              <div className="flex justify-end mt-4">
                <Link to="/reports" className="inline-flex items-center text-inspectoriq-blue">
                  View All Reports <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
