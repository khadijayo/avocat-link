import { Link } from 'react-router-dom'
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Find a Lawyer', to: '/Lawyers' },
    { label: 'Book Consultation', to: '/BookConsultation' },
    { label: 'My Consultations', to: '/MyConsultations' },
    { label: 'Lawyer Dashboard', to: '/LawyerDashboard' },
  ],
  Lawyers: [
    { label: 'Join as a Lawyer', to: '/LawyerSignUp' },
    { label: 'Lawyer Dashboard', to: '/LawyerDashboard' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/PrivacyPolicy' },
    { label: 'Terms of Service', to: '/TermsOfService' },
    { label: 'Cookie Policy', to: '/CookiePolicy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                <Scale size={18} className="text-white" />
              </div>
              <span className="font-serif font-bold text-xl text-white">Avocat-Link</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Algeria's refined legal consultation platform. Connecting clients with verified
              legal experts for seamless, secure professional appointments.
            </p>
            <div className="space-y-2.5 text-sm text-white/50">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-400 flex-shrink-0" />
                <span>contact@avocat-link.dz</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-400 flex-shrink-0" />
                <span>+213 (0) 555 00 00 00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold-400 flex-shrink-0" />
                <span>Algiers, Algeria</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm text-white mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/50 hover:text-gold-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Avocat-Link. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center transition-colors duration-200"
              >
                <Icon size={14} className="text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
