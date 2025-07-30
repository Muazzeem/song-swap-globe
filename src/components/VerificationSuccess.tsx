
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle, ArrowRight } from "lucide-react"

interface VerificationSuccessProps {
  onContinue: () => void
  userEmail: string
}

export function VerificationSuccess({ onContinue, userEmail }: VerificationSuccessProps) {
  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-green-500/20">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-green-600">
              Email Verified Successfully!
            </h2>
            <p className="text-muted-foreground">
              Welcome to SoundlyBeats! Your account has been created and verified.
            </p>
            <p className="text-sm font-medium text-primary">{userEmail}</p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="bg-gradient-to-r from-green-500/10 to-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                You can now start sharing your favorite music with people around the world!
              </p>
            </div>

            <Button
              onClick={onContinue}
              className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white group"
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
