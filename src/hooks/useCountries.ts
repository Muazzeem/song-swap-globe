
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface Country {
  name: string
  alpha_2: string
  alpha_3: string
  flag_url: string
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken } = useAuth()

  const searchCountries = async (query: string = '') => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/countries?search=${query}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCountries(data)
      }
    } catch (error) {
      console.error('Error fetching countries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    searchCountries()
  }, [])

  return {
    countries,
    isLoading,
    searchCountries
  }
}
