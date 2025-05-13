"use client"

import { Leaf, TreePine, TreeDeciduous, Wind } from "lucide-react"
import { useTheme } from "next-themes"

export function ForestDashboardHeader() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${
        isDark
          ? "bg-gradient-to-r from-forest-800 to-forest-950 text-white"
          : "bg-gradient-to-r from-forest-100 to-forest-300 text-forest-900"
      } p-8 mb-6 transition-colors duration-500`}
    >
      <div className="absolute top-0 right-0 opacity-10">
        <TreePine className={`h-40 w-40 ${isDark ? "text-white" : "text-forest-900"}`} />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <TreeDeciduous className={`h-32 w-32 ${isDark ? "text-white" : "text-forest-900"}`} />
      </div>
      <div className="absolute top-10 left-40 opacity-10 animate-float">
        <Leaf className={`h-10 w-10 ${isDark ? "text-white" : "text-forest-900"}`} />
      </div>
      <div className="absolute bottom-10 right-40 opacity-10 animate-float" style={{ animationDelay: "1s" }}>
        <Leaf className={`h-8 w-8 ${isDark ? "text-white" : "text-forest-900"}`} />
      </div>
      <div className="absolute top-20 right-60 opacity-10 animate-float" style={{ animationDelay: "2s" }}>
        <Wind className={`h-12 w-12 ${isDark ? "text-white" : "text-forest-900"}`} />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Forest King</h1>
        <p className={isDark ? "text-forest-100" : "text-forest-700"}>
          Manage your farm resources, and workers easily. Track your business process for better management.
        </p>
      </div>
    </div>
  )
}
