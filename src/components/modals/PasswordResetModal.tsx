
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

interface PasswordResetModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PasswordResetModal({ isOpen, onClose }: PasswordResetModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  const handleClose = () => {
    setEmail("")
    setIsEmailSent(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 border-white/20 bg-transparent">
        <GlassCard className="p-6">
          {!isEmailSent ? (
            <>
              <DialogHeader className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-xl font-semibold">Reset Password</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-input/50 border-white/10 focus:border-primary/50"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={handleClose}
                    className="w-full h-12 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="space-y-2">
                <DialogTitle className="text-xl font-semibold">Check Your Email</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  We've sent a password reset link to <br />
                  <span className="font-medium text-foreground">{email}</span>
                </DialogDescription>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleClose}
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Done
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={() => setIsEmailSent(false)}
                  className="w-full h-12 text-muted-foreground hover:text-foreground"
                >
                  Try Different Email
                </Button>
              </div>
            </div>
          )}
        </GlassCard>
      </DialogContent>
    </Dialog>
  )
}
