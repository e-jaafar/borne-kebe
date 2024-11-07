'use client'

export function Logo() {
  return (
    <div className="flex items-center space-x-3">
      {/* Container du logo avec effet de profondeur et gradient */}
      <div className="relative group">
        {/* Effet de halo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        
        {/* Logo principal */}
        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 rounded-lg transform transition-all duration-300 group-hover:scale-105 shadow-lg">
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg" />
          
          {/* Initiales avec effet 3D */}
          <span className="relative text-lg font-bold text-white tracking-wider font-serif bg-clip-text">
            BK
          </span>
          
          {/* Effet de reflet */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Texte du logo avec gradient */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-105">
          Borne Kébè
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
          PREMIUM PHOTOBOOTH
        </span>
      </div>
    </div>
  )
} 