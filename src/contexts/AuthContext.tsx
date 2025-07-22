
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  city: string
  country: string
  profession: string
  name: string
  pk: number
  email: string
  first_name: string
  last_name: string
}

interface AuthResponse {
  access: string
  refresh: string
  user: User
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  accessToken: string | null
}

interface RegisterData {
  email: string
  profession: string
  country: string
  city: string
  password1: string
  password2: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Replace with your actual API URL
const API_BASE_URL = 'http://localhost:8000' // You'll need to replace this with your actual API URL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored tokens on app initialization
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')
    const storedUser = localStorage.getItem('user_data')

    if (storedAccessToken && storedUser) {
      setAccessToken(storedAccessToken)
      setUser(JSON.parse(storedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data: AuthResponse = await response.json()
      
      // Store tokens and user data
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user_data', JSON.stringify(data.user))
      
      setAccessToken(data.access)
      setUser(data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          profession: userData.profession,
          country: userData.country,
          city: userData.city,
          password1: userData.password1,
          password2: userData.password2,
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data: AuthResponse = await response.json()
      
      // Store tokens and user data
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user_data', JSON.stringify(data.user))
      
      setAccessToken(data.access)
      setUser(data.user)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear all stored data
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    
    setUser(null)
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!accessToken && !!user,
      isLoading,
      login,
      register,
      logout,
      accessToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
