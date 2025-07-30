import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Music, Play, ExternalLink, MapPin, Briefcase, Menu, Share2, Lightbulb, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FunFactModal } from "@/components/modals/FunFactModal"
import { ShareModal } from "@/components/modals/ShareModal"
import { Navigation } from "./Navigation"
import { useAuth } from "@/contexts/AuthContext"

interface HomePageProps {
  onNavigate?: (page: string) => void
}

interface Song {
  uid: string
  title: string
  artist: string
  album: string
  genre: string[]
  url: string
  duration_seconds: number
  release_date: string
  cover_image_url: string
  platform: {
    uid: string
    name: string
    domain: string
  }
  uploader_email: string
  created_at: string
  updated_at: string
}

interface MatchedUser {
  city: string
  country: string
  name: string
  id: string
  email: string
  profile_image_url: string
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { accessToken } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [musicLink, setMusicLink] = useState("")
  const [receivedSong, setReceivedSong] = useState<Song | null>(null)
  const [matchedUser, setMatchedUser] = useState<MatchedUser | null>(null)
  const [showFunFact, setShowFunFact] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()


  const handleSendSong = async () => {
    if (!musicLink) return

    try {
      setIsLoading(true)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url: musicLink.trim() }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.error || "Failed to send song")
      }

      const data = await response.json()

      if (data.auto_matched && data.matched_with) {
        setReceivedSong(data.matched_with.song)
        setMatchedUser(data.matched_with.user)
        
        toast({
          title: "Song Sent & Matched!",
          description: `Your song "${data.song.title}" was shared and you received "${data.matched_with.song.title}" in return!`
        })
      } else {
        toast({
          title: "Song Sent!",
          description: `Your song "${data.song.title}" was shared successfully. Waiting for a match...`
        })
      }
      
      setMusicLink("")
    } catch (error) {
      console.error('Error sending song:', error)
      toast({
        title: "Error",
        description: "Failed to send song. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaySong = () => {
    if (receivedSong?.url) {
      window.open(receivedSong.url, '_blank')
      toast({
        title: "Opening music app...",
        description: "Redirecting to your preferred music platform"
      })
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }


  const funFactData = receivedSong ? {
    title: "Song Info",
    description: `"${receivedSong.title}" by ${receivedSong.artist} was released in ${formatDate(receivedSong.release_date)} and has a duration of ${formatDuration(receivedSong.duration_seconds)}. Genre: ${receivedSong.genre.join(', ')}.`,
    source: receivedSong.platform.name
  } : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
      <Navigation 
        activeTab={currentPage} 
        onTabChange={(tab) => {
          setActiveTab(tab)
          setCurrentPage(tab)
        }} 
      />
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header with Menu */}
        <div className="flex items-center justify-between pb-4 pt-5">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Soundly
              </h1>
            </div>
            <p className="text-muted-foreground">
              Share a song, discover something new
            </p>
          </div>
          
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Send Song Section */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
              <Send className="h-5 w-5 text-primary" />
              <span className="text-primary">Send a Song</span>
            </h2>
            
            <div className="space-y-3">
              <Input
                placeholder="Paste a music link from Spotify"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                disabled={isLoading}
                className="h-12 bg-input/50 border-white/10 focus:border-primary/50"
              />
              
              <Button 
                onClick={handleSendSong}
                disabled={!musicLink.trim() || isLoading}
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all text-white duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Song
                  </>
                )}
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
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary">
                  New Song Received!
                </h2>
                <Button
                  onClick={handlePlaySong}
                  size="sm"
                  variant="outline"
                  className="px-3 bg-gradient-primary hover:shadow-glow transition-all text-white duration-300"
                >
                  <Play className="mr-0 h-4 w-4 cursor-pointer" />
                </Button>
              </div>
              
              <div className="flex items-start space-x-4">
                <img
                  src={receivedSong.cover_image_url}
                  alt={receivedSong.title}
                  className="w-16 h-16 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                  }}
                />
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold">{receivedSong.title}</h3>
                    <p className="text-sm text-muted-foreground">{receivedSong.artist}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Music className="h-3 w-3" />
                      {receivedSong.genre.join(', ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {receivedSong.platform.name}
                    </span>
                  </div>
                </div>
              </div>

              {matchedUser && (
                <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={matchedUser.profile_image_url} />
                    <AvatarFallback className="text-md bg-primary/20 text-primary">
                      {matchedUser.name.split(' ')[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {matchedUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {matchedUser.city}, {matchedUser.country}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {funFactData && (
                  <Button 
                    onClick={() => setShowFunFact(true)}
                    className="flex-1 bg-primary/50 hover:bg-primary/100 text-white"
                    variant="outline"
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Fun Fact
                  </Button>
                )}
                
                <Button 
                  onClick={handlePlaySong}
                  className="flex-1"
                  variant="outline"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Link
                </Button>
                
                <Button 
                  onClick={() => setShowShare(true)}
                  size="sm"
                  variant="outline"
                  className="px-3"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Modals */}
        {funFactData && (
          <FunFactModal 
            isOpen={showFunFact}
            onClose={() => setShowFunFact(false)}
            fact={funFactData}
          />
        )}
        
        {receivedSong && (
          <ShareModal
            isOpen={showShare}
            onClose={() => setShowShare(false)}
            song={{ title: receivedSong.title, artist: receivedSong.artist, cover: receivedSong.cover_image_url }}
          />
        )}
      </div>
    </div>
  )
}
