
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Music, Mail, Lock } from "lucide-react"
import { PasswordResetModal } from "@/components/modals/PasswordResetModal"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import GoogleLoginButton from "@/components/GoogleLoginButton"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(formData.email, formData.password)
      toast({
        title: "Success!",
        description: "You've been logged in successfully.",
      })
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive"
      })
    }
  }

  const handleGoogleLoginSuccess = async (userData: any) => {
    try {
      toast({
        title: "Google Login Success",
        description: "Successfully logged in with Google!",
      });
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Failed to complete Google login process.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
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
              Welcome back! Sign in to continue sharing music with people around the world.
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <GlassCard>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground">
                  Sign in to continue sharing music
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                    required
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowPasswordReset(true)}
                    className="text-sm text-primary hover:text-primary-glow transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <GoogleLoginButton
                  onSuccess={handleGoogleLoginSuccess}
                  disabled={isLoading}
                />
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary-glow transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
    </>
  )
}
