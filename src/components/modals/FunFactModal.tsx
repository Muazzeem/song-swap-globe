import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { X } from "lucide-react"

interface FunFactModalProps {
  isOpen: boolean
  onClose: () => void
  fact: {
    title: string
    description: string
    source?: string
  }
}

export function FunFactModal({ isOpen, onClose, fact }: FunFactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-transparent border-0 p-4">
        <GlassCard className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="pt-8 pb-4">
            <DialogHeader className="text-center space-y-4">
              <DialogTitle className="text-2xl font-bold text-primary">
                <div>🎵 Fun Fact</div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <h3 className="font-semibold text-center">{fact.title}</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {fact.description}
              </p>
              
              {fact.source && (
                <p className="text-xs text-muted-foreground text-center italic">
                  Source: {fact.source}
                </p>
              )}
              
              <Button
                onClick={onClose}
                className="w-full mt-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </GlassCard>
      </DialogContent>
    </Dialog>
  )
}