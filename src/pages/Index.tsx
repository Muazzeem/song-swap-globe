import { useState } from "react"
import { AuthForm } from "@/components/AuthForm"
import { HomePage } from "@/components/HomePage"
import { LibraryPage } from "@/components/LibraryPage"
import { StatsPage } from "@/components/StatsPage"
import { ProfilePage } from "@/components/ProfilePage"
import { PremiumPage } from "@/components/pages/PremiumPage"
import { AccountPage } from "@/components/pages/AccountPage"
import { ChangePasswordPage } from "@/components/pages/ChangePasswordPage"
import { SettingsPage } from "@/components/pages/SettingsPage"
import { Navigation } from "@/components/Navigation"

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [currentPage, setCurrentPage] = useState("home")

  const handleAuth = () => {
    setIsAuthenticated(true)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleBack = () => {
    setCurrentPage(activeTab)
  }

  if (!isAuthenticated) {
    return <AuthForm onAuth={handleAuth} />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />
      case "library":
        return <LibraryPage />
      case "stats":
        return <StatsPage />
      case "profile":
        return <ProfilePage />
      case "premium":
        return <PremiumPage onBack={handleBack} />
      case "account":
        return <AccountPage onBack={handleBack} />
      case "change-password":
        return <ChangePasswordPage onBack={handleBack} />
      case "settings":
        return <SettingsPage onBack={handleBack} />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  const isMainTab = ["home", "library", "stats", "profile"].includes(currentPage)

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentPage()}
      {isMainTab && (
        <Navigation 
          activeTab={currentPage} 
          onTabChange={(tab) => {
            setActiveTab(tab)
            setCurrentPage(tab)
          }} 
        />
      )}
    </div>
  )
};

export default Index;
