"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-forest-900 rounded-full p-2 shadow-md z-50 flex items-center gap-2 text-sm font-medium border border-forest-100 dark:border-forest-800">
      {theme === "dark" ? (
        <>
          <Moon className="h-4 w-4 text-forest-300" />
          <span className="pr-2">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4 text-forest-600" />
          <span className="pr-2">Light Mode</span>
        </>
      )}
    </div>
  )
}
