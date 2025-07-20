
import { useAuth } from '@/contexts/AuthContext'
import { AuthForm } from '@/components/AuthForm'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, accessToken } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check both authentication status and token presence
  if (!isAuthenticated || !accessToken) {
    return <AuthForm />
  }

  return <>{children}</>
}
