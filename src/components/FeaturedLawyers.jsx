import { Link } from 'react-router-dom'
import { Star, MapPin, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const lawyers = [
  {
    id: 1,
    name: 'Me. Amira Benali',
    specialty: 'Criminal Defense',
    location: 'Algiers',
    rating: 4.9,
    reviews: 124,
    experience: '12 years',
    languages: ['Arabic', 'French'],
    available: true,
    initials: 'AB',
    color: 'from-navy-700 to-navy-900',
  },
  {
    id: 2,
    name: 'Me. Karim Hadj',
    specialty: 'Business & Corporate Law',
    location: 'Oran',
    rating: 4.8,
    reviews: 89,
    experience: '15 years',
    languages: ['Arabic', 'French', 'English'],
    available: true,
    initials: 'KH',
    color: 'from-gold-500 to-gold-600',
  },
  {
    id: 3,
    name: 'Me. Soraya Meziani',
    specialty: 'Family Law',
    location: 'Constantine',
    rating: 4.9,
    reviews: 156,
    experience: '10 years',
    languages: ['Arabic', 'French'],
    available: false,
    initials: 'SM',
    color: 'from-rose-500 to-rose-700',
  },
]

function LawyerCard({ lawyer, index }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className="animate-on-scroll bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top bar */}
      <div className={`h-2 bg-gradient-to-r ${lawyer.color}`} />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lawyer.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-lg font-serif shadow-md`}>
            {lawyer.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-navy-900 text-lg leading-tight truncate">{lawyer.name}</h3>
            <p className="text-gold-500 text-sm font-medium mt-0.5">{lawyer.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 text-xs">{lawyer.location}</span>
            </div>
          </div>
          <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold
            ${lawyer.available ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
            {lawyer.available ? 'Available' : 'Busy'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm mb-5">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gold-400 fill-gold-400" />
            <span className="font-semibold text-navy-900">{lawyer.rating}</span>
            <span className="text-gray-400">({lawyer.reviews})</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{lawyer.experience} exp.</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {lawyer.languages.map((lang) => (
            <span key={lang} className="bg-navy-50 text-navy-700 text-xs px-2.5 py-1 rounded-full font-medium">
              {lang}
            </span>
          ))}
        </div>

        <Link
          to={`/BookConsultation?lawyer=${lawyer.id}`}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${lawyer.available
              ? 'bg-navy-900 hover:bg-navy-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
        >
          {lawyer.available ? 'Book Consultation' : 'Unavailable'}
          {lawyer.available && <ArrowRight size={14} />}
        </Link>
      </div>
    </div>
  )
}

export default function FeaturedLawyers() {
  const headingRef = useScrollReveal()

  return (
    <section id="lawyers" className="py-24 bg-gray-50">
      <div className="section-container">
        <div ref={headingRef} className="animate-on-scroll flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Top Rated</span>
            <h2 className="section-title mt-2">Featured Lawyers</h2>
          </div>
          <Link to="/Lawyers" className="flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold-500 transition-colors">
            View All Lawyers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer, i) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
