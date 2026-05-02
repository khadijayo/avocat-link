import { Link } from 'react-router-dom'
import { ArrowRight, Gavel } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTABanner() {
  const ref = useScrollReveal()

  return (
    <section className="py-20">
      <div className="section-container">
        <div
          ref={ref}
          className="animate-on-scroll relative rounded-3xl overflow-hidden bg-navy-950 px-8 py-16 lg:px-16 lg:py-20 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, #c9973a 0%, transparent 50%),
                                radial-gradient(circle at 70% 50%, #2d3a8c 0%, transparent 60%)`,
            }}
          />
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full border border-white/5" />
          <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full border border-white/5" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 flex items-center justify-center mx-auto mb-6">
              <Gavel size={26} className="text-gold-400" />
            </div>
            <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
              Are You a Lawyer?<br />
              <span className="italic text-gradient">Join Our Network</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Expand your practice, manage appointments effortlessly, and connect
              with clients who need your expertise — all in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/LawyerSignUp" className="btn-primary text-base px-8 py-4">
                Register as a Lawyer <ArrowRight size={18} />
              </Link>
              <Link to="/Lawyers" className="btn-outline-white text-base px-8 py-4">
                Browse the Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
