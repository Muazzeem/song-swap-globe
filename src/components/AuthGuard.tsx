
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, accessToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !accessToken)) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading, accessToken, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !accessToken) {
    return null
  }

  return <>{children}</>
}
