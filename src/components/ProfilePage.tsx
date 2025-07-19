import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Edit, Camera, Bell, Lock, HelpCircle, LogOut, Trash2 } from "lucide-react"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
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
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="pt-8 pb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Card */}
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg bg-gradient-primary text-white">
                    YN
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      placeholder="Name"
                      className="h-9"
                    />
                    <Input
                      value={profile.profession}
                      onChange={(e) => setProfile({...profile, profession: e.target.value})}
                      placeholder="Profession"
                      className="h-9"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.profession}</p>
                    <p className="text-sm text-muted-foreground">{profile.city}, {profile.country}</p>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={profile.country}
                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                    placeholder="Country"
                    className="h-9"
                  />
                  <Input
                    value={profile.city}
                    onChange={(e) => setProfile({...profile, city: e.target.value})}
                    placeholder="City"
                    className="h-9"
                  />
                </div>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  placeholder="Email"
                  className="h-9"
                />
                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Settings */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Settings & Privacy</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive song notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <Button variant="outline" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-3" />
                Change Password
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-3" />
                Terms & Conditions
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-3" />
                Privacy Policy
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Premium */}
        <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-primary">Upgrade to Premium</h3>
            <p className="text-sm text-muted-foreground">
              Get priority matching and see song history from all users
            </p>
            <Button className="w-full bg-gradient-primary">
              Subscribe
            </Button>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard className="border-destructive/20">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            
            <div className="space-y-2">
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-3" />
                Delete Account
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}