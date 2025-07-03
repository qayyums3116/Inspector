// src/pages/ReportsPage.tsx
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Trash2,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "completed"
  >("all");
  const [sortOption, setSortOption] = useState<
    "recent" | "oldest" | "alphabetical"
  >("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  // Fetch user's reports
  const fetchReports = useCallback(async () => {
    if (!user?.id || !user.token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://3.128.160.75:8000/api/user/${user.id}/reports/`,
        { headers: { Authorization: `Token ${user.token}` } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
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

  // on mount
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // re-fetch when window regains focus (e.g. after saving in editor)
  useEffect(() => {
    window.addEventListener("focus", fetchReports);
    return () => window.removeEventListener("focus", fetchReports);
  }, [fetchReports]);

  // Filter, search, sort
  const filteredReports = useMemo(() => {
    let out = [...reports];

    if (statusFilter !== "all") {
      out = out.filter((r) => r.status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      out = out.filter((r) =>
        r.report_name.toLowerCase().includes(q)
      );
    }
    if (sortOption === "recent") {
      out.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    } else if (sortOption === "oldest") {
      out.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    } else {
      out.sort((a, b) =>
        a.report_name.localeCompare(b.report_name)
      );
    }

    return out;
  }, [reports, statusFilter, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIdx = (currentPage - 1) * reportsPerPage;
  const currentReports = filteredReports.slice(
    startIdx,
    startIdx + reportsPerPage
  );

  // Download handler
  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({
      title: "Download started",
      description: `Report ${name} is downloading.`,
    });
  };

  // Permanently delete via API
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this report permanently?")) return;
    try {
      const res = await fetch(
        `http://3.128.160.75:8000/api/delete-report/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Token ${user?.token}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Deleted",
        description: `Report #${id} removed.`,
        variant: "destructive",
      });
    } catch (err: any) {
      toast({
        title: "Deletion failed",
        description: err.message || "Could not delete report.",
        variant: "destructive",
      });
    }
  };

  // View handler—reuses your ReportEditor
  const handleView = (url: string, id: number) => {
    // clear any old values
    localStorage.removeItem("viewReportUrl");
    localStorage.removeItem("editingReportId");
    // set the new ones
    localStorage.setItem("viewReportUrl", url);
    localStorage.setItem("editingReportId", String(id));
    window.open(`${window.location.origin}/report-editor`, "_blank");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          user={user ?? { name: "Loading…", email: "" }}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              My Reports
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and access all your inspection reports
            </p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <select
              className="w-full sm:w-64 rounded border px-3 py-2"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as any)
              }
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="w-full sm:w-64 rounded border px-3 py-2"
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as any)
              }
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

            <div className="relative w-full md:w-96">
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="md:ml-auto w-full md:w-auto">
              <Button
                onClick={() => navigate("/new-report")}
                className="w-full md:w-auto"
              >
                Create New Report
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <p className="p-6 text-center">
                Loading reports…
              </p>
            ) : currentReports.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Created At
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentReports.map((r) => (
                        <tr
                          key={r.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td
                            className="px-6 py-4 whitespace-nowrap text-blue-600 cursor-pointer flex items-center hover:underline"
                            onClick={() => handleView(r.s3_url, r.id)}
                          >
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            {r.report_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(r.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Download"
                                onClick={() =>
                                  handleDownload(
                                    r.s3_url,
                                    r.report_name
                                  )
                                }
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="View"
                                onClick={() =>
                                  handleView(r.s3_url, r.id)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(r.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {startIdx + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          startIdx + reportsPerPage,
                          filteredReports.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredReports.length}
                      </span>{" "}
                      reports
                    </div>
                    <nav className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.max(p - 1, 1)
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={
                          currentPage === totalPages
                        }
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(
                              p + 1,
                              totalPages
                            )
                          )
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 px-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No reports found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? "No reports match your criteria."
                    : "You don’t have any reports yet."}
                </p>
                {!searchQuery && (
                  <div className="mt-6">
                    <Button onClick={() => navigate("/new-report")}>
                      Create New Report
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>


      </div>
    </div>
  );
};

export default ReportsPage;
