
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OTPVerificationProps {
  email: string
  onVerificationSuccess: () => void
  onResendOTP: () => Promise<void>
  isLoading?: boolean
}

export function OTPVerification({ 
  email, 
  onVerificationSuccess, 
  onResendOTP,
  isLoading = false 
}: OTPVerificationProps) {
  const { toast } = useToast()
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive"
      })
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp
        }),
      })

      if (!response.ok) {
        throw new Error('OTP verification failed')
      }

      onVerificationSuccess()
      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
      })
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The OTP code is invalid or has expired. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      await onResendOTP()
      setCountdown(60)
      setCanResend(false)
      setOtp("")
      toast({
        title: "OTP Sent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error) {
      toast({
        title: "Failed to Resend",
        description: "Could not send a new verification code. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-sm font-medium text-primary">{email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={isVerifying || isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOTP}
              className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
              disabled={otp.length !== 6 || isVerifying || isLoading}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                className="text-primary hover:text-primary-glow"
                disabled={isLoading}
              >
                Resend Code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend available in {countdown}s
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
