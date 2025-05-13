export function ForestBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <pattern id="forest-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M30,10 L50,30 L70,10 L50,50 Z" fill="currentColor" className="text-forest-800" />
          <path d="M10,30 L30,50 L50,30 L30,70 Z" fill="currentColor" className="text-forest-700" />
          <path d="M50,50 L70,70 L90,50 L70,90 Z" fill="currentColor" className="text-forest-600" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#forest-pattern)" />
      </svg>
    </div>
  )
}
