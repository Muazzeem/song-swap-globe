import { Home, Library, BarChart3, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  brandName?: string;
  userName?: string;
  userAvatar?: string;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, to: "/dashboard" },
  { id: "library", label: "Library", icon: Library, to: "/library" },
  { id: "stats", label: "Stats", icon: BarChart3, to: "/stats" },
  { id: "profile", label: "Profile", icon: User, to: "/profile" },
];

export function Navigation({ brandName = "Soundly" }: NavigationProps) {
  const location = useLocation();
  const { accessToken, logout } = useAuth();

  const signOut = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-glass border-b border-white/10 p-4 z-50 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{brandName.charAt(0)}</span>
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:block">{brandName}</span>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-1">
          {navItems.map(({ id, label, icon: Icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={id}
                to={to}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right section: logout */}
        <div className="flex items-center space-x-2">
          {accessToken && (
            <button
              onClick={signOut}
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 px-3 py-2 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
