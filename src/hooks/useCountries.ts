
import { useState, useEffect } from 'react'

interface Country {
  name: string
  alpha_2: string
  alpha_3: string
  flag_url: string
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchCountries = async (query: string = '') => {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/countries?search=${query}`, {
        headers: {
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
