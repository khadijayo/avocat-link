import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const allLawyers = [
  { id: 1, name: 'Me. Amira Benali', specialty: 'Criminal Defense', location: 'Algiers', rating: 4.9, reviews: 124, experience: '12 years', languages: ['Arabic', 'French'], available: true, initials: 'AB', color: 'from-navy-700 to-navy-900', fee: '5,000 DZD' },
  { id: 2, name: 'Me. Karim Hadj', specialty: 'Business & Corporate Law', location: 'Oran', rating: 4.8, reviews: 89, experience: '15 years', languages: ['Arabic', 'French', 'English'], available: true, initials: 'KH', color: 'from-gold-500 to-gold-600', fee: '8,000 DZD' },
  { id: 3, name: 'Me. Soraya Meziani', specialty: 'Family Law', location: 'Constantine', rating: 4.9, reviews: 156, experience: '10 years', languages: ['Arabic', 'French'], available: false, initials: 'SM', color: 'from-rose-500 to-rose-700', fee: '4,500 DZD' },
  { id: 4, name: 'Me. Youcef Benaissa', specialty: 'Real Estate Law', location: 'Algiers', rating: 4.7, reviews: 67, experience: '8 years', languages: ['Arabic', 'French'], available: true, initials: 'YB', color: 'from-emerald-500 to-emerald-800', fee: '6,000 DZD' },
  { id: 5, name: 'Me. Leila Chaouch', specialty: 'Administrative Law', location: 'Annaba', rating: 4.8, reviews: 43, experience: '11 years', languages: ['Arabic', 'French'], available: true, initials: 'LC', color: 'from-violet-500 to-violet-800', fee: '5,500 DZD' },
  { id: 6, name: 'Me. Omar Bouzid', specialty: 'Civil Litigation', location: 'Oran', rating: 4.6, reviews: 98, experience: '18 years', languages: ['Arabic', 'French'], available: true, initials: 'OB', color: 'from-blue-500 to-navy-700', fee: '7,000 DZD' },
]

const specialties = ['All', 'Criminal Defense', 'Business & Corporate Law', 'Family Law', 'Real Estate Law', 'Administrative Law', 'Civil Litigation']
const locations = ['All', 'Algiers', 'Oran', 'Constantine', 'Annaba']

export default function Lawyers() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [location, setLocation] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = allLawyers.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.specialty.toLowerCase().includes(search.toLowerCase())
    const matchSpecialty = specialty === 'All' || l.specialty === specialty
    const matchLocation = location === 'All' || l.location === location
    return matchSearch && matchSpecialty && matchLocation
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">Find a Lawyer</h1>
          <p className="text-white/50 text-lg">Browse our directory of verified, experienced legal professionals.</p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container">
          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 flex flex-wrap gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specialty</label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpecialty(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${specialty === s ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Location</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${location === loc ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-5">{filtered.length} lawyer{filtered.length !== 1 ? 's' : ''} found</p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((lawyer) => (
              <div key={lawyer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${lawyer.color}`} />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lawyer.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-lg font-serif shadow-md`}>
                      {lawyer.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-navy-900 text-lg leading-tight">{lawyer.name}</h3>
                      <p className="text-gold-500 text-sm font-medium mt-0.5">{lawyer.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-400" />
                        <span className="text-gray-400 text-xs">{lawyer.location}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0
                      ${lawyer.available ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                      {lawyer.available ? 'Available' : 'Busy'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="text-gold-400 fill-gold-400" />
                      <span className="font-semibold text-navy-900">{lawyer.rating}</span>
                      <span className="text-gray-400">({lawyer.reviews})</span>
                    </div>
                    <span className="text-gray-500 text-xs">{lawyer.experience} exp.</span>
                    <span className="text-navy-900 font-semibold text-xs">{lawyer.fee}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lawyer.languages.map((lang) => (
                      <span key={lang} className="bg-navy-50 text-navy-700 text-xs px-2.5 py-1 rounded-full font-medium">{lang}</span>
                    ))}
                  </div>

                  <Link
                    to={`/BookConsultation?lawyer=${lawyer.id}`}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                      ${lawyer.available ? 'bg-navy-900 hover:bg-navy-700 text-white' : 'bg-gray-100 text-gray-400 pointer-events-none'}`}
                  >
                    {lawyer.available ? (<>Book Consultation <ArrowRight size={14} /></>) : 'Unavailable'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No lawyers found matching your criteria.</p>
              <button onClick={() => { setSearch(''); setSpecialty('All'); setLocation('All') }} className="mt-4 text-navy-900 font-semibold text-sm underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
