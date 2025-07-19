import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { X, Instagram, Facebook } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  song: {
    title: string
    artist: string
    cover: string
  }
}

export function ShareModal({ isOpen, onClose, song }: ShareModalProps) {
  const handleShare = (platform: string) => {
    // Simulate sharing to social platform
    console.log(`Sharing to ${platform}:`, song)
    onClose()
  }

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
              <DialogTitle className="text-xl font-bold">
                Share
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <div className="text-center space-y-2">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-16 h-16 rounded-lg mx-auto object-cover"
                />
                <div>
                  <h3 className="font-semibold">{song.title}</h3>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => handleShare('instagram')}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Instagram Story
                </Button>
                
                <Button
                  onClick={() => handleShare('facebook')}
                  className="w-full h-12 bg-[#1877F2] hover:bg-[#166FE5] text-white"
                >
                  <Facebook className="mr-2 h-5 w-5" />
                  Facebook Story
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full mt-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        </GlassCard>
      </DialogContent>
    </Dialog>
  )
}