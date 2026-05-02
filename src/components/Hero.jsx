import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Clock, Star } from 'lucide-react'

const stats = [
  { icon: Shield, value: '500+', label: 'Verified Lawyers' },
  { icon: Clock, value: '24/7', label: 'Available Support' },
  { icon: Star, value: '4.9/5', label: 'Client Rating' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #2d3a8c 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #c9973a22 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, #1e2a6e 0%, transparent 50%)`,
          }}
        />
        {/* Geometric decorations */}
        <div className="absolute top-32 right-8 lg:right-24 w-64 h-64 lg:w-96 lg:h-96 rounded-full border border-white/5" />
        <div className="absolute top-48 right-16 lg:right-32 w-40 h-40 lg:w-60 lg:h-60 rounded-full border border-white/5" />
        <div className="absolute bottom-20 left-8 lg:left-20 w-32 h-32 rounded-full bg-gold-500/5" />
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 80" fill="none">
          <path d="M0 80H1440V40C1200 80 960 0 720 20C480 40 240 80 0 80Z" fill="white" />
        </svg>
      </div>

      <div className="section-container relative z-10 pt-24 pb-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Algeria's Premier Legal Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Justice Starts With the{' '}
            <span className="italic text-gradient">Right Lawyer</span>
          </h1>

          <p className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mb-10 font-light">
            Avocat-Link connects you with verified, experienced legal professionals for seamless
            consultation scheduling — confidential, efficient, and professional.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/Lawyers" className="btn-primary text-base px-8 py-4">
              Find a Lawyer <ArrowRight size={18} />
            </Link>
            <Link to="/LawyerSignUp" className="btn-outline-white text-base px-8 py-4">
              Join as a Lawyer
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl leading-none">{value}</div>
                  <div className="text-white/50 text-sm mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
