
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'

interface StatisticsData {
  songs_received: number
  songs_shared: number
  users_exchanged_with: number
  countries_involved: number
  detailed_stats: {
    songs_received: number
    countries_list: string[]
    cities_list: string[]
  }
  geographical_breakdown: {
    by_country: Record<string, {
      users_count: number
      songs_exchanged: number
    }>
    by_city: Record<string, {
      users_count: number
      songs_exchanged: number
      country: string
    }>
    by_city_country: Record<string, {
      users_count: number
      songs_exchanged: number
    }>
  }
  top_locations: {
    countries: Array<{
      country: string
      users_count: number
      songs_exchanged: number
    }>
    cities: Array<{
      city: string
      country: string
      users_count: number
      songs_exchanged: number
    }>
  }
}

const fetchStatistics = async (token: string): Promise<StatisticsData> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/statistics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch statistics')
  }
  console.log(response)
  return response.json()
}

export const useStatistics = () => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['statistics'],
    queryFn: () => fetchStatistics(accessToken!),
    enabled: !!accessToken,
  })
}
