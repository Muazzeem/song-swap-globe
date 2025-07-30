
import { GlassCard } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { Globe, Music, Users, TrendingUp, Loader2 } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useState } from "react"
import { useStatistics } from "@/hooks/useStatistics"
import { useToast } from "@/hooks/use-toast"
import TopGenre from "@/components/TopGenre"

// Country code to flag mapping
const countryFlags: Record<string, string> = {
  'UK': '🇬🇧',
  'USA': '🇺🇸',
  'Portugal': '🇵🇹',
  'Japan': '🇯🇵',
  'Germany': '🇩🇪',
  'Brazil': '🇧🇷',
  'France': '🇫🇷',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'India': '🇮🇳',
  'China': '🇨🇳',
  'South Korea': '🇰🇷',
  'Mexico': '🇲🇽',
  'Argentina': '🇦🇷',
  'Netherlands': '🇳🇱',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
}

export function StatsPage() {
  const [activeTab, setActiveTab] = useState("stats")
  const [currentPage, setCurrentPage] = useState("stats")
  const { data: stats, isLoading, error } = useStatistics()
  const { toast } = useToast()

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load statistics. Please try again.",
      variant: "destructive",
    })
  }

  if (isLoading) {
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
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">Loading statistics...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
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
          <div className="text-center pt-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">No Data Available</h1>
            <p className="text-muted-foreground">Statistics will appear here once you start sharing music.</p>
          </div>
        </div>
      </div>
    )
  }

  const totalSongs = stats.songs_shared + stats.detailed_stats.songs_received
  const topGenres = [
    { genre: "Pop", count: Math.floor(totalSongs * 0.4), percentage: 40 },
    { genre: "Hip-Hop", count: Math.floor(totalSongs * 0.3), percentage: 30 },
    { genre: "Electronic", count: Math.floor(totalSongs * 0.2), percentage: 20 },
    { genre: "Rock", count: Math.floor(totalSongs * 0.1), percentage: 10 }
  ]

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
        
        {/* Header */}
        <div className="pt-8 pb-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">Your Stats</h1>
          <p className="text-muted-foreground text-lg">
            Your musical journey around the world
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Music className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.songs_shared || 0}
            </div>
            <div className="text-sm text-muted-foreground">Songs Shared</div>
          </GlassCard>
          
          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.users_exchanged_with || 0} 
            </div>
            <div className="text-sm text-muted-foreground">People Connected</div>
          </GlassCard>

          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.countries_involved || 0}
            </div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </GlassCard>

          <GlassCard className="text-center p-6 border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
            <div className="text-3xl lg:text-4xl mb-2">🌍</div>
            <h3 className="font-semibold text-primary text-sm lg:text-base">Global Explorer</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.countries_involved || 0} countries explored!
            </p>
          </GlassCard>
        </div>

        {/* Content Grid - Two columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Countries */}
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-3">
                    <Globe className="h-6 w-6 text-primary" />
                    Countries Explored
                  </h2>
                </div>
                
                <div className="text-muted-foreground mb-4">
                  {stats.detailed_stats.countries_list.join(', ')}
                </div>
                
                <div className="space-y-4">
                  {stats.top_locations.countries.map((stat, index) => (
                    <div key={stat.country} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{countryFlags[stat.country] || '🌍'}</span>
                        <span className="font-medium">{stat.country}</span>
                      </div>
                      <span className="font-semibold text-primary">{stat.songs_exchanged} songs</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Recent Locations */}
            <GlassCard className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Recent Connections</h2>
                
                <div className="space-y-3">
                  {stats.top_locations.cities.map((location, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        <span>{location.city}, {location.country}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{location.songs_exchanged} songs</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Additional stats card */}
            <GlassCard className="p-6 text-center bg-gradient-to-br from-card/90 to-accent/10">
              <div className="space-y-4">
                <div className="text-4xl">🎵</div>
                <h3 className="text-xl font-semibold">Music Exchange</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{stats.songs_shared}</div>
                    <div className="text-sm text-muted-foreground">Shared</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{stats.songs_received}</div>
                    <div className="text-sm text-muted-foreground">Received</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Top Genres */}
            <TopGenre />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage
