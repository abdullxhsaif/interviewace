import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mic, Menu, X, LayoutDashboard, Tag, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0a0b1a]/80 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </span>
          Interview<span className="gradient-text">Ace</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          {user ? (
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-white transition">Sign in</Link>
          )}
          <button
            onClick={() => navigate(user ? '/dashboard' : '/login')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold hover:opacity-90 transition"
          >
            {user ? 'Open App' : 'Start Free'}
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 px-5 py-4 space-y-2 bg-[#0a0b1a]">
          <Link to="/pricing" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2 text-gray-200">
            <Tag className="w-4 h-4" /> Pricing
          </Link>
          {user ? (
            <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2 text-gray-200">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2 text-gray-200">
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          )}
          <button
            onClick={() => { setOpen(false); navigate(user ? '/dashboard' : '/login') }}
            className="w-full mt-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold"
          >
            {user ? 'Open App' : 'Start Free'}
          </button>
        </div>
      )}
    </header>
  )
}
