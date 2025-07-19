import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, MapPin, Briefcase } from "lucide-react"

const receivedSongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    sender: {
      name: "Alex Silva",
      profession: "Designer", 
      location: "Lisbon, Portugal",
      avatar: "AS"
    },
    isLiked: true
  },
  {
    id: 2,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop",
    sender: {
      name: "Emma Chen",
      profession: "Teacher",
      location: "Tokyo, Japan", 
      avatar: "EC"
    },
    isLiked: false
  },
  {
    id: 3,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&h=300&fit=crop",
    sender: {
      name: "Carlos Rodriguez",
      profession: "Engineer",
      location: "Madrid, Spain",
      avatar: "CR"
    },
    isLiked: true
  }
]

export function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="pt-8 pb-4">
          <h1 className="text-2xl font-bold mb-2">Your Library</h1>
          <p className="text-muted-foreground">
            Songs you've received from around the world
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Songs Received</div>
          </GlassCard>
          
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-primary">18</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </GlassCard>
        </div>

        {/* Recent Songs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Songs</h2>
          
          {receivedSongs.map((song) => (
            <GlassCard key={song.id} className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs bg-primary/20">
                        {song.sender.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate">
                      {song.sender.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {song.sender.profession}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {song.sender.location}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`h-8 w-8 p-0 ${song.isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-4 w-4 ${song.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}