import { useState, useEffect } from 'react'
import { CalendarCheck, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const statusConfig = {
  pending:   { icon: Clock,        label: 'Pending',   className: 'bg-amber-50 text-amber-600' },
  confirmed: { icon: CheckCircle,  label: 'Confirmed', className: 'bg-blue-50 text-blue-600' },
  completed: { icon: CheckCircle,  label: 'Completed', className: 'bg-emerald-50 text-emerald-600' },
  cancelled: { icon: XCircle,      label: 'Cancelled', className: 'bg-red-50 text-red-500' },
}

// Temporary: filter by client email stored in localStorage after booking
// Replace with real auth session when you add authentication
const CLIENT_EMAIL_KEY = 'avocat_client_email'

export default function MyConsultations() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [email, setEmail] = useState(localStorage.getItem(CLIENT_EMAIL_KEY) || '')
  const [emailInput, setEmailInput] = useState('')

  const fetchConsultations = async (clientEmail) => {
    if (!clientEmail) return

    setLoading(true)
    setFetchError(null)

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        date,
        time,
        status,
        notes,
        avocats_details (
          first_name,
          last_name,
          specialty,
          initials,
          color
        )
      `)
      .eq('client_email', clientEmail)
      .order('date', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
      setFetchError('Failed to load consultations. Please try again.')
    } else {
      const normalized = (data || []).map(appt => ({
        id: appt.id,
        lawyer: appt.avocats_details
          ? `Me. ${appt.avocats_details.first_name} ${appt.avocats_details.last_name}`
          : 'Unknown Lawyer',
        specialty: appt.avocats_details?.specialty || '',
        initials: appt.avocats_details?.initials || '??',
        color: appt.avocats_details?.color || 'from-navy-700 to-navy-900',
        date: appt.date,
        time: appt.time,
        status: appt.status || 'pending',
      }))
      setConsultations(normalized)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (email) fetchConsultations(email)
    else setLoading(false)
  }, [email])

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!emailInput.trim() || !/\S+@\S+\.\S+/.test(emailInput)) return
    localStorage.setItem(CLIENT_EMAIL_KEY, emailInput.trim())
    setEmail(emailInput.trim())
  }

  // If no email is stored yet, show an email lookup form
  if (!email) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-navy-950 pt-28 pb-14">
          <div className="section-container">
            <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">My Consultations</h1>
            <p className="text-white/50 text-lg">Track and manage all your legal appointments.</p>
          </div>
        </div>
        <main className="flex-1 bg-gray-50 py-10 flex items-center justify-center">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10 max-w-md w-full mx-4">
            <h2 className="font-serif font-bold text-navy-900 text-2xl mb-2">View Your Bookings</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the email address you used when booking a consultation.</p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="email@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
              />
              <button
                type="submit"
                className="w-full bg-navy-900 hover:bg-navy-700 text-white font-bold py-4 rounded-2xl transition-all text-sm"
              >
                Find My Consultations
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">My Consultations</h1>
          <p className="text-white/50 text-lg">Track and manage all your legal appointments.</p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container max-w-3xl">

          {/* Email context + switch */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
            <span>Showing bookings for <span className="font-semibold text-navy-900">{email}</span></span>
            <button
              onClick={() => {
                localStorage.removeItem(CLIENT_EMAIL_KEY)
                setEmail('')
                setConsultations([])
              }}
              className="text-navy-700 underline font-medium"
            >
              Switch email
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={32} className="animate-spin text-navy-700" />
            </div>
          )}

          {/* Error */}
          {fetchError && !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <AlertCircle size={40} className="text-red-300 mb-4" />
              <p className="text-gray-500">{fetchError}</p>
              <button
                onClick={() => fetchConsultations(email)}
                className="mt-4 text-navy-900 font-semibold text-sm underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !fetchError && consultations.length === 0 && (
            <div className="text-center py-20">
              <AlertCircle size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No consultations found for this email.</p>
              <a href="/Lawyers" className="mt-4 btn-primary inline-flex">Find a Lawyer</a>
            </div>
          )}

          {/* List */}
          {!loading && !fetchError && consultations.length > 0 && (
            <div className="space-y-4">
              {consultations.map((c) => {
                const config = statusConfig[c.status] || statusConfig.pending
                const { icon: Icon, label, className } = config
                return (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 card-hover">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold font-serif flex-shrink-0`}>
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-navy-900">{c.lawyer}</div>
                      <div className="text-gold-500 text-sm font-medium">{c.specialty}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><CalendarCheck size={11} /> {c.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {c.time}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${className}`}>
                      <Icon size={12} /> {label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
