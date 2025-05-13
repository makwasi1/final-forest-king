import { Leaf } from "lucide-react"

export function ForestLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Leaf className="h-8 w-8 text-forest-600" />
        <Leaf className="h-6 w-6 text-forest-400 absolute top-1 left-1 transform rotate-45" />
      </div>
      <span className="text-lg font-bold text-forest-800 dark:text-forest-300">Forest King</span>
    </div>
  )
}
