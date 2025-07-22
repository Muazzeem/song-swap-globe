
import { GlassCard } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { Globe, Music, Users, TrendingUp } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useState } from "react"

const countryStats = [
  { country: "Portugal", flag: "🇵🇹", count: 4 },
  { country: "USA", flag: "🇺🇸", count: 3 },
  { country: "Japan", flag: "🇯🇵", count: 3 },
  { country: "Germany", flag: "🇩🇪", count: 2 },
  { country: "Brazil", flag: "🇧🇷", count: 2 }
]

const topGenres = [
  { genre: "Pop", count: 8, percentage: 40 },
  { genre: "Hip-Hop", count: 6, percentage: 30 },
  { genre: "Electronic", count: 4, percentage: 20 },
  { genre: "Rock", count: 2, percentage: 10 }
]

const recentLocations = [
  { city: "Lisbon", country: "Portugal" },
  { city: "New York", country: "USA" },
  { city: "Tokyo", country: "Japan" },
  { city: "Berlin", country: "Germany" },
  { city: "São Paulo", country: "Brazil" }
]

export function StatsPage() {
    const [activeTab, setActiveTab] = useState("stats")
    const [currentPage, setCurrentPage] = useState("stats")
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
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="pt-8 pb-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Your Stats</h1>
          <p className="text-muted-foreground text-lg">
            Your musical journey around the world
          </p>
        </div>

        {/* Main Stats - Always on top, responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Music className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">24</div>
            <div className="text-sm text-muted-foreground">Songs Shared</div>
          </GlassCard>
          
          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">20</div>
            <div className="text-sm text-muted-foreground">People Connected</div>
          </GlassCard>

          <GlassCard className="text-center p-6">
            <div className="flex items-center justify-center mb-3">
              <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">4</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </GlassCard>

          <GlassCard className="text-center p-6 border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
            <div className="text-3xl lg:text-4xl mb-2">🌍</div>
            <h3 className="font-semibold text-primary text-sm lg:text-base">Global Explorer</h3>
            <p className="text-xs text-muted-foreground mt-1">
              4 countries explored!
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
                  Portugal, USA, Japan, Germany, Brazil
                </div>
                
                <div className="space-y-4">
                  {countryStats.map((stat, index) => (
                    <div key={stat.country} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{stat.flag}</span>
                        <span className="font-medium">{stat.country}</span>
                      </div>
                      <span className="font-semibold text-primary">{stat.count} songs</span>
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
                  {recentLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        <span>{location.city}, {location.country}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Genres */}
            <GlassCard className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Popular Genres
                </h2>
                
                <div className="space-y-4">
                  {topGenres.map((genre) => (
                    <div key={genre.genre} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{genre.genre}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{genre.count} songs</span>
                          <span className="text-sm font-medium text-primary">{genre.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={genre.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Additional stats card */}
            <GlassCard className="p-6 text-center bg-gradient-to-br from-card/90 to-accent/10">
              <div className="space-y-4">
                <div className="text-4xl">🎵</div>
                <h3 className="text-xl font-semibold">Music Diversity</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Genres</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">20</div>
                    <div className="text-sm text-muted-foreground">Artists</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StatsPage;
