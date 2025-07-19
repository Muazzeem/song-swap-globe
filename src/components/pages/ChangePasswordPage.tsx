import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

interface ChangePasswordPageProps {
  onBack: () => void
}

export function ChangePasswordPage({ onBack }: ChangePasswordPageProps) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleSave = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!")
      return
    }
    console.log("Changing password")
    onBack()
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }))
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

        {/* Change Password Form */}
        <GlassCard>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    className="h-12 bg-input/50 border-white/10 focus:border-primary/50 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    className="h-12 bg-input/50 border-white/10 focus:border-primary/50 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    className="h-12 bg-input/50 border-white/10 focus:border-primary/50 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 border-white/20 hover:bg-white/5"
              >
                Cancel
              </Button>
              
              <Button 
                onClick={handleSave}
                disabled={!passwords.current || !passwords.new || !passwords.confirm}
                className="flex-1 h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Save
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Security Tips */}
        <GlassCard>
          <div className="space-y-3">
            <h3 className="font-semibold">Password Security Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use at least 8 characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Add numbers and special characters</li>
              <li>• Don't use personal information</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}