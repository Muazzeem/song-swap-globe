import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, MapPin, Briefcase, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { ShareModal } from "@/components/modals/ShareModal"



export function LibraryPage() {
  const [activeTab, setActiveTab] = useState("library")
  const [currentPage, setCurrentPage] = useState("library")
  const [receivedSongs, setReceivedSongs] = useState([])
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
  
  // You'll need to replace this with your actual access token
  const { isAuthenticated, accessToken } = useAuth()
  
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
        <div className="max-w-md mx-auto flex items-center justify-center h-64">
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
        <div className="max-w-md mx-auto">
          <GlassCard className="text-center text-red-400">
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
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="pt-6 pb-2 text-center">
          <h1 className="text-2xl font-bold mb-1 text-white">Your Library</h1>
          <p className="text-slate-300 text-sm">
            Songs you've received from around the world
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-primary">{pagination.count}</div>
            <div className="text-xs text-slate-300">Songs Received</div>
          </GlassCard>
          
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(receivedSongs.map(song => 
                song.received_song?.genre?.[0] || 'Unknown'
              )).size}
            </div>
            <div className="text-xs text-slate-300">Genres</div>
          </GlassCard>
        </div>

        {/* Recent Songs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Songs</h2>
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            )}
          </div>
          
          {receivedSongs.length === 0 ? (
            <GlassCard className="text-center text-slate-300">
              <p>No songs in your library yet.</p>
            </GlassCard>
          ) : (
            receivedSongs.map((item) => {
              const song = item.received_song
              return (
                <GlassCard key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={song.cover_image_url}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-white">{song.title}</h3>
                      <p className="text-sm text-slate-300 truncate">{song.artist}</p>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs bg-blue-400/20 text-blue-200">
                            {song.uploader.name.split(' ')[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-300 truncate">
                          {song.uploader.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {song.genre?.[0] || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {song.uploader.city}, {song.uploader.country}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-slate-300 hover:text-blue-400"
                        onClick={() => window.open(song.url, '_blank')}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className={`h-8 w-8 p-0 ${
                          likedSongs.has(item.id) 
                            ? 'text-red-500' 
                            : 'text-slate-300 hover:text-red-400'
                        }`}
                        onClick={() => toggleLike(item.id)}
                      >
                        <Heart className={`h-4 w-4 ${
                          likedSongs.has(item.id) ? 'fill-current' : ''
                        }`} />
                      </Button>
                      
                      <Button 
                  onClick={() => setShowShare(true)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-300 hover:text-blue-400"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                    </div>
                  </div>
                </GlassCard>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {(pagination.next || pagination.previous) && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!pagination.previous || loading}
              className="flex items-center space-x-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            
            <div className="text-sm text-slate-300">
              Page {pagination.currentPage}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!pagination.next || loading}
              className="flex items-center space-x-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        song={{ title: "receivedSong.title", artist: "receivedSong.artist", cover: "receivedSong.cover_image_url" }}
      />
    </div>
  )
}

export default LibraryPage
