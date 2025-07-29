import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, MapPin, Briefcase, Loader2, ChevronLeft, ChevronRight, Music, Users, Globe } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { ShareModal } from "@/components/modals/ShareModal"
import { useStatistics } from "@/hooks/useStatistics"

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState("library")
  const [currentPage, setCurrentPage] = useState("library")
  const [receivedSongs, setReceivedSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
  })
  const [likedSongs, setLikedSongs] = useState(new Set())
  
  const { isAuthenticated, accessToken } = useAuth()
  const { data: stats, isLoading } = useStatistics()
  
  const fetchSongs = async (url = null) => {
    try {
      setLoading(true)
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/received-songs`
      
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      setReceivedSongs(data.results || [])
      setPagination({
        count: data.count || 0,
        next: data.next,
        previous: data.previous,
        currentPage: url && url.includes('page=') 
          ? parseInt(new URL(url).searchParams.get('page')) 
          : 1
      })
      
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching songs:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchSongs()
  }, [])
  
  const handleNextPage = () => {
    if (pagination.next) {
      fetchSongs(pagination.next)
    }
  }
  
  const handlePreviousPage = () => {
    if (pagination.previous) {
      fetchSongs(pagination.previous)
    }
  }
  
  const toggleLike = (songId) => {
    setLikedSongs(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(songId)) {
        newLiked.delete(songId)
      } else {
        newLiked.add(songId)
      }
      return newLiked
    })
  }
  
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  if (loading && receivedSongs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
        <Navigation 
          activeTab={currentPage} 
          onTabChange={(tab) => {
            setActiveTab(tab)
            setCurrentPage(tab)
          }} 
        />
        <div className="max-w-5xl mx-auto flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            <span className="text-white">Loading your library...</span>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
        <Navigation 
          activeTab={currentPage} 
          onTabChange={(tab) => {
            setActiveTab(tab)
            setCurrentPage(tab)
          }} 
        />
        <div className="max-w-5xl mx-auto">
          <GlassCard className="text-center text-red-400 max-w-md mx-auto">
            <p>Error loading songs: {error}</p>
            <Button 
              onClick={() => fetchSongs()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </GlassCard>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24 pt-24">
      <Navigation 
        activeTab={currentPage} 
        onTabChange={(tab) => {
          setActiveTab(tab)
          setCurrentPage(tab)
        }} 
      />
      
      {/* Container with responsive max-width */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="pt-8 pb-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white">Your Library</h1>
          <p className="text-muted-foreground text-lg">
            Songs you've received from around the world
          </p>
        </div>

        {/* Stats Cards - Always on top, responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Music className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.songs_received}
            </div>
            <div className="text-sm text-muted-foreground">Songs Received</div>
          </GlassCard>

          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.users_exchanged_with}
            </div>
            <div className="text-sm text-muted-foreground">People Connected</div>
          </GlassCard>

          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.countries_involved}
            </div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </GlassCard>

          <GlassCard className="text-center p-6 border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
            <div className="text-3xl lg:text-4xl mb-2">🌍</div>
            <h3 className="font-semibold text-primary text-sm lg:text-base">Global Explorer</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.countries_involved} countries explored!
            </p>
          </GlassCard>
        </div>

        {/* Songs Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-semibold text-white">Recent Songs</h2>
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            )}
          </div>
          
          {receivedSongs.length === 0 ? (
            <GlassCard className="text-center text-slate-300 p-8">
              <div className="text-6xl mb-4">🎶</div>
              <h3 className="text-xl font-semibold mb-2">No songs yet</h3>
              <p>Your music collection will appear here once you start receiving songs.</p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {receivedSongs.map((item) => {
                const song = item.received_song
                return (
                  <GlassCard key={item.id} className="p-6 hover:shadow-glow transition-all duration-300">
                    <div className="space-y-4">
                      {/* Song Cover and Info */}
                      <div className="flex items-start space-x-4">
                        <img
                          src={song.cover_image_url}
                          alt={song.title}
                          className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-white truncate">{song.title}</h3>
                          <p className="text-muted-foreground truncate">{song.artist}</p>
                          
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {song.genre?.[0] || 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Uploader Info */}
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {song.uploader.name.split(' ')[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {song.uploader.name}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {song.uploader.city}, {song.uploader.country}
                          </p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex justify-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                          onClick={() => window.open(song.url, '_blank')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`${
                            likedSongs.has(item.id) 
                              ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20' 
                              : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                          }`}
                          onClick={() => toggleLike(item.id)}
                        >
                          <Heart className={`h-4 w-4 ${
                            likedSongs.has(item.id) ? 'fill-current' : ''
                          }`} />
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            setSelectedSong(song)
                            setShowShare(true)
                          }}
                          size="sm"
                          variant="outline"
                          className="bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {(pagination.next || pagination.previous) && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePreviousPage}
              disabled={!pagination.previous || loading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-muted-foreground px-4">
              Page {pagination.currentPage}
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleNextPage}
              disabled={!pagination.next || loading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
      
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        song={{
          title: selectedSong?.title,
          artist: selectedSong?.artist,
          cover: selectedSong?.cover_image_url
        }}
      />
    </div>
  )
}

export default LibraryPage
