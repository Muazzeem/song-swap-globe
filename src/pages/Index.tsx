import { useState } from "react"
import { AuthForm } from "@/components/AuthForm"
import { HomePage } from "@/components/HomePage"
import { LibraryPage } from "@/components/LibraryPage"
import { StatsPage } from "@/components/StatsPage"
import { ProfilePage } from "@/components/ProfilePage"
import { Navigation } from "@/components/Navigation"

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  const handleAuth = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <AuthForm onAuth={handleAuth} />
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "library":
        return <LibraryPage />
      case "stats":
        return <StatsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
};

export default Index;
