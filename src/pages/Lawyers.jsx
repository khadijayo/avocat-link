import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, MapPin, ArrowRight, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const specialties = [
  'All',
  'Criminal Defense',
  'Business & Corporate Law',
  'Family Law',
  'Real Estate Law',
  'Administrative Law',
  'Civil Litigation',
  'Labour Law',
  'Tax Law'
]

export default function Lawyers() {
  const [allLawyers, setAllLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [location, setLocation] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  // Derive unique locations from fetched data
  const locations = ['All', ...Array.from(new Set(allLawyers.map(l => l.city).filter(Boolean)))]

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true)
      setFetchError(null)

      const { data, error } = await supabase
        .from('avocats_details')
        .select('id, first_name, last_name, specialty, city, rating, reviews_count, experience, languages, available, initials, color, fee')
        .eq('status', 'approved')
        .order('rating', { ascending: false })

      if (error) {
        console.error('Fetch error:', error)
        setFetchError('Failed to load lawyers. Please refresh the page.')
      } else {
        // Normalize data shape to match what the UI expects
        const normalized = (data || []).map(l => ({
          id: l.id,
          name: `Me. ${l.first_name} ${l.last_name}`,
          specialty: l.specialty,
          location: l.city || 'Algeria',
          rating: l.rating || 0,
          reviews: l.reviews_count || 0,
          experience: l.experience || 'N/A',
          languages: l.languages || ['Arabic'],
          available: l.available ?? true,
          initials: l.initials || `${l.first_name[0]}${l.last_name[0]}`,
          color: l.color || 'from-navy-700 to-navy-900',
          fee: l.fee || 'Contact for pricing'
        }))
        setAllLawyers(normalized)
      }

      setLoading(false)
    }

    fetchLawyers()
  }, [])

  const filtered = allLawyers.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.specialty.toLowerCase().includes(search.toLowerCase())
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

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={32} className="animate-spin text-navy-700" />
            </div>
          )}

          {/* Error state */}
          {fetchError && !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <AlertCircle size={40} className="text-red-300 mb-4" />
              <p className="text-gray-500">{fetchError}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-navy-900 font-semibold text-sm underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && !fetchError && (
            <>
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} lawyer{filtered.length !== 1 ? 's' : ''} found
              </p>

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
                        {(lawyer.languages || []).map((lang) => (
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
                  <button
                    onClick={() => { setSearch(''); setSpecialty('All'); setLocation('All') }}
                    className="mt-4 text-navy-900 font-semibold text-sm underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
