import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Edit, Camera, Bell, Lock, HelpCircle, LogOut, Trash2 } from "lucide-react"
import { Navigation } from "@/components/Navigation"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [activeTab, setActiveTab] = useState("home")
  const [currentPage, setCurrentPage] = useState("home")
  const [profile, setProfile] = useState({
    name: "Your Name",
    profession: "Developer",
    country: "Portugal",
    city: "Lisbon",
    email: "your@email.com"
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24">
      <Navigation 
        activeTab="profile" 
        onTabChange={(tab) => {
          setActiveTab(tab)
          setCurrentPage(tab)
        }} 
      />
      
      {/* Increased max width for better desktop experience */}
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Reduced header padding */}
        <div className="pt-6 pb-2 text-center">
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Card - More compact */}
        <GlassCard className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="h-8"
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="flex items-start space-x-4">
              <div className="relative flex-shrink-0">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-base bg-gradient-primary text-white">
                    YN
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-1 -right-1 h-6 w-6 p-0 rounded-full"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      placeholder="Name"
                      className="h-8 text-sm"
                    />
                    <Input
                      value={profile.profession}
                      onChange={(e) => setProfile({...profile, profession: e.target.value})}
                      placeholder="Profession"
                      className="h-8 text-sm"
                    />
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-base">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.profession}</p>
                    <p className="text-sm text-muted-foreground">{profile.city}, {profile.country}</p>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={profile.country}
                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                    placeholder="Country"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={profile.city}
                    onChange={(e) => setProfile({...profile, city: e.target.value})}
                    placeholder="City"
                    className="h-8 text-sm"
                  />
                </div>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  placeholder="Email"
                  className="h-8 text-sm"
                />
                <Button onClick={handleSave} className="w-full h-9">
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Settings - More compact with better spacing */}
        <GlassCard className="p-4">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Settings & Privacy</h2>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive song notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="space-y-1 pt-1">
                <Button variant="outline" className="w-full justify-start h-9 text-sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>

                <Button variant="outline" className="w-full justify-start h-9 text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Terms & Conditions
                </Button>

                <Button variant="outline" className="w-full justify-start h-9 text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Premium - More compact */}
        <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5 p-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-primary">Upgrade to Premium</h3>
            <p className="text-xs text-muted-foreground">
              Get priority matching and see song history from all users
            </p>
            <Button className="w-full bg-gradient-primary h-9">
              Subscribe
            </Button>
          </div>
        </GlassCard>

        {/* Danger Zone - More compact with better organization */}
        <GlassCard className="border-destructive/20 p-4">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-destructive">Account Actions</h2>
            
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="w-full justify-start h-9 text-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              
              <Button variant="destructive" className="w-full justify-start h-9 text-sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default ProfilePage