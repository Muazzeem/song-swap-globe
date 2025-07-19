import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowLeft } from "lucide-react"

interface AccountPageProps {
  onBack: () => void
}

export function AccountPage({ onBack }: AccountPageProps) {
  const [formData, setFormData] = useState({
    username: "soundly_user",
    email: "user@email.com",
    name: "Designer",
    country: "Portugal",
    city: "Lisbon"
  })

  const handleSave = () => {
    console.log("Saving account data:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="pt-8 pb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Account
          </Button>
        </div>

        {/* Account Form */}
        <GlassCard>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Username
                </label>
                <Input
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Name/Profession
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Country
                  </label>
                  <Input
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    City
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Save
            </Button>
          </div>
        </GlassCard>

        {/* Additional Options */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Security</h2>
            
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start border-white/20 hover:bg-white/5"
              onClick={() => {/* Navigate to change password */}}
            >
              Change Password
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}