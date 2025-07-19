import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Music, Play, ExternalLink, MapPin, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HomePage() {
  const [musicLink, setMusicLink] = useState("")
  const [receivedSong, setReceivedSong] = useState(null)
  const { toast } = useToast()

  const handleSendSong = () => {
    if (!musicLink.trim()) return
    
    // Simulate sending and receiving a song
    setTimeout(() => {
      setReceivedSong({
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        sender: {
          name: "Alex Silva",
          profession: "Designer",
          location: "Lisbon, Portugal",
          avatar: "AS"
        },
        platform: "spotify",
        link: musicLink
      })
      setMusicLink("")
      toast({
        title: "Song Sent!",
        description: "Your song was shared with someone around the world!"
      })
    }, 1000)
  }

  const handlePlaySong = () => {
    toast({
      title: "Opening music app...",
      description: "Redirecting to your preferred music platform"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
              <Music className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Music Bridge
            </h1>
          </div>
          <p className="text-muted-foreground">
            Share a song, discover something new
          </p>
        </div>

        {/* Send Song Section */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send a Song
            </h2>
            
            <div className="space-y-3">
              <Input
                placeholder="Paste a music link (Spotify, YouTube, Apple Music, etc.)"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
              />
              
              <Button 
                onClick={handleSendSong}
                disabled={!musicLink.trim()}
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Song
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              When you send a song, you'll receive one back in the same genre!
            </p>
          </div>
        </GlassCard>

        {/* Received Song Section */}
        {receivedSong && (
          <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary">
                New Song Received!
              </h2>
              
              <div className="flex items-start space-x-4">
                <img
                  src={receivedSong.cover}
                  alt={receivedSong.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold">{receivedSong.title}</h3>
                    <p className="text-sm text-muted-foreground">{receivedSong.artist}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs bg-primary/20">
                        {receivedSong.sender.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span>{receivedSong.sender.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {receivedSong.sender.profession}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {receivedSong.sender.location}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handlePlaySong}
                  className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary-glow"
                  variant="outline"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play in App
                </Button>
                
                <Button 
                  onClick={handlePlaySong}
                  className="flex-1"
                  variant="outline"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Link
                </Button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Fun Fact */}
        <GlassCard className="text-center">
          <h3 className="font-semibold mb-2">🎵 Fun Fact</h3>
          <p className="text-sm text-muted-foreground">
            "Blinding Lights" by The Weeknd was the top charting song of Billboard Hot 100 history!
          </p>
        </GlassCard>
      </div>
    </div>
  )
}