
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  profession: string
  country: string
  city: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('musicbridge_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        profession: 'Developer',
        country: 'Portugal',
        city: 'Lisbon'
      }
      
      setUser(mockUser)
      localStorage.setItem('musicbridge_user', JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Partial<User> & { email: string; password: string }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email,
        profession: userData.profession || '',
        country: userData.country || '',
        city: userData.city || ''
      }
      
      setUser(newUser)
      localStorage.setItem('musicbridge_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('musicbridge_user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
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
