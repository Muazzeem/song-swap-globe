import { useState } from "react"
import { AuthForm } from "@/components/AuthForm"

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  const handleAuth = () => {
    setIsAuthenticated(true)
  }
  return (
    <div className="min-h-screen bg-background">
      <AuthForm onAuth={handleAuth} />
    </div>
  )
};

export default Index;
