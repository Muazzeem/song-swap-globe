
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { CountrySelect } from "@/components/ui/country-select"
import { Edit, Camera, Bell, Lock, HelpCircle, LogOut, Trash2, Loader2, Info, Brain, Share2, Play, Star, CheckCircle, Award } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useAuth } from "@/contexts/AuthContext"
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal"
import AccountState from "@/components/AccoutState"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import PremiumSubscriptionCard from "@/components/PremiumSubscription"
import SubscriptionDetails from "@/components/SubscriptionDetails"


const Badge = ({ type }) => {
  const badges = {
    premium: { bg: 'bg-yellow-500', icon: '👑' },
    artist: { bg: 'bg-purple-500', icon: '🎨' },
    influencer: { bg: 'bg-blue-500', icon: '⭐' },
  };

  const badge = badges[type];
  if (!badge) return null;

  return (
    <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${badge.bg} rounded-full flex items-center justify-center border-2 border-white text-white text-xs font-bold`}>
      {badge.icon}
    </div>
  );
};

export function ProfilePage() {
  const { user, logout, accessToken } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [currentPage, setCurrentPage] = useState("profile")
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef(null)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const navigate = useNavigate();
  const { toast } = useToast()
  
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
    is_active_for_receiving: true,
    type: "basic" // basic, premium, artist, influencer
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

  const updateProfile = async (updatedData) => {
    try {
      setUpdating(true);
      setError("");
      const token = accessToken;

      if (!token) {
        setError("No access token found");
        return false;
      }
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === 'profile_image') return;

        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          if (typeof updatedData[key] === 'boolean') {
            formData.append(key, updatedData[key].toString());
          } else {
            formData.append(key, updatedData[key]);
          }
        }
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      return true;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Error updating profile:", err);
      return false;
    } finally {
      setUpdating(false);
    }
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("profile_image", file)

    try {
      setUpdating(true)
      setError("")

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError(err.message || "Image upload failed")
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
        <div className="max-w-7xl mx-auto flex items-center justify-center pt-20">
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
      
      {/* Container with responsive max-width */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="pt-8 pb-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">Profile</h1>
          <p className="text-muted-foreground text-lg">
            Manage your account and preferences
          </p>
        </div>

        {error && (
          <div className="mb-8">
            <GlassCard className="p-4 lg:p-6 border-destructive/20 bg-destructive/5">
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
          </div>
        )}

        {/* Content Grid - Two columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            {/* Profile Card */}
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
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

                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                      <AvatarImage src={profile.profile_image} />
                      <AvatarFallback className="text-lg lg:text-xl bg-gradient-primary text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <Badge type={profile.type} />
                    {isEditing && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute -bottom-1 -right-1 h-7 w-7 p-0 rounded-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="h-3 w-3" />
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <Input
                            value={profile.first_name}
                            onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                            placeholder="First Name"
                            className="h-9"
                          />
                          <Input
                            value={profile.last_name}
                            onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                            placeholder="Last Name"
                            className="h-9"
                          />
                        </div>
                        <Input
                          value={profile.profession}
                          onChange={(e) => setProfile({...profile, profession: e.target.value})}
                          placeholder="Profession"
                          className="h-9"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-xl">{getFullName()}</h3>
                        <p className="text-muted-foreground">{profile.profession}</p>
                        <p className="text-muted-foreground">{profile.city}, {profile.country}</p>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <CountrySelect
                        value={profile.country}
                        onValueChange={(value) => setProfile({...profile, country: value})}
                        placeholder="Select country..."
                        className="h-9"
                      />
                      <Input
                        value={profile.city}
                        onChange={(e) => setProfile({...profile, city: e.target.value})}
                        placeholder="City"
                        className="h-9"
                      />
                    </div>
                    <Input disabled
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      placeholder="Email"
                      className="h-9"
                      type="email"
                    />
                    <Button 
                      onClick={handleSave} 
                      className="w-full h-10 text-white"
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
            <GlassCard className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Settings & Privacy</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-4">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive song notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.receive_notifications}
                      onCheckedChange={handleNotificationToggle}
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-10"
                      onClick={() => setShowChangePasswordModal(true)}
                    >
                      <Lock className="h-4 w-4 mr-3" />
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-10"
                      onClick={() => navigate('/about')}
                    >
                      <Info className="h-4 w-4 mr-3" />
                      About Us
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-10"
                      onClick={() => navigate('/terms')}
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      Terms & Conditions
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-10"
                      onClick={() => navigate('/privacy')}
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
            <SubscriptionDetails />
            <GlassCard className="border-destructive/20 p-6 mt-5">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-destructive">Account Actions</h2>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>

                  <Button variant="destructive" className="w-full justify-start h-10">
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">

            {/* Account Stats */}
            <AccountState />

            {/* Premium */}
            <PremiumSubscriptionCard />

            {/* <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5 p-6">
              <div className="text-center space-y-4">
                <div className="text-4xl">⭐</div>
                <h3 className="text-xl font-semibold text-primary">Upgrade to Premium</h3>
                <div className="space-y-4 text-left">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.icon}
                      <div className="flex-1">
                        <span className="text-white font-medium">{feature.title}</span>
                        {feature.description && (
                          <span className="text-gray-300 ml-1">{feature.description}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-primary h-10 text-white">
                  Subscribe
                </Button>
              </div>
            </GlassCard> */}
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        open={showChangePasswordModal}
        onOpenChange={setShowChangePasswordModal}
      />
    </div>
  )
}

export default ProfilePage
