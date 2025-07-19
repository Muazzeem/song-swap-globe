import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Star, User, Settings, HelpCircle } from "lucide-react"
import { ReactNode } from "react"

interface DrawerMenuProps {
  children: ReactNode
  onNavigate: (page: string) => void
}

export function DrawerMenu({ children, onNavigate }: DrawerMenuProps) {
  const menuItems = [
    { id: "premium", label: "Premium", icon: Star, color: "text-primary" },
    { id: "account", label: "Account", icon: User },
    { id: "settings", label: "Settings & Privacy", icon: Settings },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-80 bg-card/95 backdrop-blur-glass border-r border-white/10 p-0"
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-white">
                  YN
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Your Name</h3>
                <p className="text-sm text-muted-foreground">Edit Profile Photo</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className="w-full justify-start h-12 text-left hover:bg-white/5"
                >
                  <item.icon className={`mr-3 h-5 w-5 ${item.color || 'text-muted-foreground'}`} />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              Soundly v1.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}