import { HomePage } from "@/components/HomePage"
import { Navigation } from "@/components/Navigation"
import { useState } from "react"

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("home")
    const [currentPage, setCurrentPage] = useState("home")
  return (
    <div className="min-h-screen bg-background">
        <Navigation 
          activeTab={currentPage} 
          onTabChange={(tab) => {
            setActiveTab(tab)
            setCurrentPage(tab)
          }} 
        />
      <HomePage />
    </div>
  )
}