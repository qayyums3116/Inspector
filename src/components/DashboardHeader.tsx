// src/components/DashboardHeader.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // TODO: clear real auth tokens / session here
    navigate("/", { replace: true });
  };

  // Safely grab the first initial if we have a name
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          {/* Optional page title could go here */}
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-inspectoriq-blue text-white flex items-center justify-center">
                  {initial}
                </div>
<span className="hidden md:inline font-medium">{user?.name ?? "Loading…"}</span>

                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-500 truncate">{user.email}</p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <UserIcon className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center text-red-600 hover:bg-red-50 focus:bg-red-100 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Loading…
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
