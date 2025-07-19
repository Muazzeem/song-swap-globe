import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Trash2, HelpCircle } from "lucide-react"

interface SettingsPageProps {
  onBack: () => void
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true)

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
            Settings & Privacy
          </Button>
        </div>

        {/* Notifications */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive new songs
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </GlassCard>

        {/* Privacy & Terms */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Privacy & Legal</h2>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start border-white/20 hover:bg-white/5"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Terms & Conditions
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 justify-start border-white/20 hover:bg-white/5"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Privacy Policy
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Account Management */}
        <GlassCard className="border-destructive/20">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-destructive">Account Management</h2>
            
            <Button 
              variant="destructive" 
              className="w-full h-12 justify-start"
            >
              <Trash2 className="h-4 w-4 mr-3" />
              Delete Account
            </Button>
            
            <p className="text-xs text-muted-foreground">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </GlassCard>

        {/* App Info */}
        <GlassCard>
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Music Bridge</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for music lovers worldwide
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}