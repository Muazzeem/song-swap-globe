import { Home, Library, BarChart3, User, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  brandName?: string
  userName?: string
  userAvatar?: string
  onNotificationClick?: () => void
  onSettingsClick?: () => void
}

const navItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "library", label: "Library", icon: Library },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
]

export function Navigation({ 
  activeTab, 
  onTabChange,
  brandName = "MyApp",
  userName = "John Doe",
  userAvatar,
  onNotificationClick,
  onSettingsClick
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-glass border-b border-white/10 p-4 z-50 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{brandName.charAt(0)}</span>
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:block">{brandName}</span>
        </div>

        <div className="flex justify-center space-x-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200",
                activeTab === id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium hidden sm:block">{label}</span>
            </button>
          ))}
        </div>

        {/* User Section - Right Side */}
        <div className="flex items-center space-x-2">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* User Avatar and Name */}
          <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
            <span className="text-sm font-medium text-foreground hidden md:block">{userName}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}