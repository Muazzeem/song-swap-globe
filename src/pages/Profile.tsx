import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Edit, Camera, Bell, Lock, HelpCircle, LogOut, Trash2, Loader2 } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useAuth } from "@/contexts/AuthContext"
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal"

export function ProfilePage() {
  const { user, logout, accessToken } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [currentPage, setCurrentPage] = useState("profile")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  
  const [profile, setProfile] = useState({
    uid: "",
    first_name: "",
    last_name: "",
    profession: "",
    country: "",
    city: "",
    email: "",
    profile_image: null,
    receive_notifications: true,
    is_active_for_receiving: true
  })

  // Fetch profile data from API
  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError("")
      const token = accessToken
      
      if (!token) {
        setError("No access token found")
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`)
      }

      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError(err.message || "Failed to load profile")
      console.error("Error fetching profile:", err)
    } finally {
      setLoading(false)
    }
  }

  // Update profile data
  const updateProfile = async (updatedData) => {
    try {
      setUpdating(true)
      setError("")
      const token = accessToken
      
      if (!token) {
        setError("No access token found")
        return false
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`)
      }

      const data = await response.json()
      setProfile(data)
      return true
    } catch (err) {
      setError(err.message || "Failed to update profile")
      console.error("Error updating profile:", err)
      return false
    } finally {
      setUpdating(false)
    }
  }

  // Load profile on component mount
  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSave = async () => {
    const success = await updateProfile(profile)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleNotificationToggle = async (checked) => {
    const updatedProfile = {
      ...profile,
      receive_notifications: checked
    }
    setProfile(updatedProfile)
    await updateProfile(updatedProfile)
  }

  const handleLogout = () => {
    logout()
    // Navigate to home page or login page
    window.location.href = "/"
  }

  const getInitials = () => {
    if (profile.first_name && profile.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    }
    if (profile.first_name) {
      return profile.first_name[0].toUpperCase()
    }
    return "U"
  }

  const getFullName = () => {
    return `${profile.first_name} ${profile.last_name}`.trim() || "User"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
        <Navigation 
          activeTab="profile" 
          onTabChange={(tab) => {
            setActiveTab(tab)
            setCurrentPage(tab)
          }} 
        />
        <div className="max-w-2xl mx-auto flex items-center justify-center pt-20">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
      <Navigation 
        activeTab="profile" 
        onTabChange={(tab) => {
          setActiveTab(tab)
          setCurrentPage(tab)
        }} 
      />
      
      <div className="max-w-2xl mx-auto space-y-4">
        
        <div className="pt-6 pb-2 text-center">
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account and preferences
          </p>
        </div>

        {error && (
          <GlassCard className="p-4 border-destructive/20 bg-destructive/5">
            <p className="text-destructive text-sm">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProfile}
              className="mt-2"
            >
              Retry
            </Button>
          </GlassCard>
        )}

        {/* Profile Card */}
        <GlassCard className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="h-8"
                disabled={updating}
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="flex items-start space-x-4">
              <div className="relative flex-shrink-0">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={profile.profile_image} />
                  <AvatarFallback className="text-base bg-gradient-primary text-white">
                    {getInitials()}
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
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={profile.first_name}
                        onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                        placeholder="First Name"
                        className="h-8 text-sm"
                      />
                      <Input
                        value={profile.last_name}
                        onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                        placeholder="Last Name"
                        className="h-8 text-sm"
                      />
                    </div>
                    <Input
                      value={profile.profession}
                      onChange={(e) => setProfile({...profile, profession: e.target.value})}
                      placeholder="Profession"
                      className="h-8 text-sm"
                    />
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-base">{getFullName()}</h3>
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
                <Input disabled
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  placeholder="Email"
                  className="h-8 text-sm"
                  type="email"
                />
                <Button 
                  onClick={handleSave} 
                  className="w-full h-9 text-white"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Settings */}
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
                  checked={profile.receive_notifications}
                  onCheckedChange={handleNotificationToggle}
                />
              </div>

              <div className="space-y-1 pt-1">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-9 text-sm"
                  onClick={() => setShowChangePasswordModal(true)}
                >
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

        {/* Premium */}
        <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5 p-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-primary">Upgrade to Premium</h3>
            <p className="text-xs text-muted-foreground">
              Get priority matching and see song history from all users
            </p>
            <Button className="w-full bg-gradient-primary h-9 text-white">
              Subscribe
            </Button>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard className="border-destructive/20 p-4">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-destructive">Account Actions</h2>
            
            <div className="grid grid-cols-1 gap-2">
              <Button 
                variant="outline" 
                className="w-full justify-start h-9 text-sm"
                onClick={handleLogout}
              >
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

      <ChangePasswordModal 
        open={showChangePasswordModal}
        onOpenChange={setShowChangePasswordModal}
      />
    </div>
  )
}

export default ProfilePage
