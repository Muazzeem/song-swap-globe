import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowLeft, Star, Share2, Check, Music, Users } from "lucide-react"

interface PremiumPageProps {
  onBack: () => void
}

const premiumFeatures = [
  {
    icon: Music,
    title: "AI Fun Facts",
    description: "Get a cool, educational fact for every song you receive"
  },
  {
    icon: Share2,
    title: "Share Cards",
    description: "Post your received song cards to Instagram or Facebook Stories"
  },
  {
    icon: Music,
    title: "30 Send/Day",
    description: "Swap up to 30 songs daily"
  },
  {
    icon: Star,
    title: "Top Artist",
    description: "See the most swapped artist of the day in Stats"
  },
  {
    icon: Users,
    title: "Celebrity Mode",
    description: "Get songs from verified artists & influencers"
  },
  {
    icon: Star,
    title: "Premium badge",
    description: "Premium badge on your profile"
  }
]

export function PremiumPage({ onBack }: PremiumPageProps) {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

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
            SoundlyBeats Premium
          </Button>
        </div>

        {/* Premium Features */}
        <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">
                Upgrade to Soundly Premium
              </h1>
              <p className="text-muted-foreground">
                Unlock exclusive features and enhance your music discovery experience
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Features List */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Premium Features</h2>
            
            <div className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-1">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <Check className="h-5 w-5 text-primary mt-1" />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Pricing */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Choose Your Plan</h2>
            
            <div className="space-y-3">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === "monthly" 
                    ? "border-primary bg-primary/5" 
                    : "border-white/10 hover:border-white/20"
                }`}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Monthly</h3>
                    <p className="text-sm text-muted-foreground">$4.99/month</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === "monthly" 
                      ? "border-primary bg-primary" 
                      : "border-white/30"
                  }`} />
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === "yearly" 
                    ? "border-primary bg-primary/5" 
                    : "border-white/10 hover:border-white/20"
                }`}
                onClick={() => setSelectedPlan("yearly")}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Yearly</h3>
                    <p className="text-sm text-muted-foreground">$39.99/year</p>
                    <p className="text-xs text-primary">Save 33%</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === "yearly" 
                      ? "border-primary bg-primary" 
                      : "border-white/30"
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Subscribe Button */}
        <Button className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300">
          Subscribe
        </Button>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center">
          Cancel anytime. Terms and conditions apply.
        </p>
      </div>
    </div>
  )
}