import { Star, Quote } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    name: 'Yasmine Boukhari',
    role: 'Business Owner, Algiers',
    rating: 5,
    text: 'Avocat-Link made finding a corporate lawyer incredibly easy. I had my first consultation within 24 hours, and the process was completely transparent from start to finish.',
    initials: 'YB',
  },
  {
    name: 'Rachid Ferhat',
    role: 'Engineer, Oran',
    rating: 5,
    text: 'I needed urgent legal advice for a real estate dispute. The platform connected me with an expert lawyer the same day. The service was professional and the fee structure clear.',
    initials: 'RF',
  },
  {
    name: 'Nadia Messaoudi',
    role: 'Teacher, Constantine',
    rating: 5,
    text: 'Going through a difficult family situation, I found compassionate and highly competent lawyers through Avocat-Link. The booking process was seamless and stress-free.',
    initials: 'NM',
  },
]

function TestimonialCard({ t, index }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="animate-on-scroll bg-white rounded-2xl p-7 border border-gray-100 shadow-sm card-hover"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Quote size={28} className="text-gold-400 mb-4 opacity-60" />
      <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
          <div className="text-gray-400 text-xs">{t.role}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={13} className="text-gold-400 fill-gold-400" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const headingRef = useScrollReveal()

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="section-container">
        <div ref={headingRef} className="animate-on-scroll text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Client Stories</span>
          <h2 className="section-title mt-3 mb-4">Trusted by Thousands</h2>
          <p className="text-gray-500 leading-relaxed">
            Real experiences from clients who found the legal help they needed through Avocat-Link.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
