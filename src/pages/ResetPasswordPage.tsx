
import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Music, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const { uid, token } = useParams<{ uid: string; token: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.new_password1 !== formData.new_password2) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      })
      return
    }

    if (!uid || !token) {
      toast({
        title: "Error",
        description: "Invalid reset link.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/password/reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid,
          token,
          new_password1: formData.new_password1,
          new_password2: formData.new_password2
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.detail || "Failed to reset password")
      }

      setIsSuccess(true)
      toast({
        title: "Success!",
        description: "Your password has been reset successfully.",
      })
    } catch (error: any) {
      console.error("Password reset error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to reset password.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="w-full max-w-md">
          <GlassCard>
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Password Reset Complete</h2>
                <p className="text-muted-foreground">
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
              </div>

              <Button 
                onClick={() => navigate("/login")}
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
              >
                Go to Login
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SoundlyBeats
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-md">
            Create a new password to secure your account and continue sharing music.
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="space-y-6">
          <GlassCard>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Reset Your Password
              </h2>
              <p className="text-muted-foreground">
                Enter your new password below
              </p>
            </div>

            {(!uid || !token) && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Invalid Reset Link</span>
                </div>
                <p className="text-sm text-destructive/80 mt-1">
                  This reset link is invalid or has expired. Please request a new password reset.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={formData.new_password1}
                  onChange={(e) => handleInputChange("new_password1", e.target.value)}
                  className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                  required
                  minLength={8}
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={formData.new_password2}
                  onChange={(e) => handleInputChange("new_password2", e.target.value)}
                  className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                  required
                  minLength={8}
                />
              </div>

              {formData.new_password1 && formData.new_password2 && formData.new_password1 !== formData.new_password2 && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
                disabled={isLoading || !uid || !token || formData.new_password1 !== formData.new_password2}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-glow transition-colors"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
