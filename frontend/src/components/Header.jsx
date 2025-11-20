// src/components/Header.jsx
import { Link } from 'react-router-dom'

export default function Header({ setUser }) {
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden shadow-2xl">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-2000 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-4000 animate-blob"></div>
      </div>

      {/* Optional: Add subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative container mx-auto px-8 py-10 flex justify-between items-center">
        {/* Logo - Ultra Bold & Modern */}
        <Link to="/" className="group">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent 
                           drop-shadow-2xl 
                           group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-cyan-400 
                           transition-all duration-1000">
              BudgetWise
            </span>
          </h1>
          <p className="text-cyan-300/80 text-xl font-bold tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition duration-700">
            Smart Money • Smart Life
          </p>
        </Link>

        {/* Logout Button - Sleek & Futuristic */}
        <button
          onClick={logout}
          className="relative px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl 
                     text-white font-bold text-xl tracking-wide overflow-hidden group 
                     hover:bg-white/20 hover:border-cyan-400 transform hover:scale-110 
                     transition-all duration-500 shadow-2xl"
        >
          <span className="relative z-10 flex items-center gap-3">
            Logout
            
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
        </button>
      </div>

      {/* Bottom Neon Line */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </header>
  )
}