import { GlassCard } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { Globe, Music, Users, TrendingUp } from "lucide-react"

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="pt-8 pb-4">
          <h1 className="text-2xl font-bold mb-2">Your Stats</h1>
          <p className="text-muted-foreground">
            Your musical journey around the world
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Songs Shared</div>
          </GlassCard>
          
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">20</div>
            <div className="text-xs text-muted-foreground">People Connected</div>
          </GlassCard>
        </div>

        {/* Countries */}
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Total Countries: 4
              </h2>
            </div>
            
            <div className="text-sm text-muted-foreground mb-3">
              Portugal, USA, Japan, Germany
            </div>
            
            <div className="space-y-3">
              {countryStats.map((stat, index) => (
                <div key={stat.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{stat.flag}</span>
                    <span className="text-sm">{stat.country}</span>
                  </div>
                  <span className="text-sm font-medium">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Top Genres */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Most Frequent Genres
            </h2>
            
            <div className="space-y-3">
              {topGenres.map((genre) => (
                <div key={genre.genre} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{genre.genre}</span>
                    <span className="text-muted-foreground">{genre.count} songs</span>
                  </div>
                  <Progress value={genre.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Recent Locations */}
        <GlassCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Received From:</h2>
            
            <div className="space-y-2">
              {recentLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{location.city}, {location.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Achievement */}
        <GlassCard className="text-center border-primary/20 bg-gradient-to-br from-card/90 to-primary/5">
          <div className="space-y-2">
            <div className="text-2xl">🌍</div>
            <h3 className="font-semibold text-primary">Global Explorer</h3>
            <p className="text-xs text-muted-foreground">
              You've connected with people from 4 different countries!
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}