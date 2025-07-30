import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { GlassCard } from "./ui/glass-card"
import { Progress } from "./ui/progress"

export default function TopGenre() {
    const [topGenres, setTopGenres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/genre-distribution?limit=5`)
                if (!response.ok) throw new Error("Failed to fetch genre data")
                const data = await response.json()
                setTopGenres(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchGenres()
    }, [])

    return (
        <GlassCard className="p-6">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Popular Genres
                </h2>

                {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {topGenres.map((genre) => (
                            <div key={genre.genre} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{genre.genre}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {genre.count} songs
                                        </span>
                                        <span className="text-sm font-medium text-primary">
                                            {genre.percentage}
                                        </span>
                                    </div>
                                </div>
                                <Progress value={parseFloat(genre.percentage)} className="h-3" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </GlassCard>
    )
}

