import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Music, Mail, Lock, User, Briefcase, MapPin } from "lucide-react"
import { PasswordResetModal } from "@/components/modals/PasswordResetModal"
import { OTPVerification } from "@/components/OTPVerification"
import { VerificationSuccess } from "@/components/VerificationSuccess"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { CountrySelect } from "@/components/ui/country-select"
import GoogleLoginButton from "./GoogleLoginButton"

type AuthStep = 'auth' | 'otp' | 'success'

export function AuthForm() {
  const { login, register, verifyOTP, resendOTP, isLoading } = useAuth()
  const { toast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [currentStep, setCurrentStep] = useState<AuthStep>('auth')
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password1: "",
    password2: "",
    profession: "",
    country: "",
    city: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        toast({
          title: "Success!",
          description: "You've been logged in successfully.",
        })
      } else {
        // Validation for registration
        if (formData.password1 !== formData.password2) {
          toast({
            title: "Error",
            description: "Passwords do not match.",
            variant: "destructive"
          })
          return
        }

        const result = await register({
          email: formData.email,
          profession: formData.profession,
          country: formData.country,
          city: formData.city,
          password1: formData.password1,
          password2: formData.password2,
        })

        if (result.requiresOTP) {
          setRegisteredEmail(formData.email)
          setCurrentStep('otp')
          toast({
            title: "Registration Successful!",
            description: "Please check your email for the verification code.",
          })
        } else {
          toast({
            title: "Success!",
            description: "Account created successfully!",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: isLogin ? "Login failed. Please check your credentials." : "Registration failed. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleOTPVerificationSuccess = () => {
    setCurrentStep('success')
  }

  const handleResendOTP = async () => {
    await resendOTP(registeredEmail)
  }

  const handleContinueFromSuccess = () => {
    // Reset form and redirect to dashboard
    setCurrentStep('auth')
    setIsLogin(true)
    setFormData({
      email: "",
      password: "",
      password1: "",
      password2: "",
      profession: "",
      country: "",
      city: ""
    })
  }

  const handleGoogleLoginSuccess = async (userData: any) => {
    try {
      toast({
        title: "Google Login Success",
        description: "Successfully logged in with Google!",
      });
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

  // Show OTP verification step
  if (currentStep === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="w-full max-w-md">
          <OTPVerification
            email={registeredEmail}
            onVerificationSuccess={handleOTPVerificationSuccess}
            onResendOTP={handleResendOTP}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }

  // Show success step
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="w-full max-w-md">
          <VerificationSuccess
            onContinue={handleContinueFromSuccess}
            userEmail={registeredEmail}
          />
        </div>
      </div>
    )
  }

  // Show main auth form
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
              Connect through music. Share songs instantly with people around the world.
            </p>
          </div>

          {/* Auth Forms */}
          <div className="space-y-6">
            <GlassCard>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {isLogin ? "Welcome Back" : "Join SoundlyBeats"}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin ? "Sign in to continue sharing music" : "Create your account to start"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
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
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Profession"
                        value={formData.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                        className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <CountrySelect
                        value={formData.country}
                        onValueChange={(value) => handleInputChange("country", value)}
                        placeholder="Select your country"
                      />
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {isLogin ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password1}
                        onChange={(e) => handleInputChange("password1", e.target.value)}
                        className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password2}
                        onChange={(e) => handleInputChange("password2", e.target.value)}
                        className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>
                  </>
                )}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowPasswordReset(true)}
                      className="text-sm text-primary hover:text-primary-glow transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : (isLogin ? "Login" : "Register")}
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
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary-glow transition-colors"
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
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
