// src/components/DashboardSidebar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  FolderOpen,
  Settings,
  MessageCircle,
  LayoutDashboard,
  LayoutTemplate,
  FilePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import FeedbackButton from "./FeedbackButton";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackActive, setFeedbackActive] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Start a New Report", icon: FilePlus, href: "/new-report" },
    { name: "My Reports", icon: FolderOpen, href: "/reports" },
    { name: "My Templates", icon: LayoutTemplate, href: "/templates" },
    { name: "Account Settings", icon: Settings, href: "/settings" },
  ];

  const handleOpenFeedbackModal = () => setFeedbackActive(true);
  const handleModalChange = (open: boolean) => setFeedbackActive(open);

  // Determine logo link based on auth state
  const logoLink = user?.token ? "/dashboard" : "/";

  return (
    <>
      {/* Hamburger button - mobile only, hide when sidebarOpen */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0 md:inset-auto md:transform-none"
        )}
      >
        {/* Close button - mobile only */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 py-5">
          {/* Logo */}
          <div className="px-4 mb-6">
            <Link to={logoLink} className="flex items-center">
              <img
                src="/lovable-uploads/ffecffb1-2389-4496-a62f-74d3a0c40b1a.png"
                alt="InspectorIQ Logo"
                className="h-8"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-inspectoriq-blue text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-inspectoriq-blue"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-inspectoriq-blue"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Give Feedback */}
            <button
              className={cn(
                "group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors w-full text-left",
                feedbackActive
                  ? "bg-inspectoriq-blue text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-inspectoriq-blue"
              )}
              onClick={handleOpenFeedbackModal}
            >
              <MessageCircle
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5",
                  feedbackActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-inspectoriq-blue"
                )}
              />
              <span>Give Feedback</span>
            </button>
          </nav>
        </div>

        {/* Feedback Modal */}
        <FeedbackButton
          source="dashboard"
          open={feedbackActive}
          onOpenChange={handleModalChange}
          className="hidden"
        />
      </aside>
    </>
  );
}
