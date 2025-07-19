import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "backdrop-blur-glass border border-white/10 rounded-xl p-6",
        "bg-card/80 shadow-elevated transition-smooth",
        "hover:shadow-glow hover:border-white/20",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}