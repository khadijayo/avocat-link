import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Scale } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find a Lawyer', to: '/Lawyers' },
  { label: 'My Consultations', to: '/MyConsultations' },
  { label: 'For Lawyers', to: '/LawyerSignUp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/' || location.pathname === '/Landing'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100'
          : 'bg-transparent'
        }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-navy-900 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
              <Scale size={18} className="text-white" />
            </div>
            <span className={`font-serif font-bold text-xl transition-colors duration-300
              ${scrolled || !isHome ? 'text-navy-900' : 'text-white'}`}>
              Avocat<span className="text-gradient">-Link</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 relative group
                  ${scrolled || !isHome ? 'text-navy-700 hover:text-navy-900' : 'text-white/90 hover:text-white'}
                  ${location.pathname === link.to ? 'font-semibold' : ''}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300
                  ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/BookConsultation"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200
              ${scrolled || !isHome ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10'}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden
        ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-navy-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${location.pathname === link.to
                  ? 'bg-navy-50 text-navy-900 font-semibold'
                  : 'text-navy-700 hover:bg-navy-50'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Link to="/BookConsultation" className="btn-primary w-full justify-center text-sm">
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
