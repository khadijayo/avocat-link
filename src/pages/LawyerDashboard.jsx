import { useState, useEffect } from 'react'
import { CalendarCheck, Users, Star, TrendingUp, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

// Temporary: identify the lawyer by email stored in localStorage
// Replace with real auth session when you add authentication
const LAWYER_EMAIL_KEY = 'avocat_lawyer_email'

export default function LawyerDashboard() {
  const [lawyerEmail, setLawyerEmail] = useState(localStorage.getItem(LAWYER_EMAIL_KEY) || '')
  const [emailInput, setEmailInput] = useState('')

  const [lawyer, setLawyer] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const fetchDashboard = async (email) => {
    setLoading(true)
    setFetchError(null)

    // 1. Get lawyer profile
    const { data: lawyerData, error: lawyerError } = await supabase
      .from('avocats_details')
      .select('id, first_name, last_name, specialty, rating, reviews_count')
      .eq('email', email)
      .single()

    if (lawyerError || !lawyerData) {
      setFetchError('No lawyer account found for this email.')
      setLoading(false)
      return
    }

    setLawyer(lawyerData)

    // 2. Get all appointments for this lawyer
    const { data: apptData, error: apptError } = await supabase
      .from('appointments')
      .select('id, client_name, date, time, status, notes')
      .eq('lawyer_id', lawyerData.id)
      .order('date', { ascending: true })

    if (apptError) {
      console.error('Appointments fetch error:', apptError)
      setFetchError('Failed to load appointments.')
      setLoading(false)
      return
    }

    setAppointments(apptData || [])
    setLoading(false)
  }

  useEffect(() => {
    if (lawyerEmail) fetchDashboard(lawyerEmail)
    else setLoading(false)
  }, [lawyerEmail])

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    localStorage.setItem(LAWYER_EMAIL_KEY, emailInput.trim())
    setLawyerEmail(emailInput.trim())
  }

  // Derived stats
  const total = appointments.length
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const pending = appointments.filter(a => a.status === 'pending').length
  const completed = appointments.filter(a => a.status === 'completed').length

  const upcoming = appointments.filter(a =>
    (a.status === 'confirmed' || a.status === 'pending') &&
    new Date(a.date) >= new Date()
  ).slice(0, 10)

  // Email login screen
  if (!lawyerEmail) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-navy-950 pt-28 pb-14">
          <div className="section-container">
            <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">Lawyer Dashboard</h1>
            <p className="text-white/50 text-lg">Manage your appointments and track your practice.</p>
          </div>
        </div>
        <main className="flex-1 bg-gray-50 py-10 flex items-center justify-center">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10 max-w-md w-full mx-4">
            <h2 className="font-serif font-bold text-navy-900 text-2xl mb-2">Access Your Dashboard</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the email address you used when registering as a lawyer.</p>
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
                Access Dashboard
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
        <div className="section-container flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">
              {lawyer ? `Welcome, Me. ${lawyer.last_name}` : 'Lawyer Dashboard'}
            </h1>
            <p className="text-white/50 text-lg">Manage your appointments and track your practice.</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem(LAWYER_EMAIL_KEY)
              setLawyerEmail('')
              setLawyer(null)
              setAppointments([])
            }}
            className="text-white/40 hover:text-white text-sm underline transition-colors"
          >
            Switch account
          </button>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container">

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
                onClick={() => fetchDashboard(lawyerEmail)}
                className="mt-4 text-navy-900 font-semibold text-sm underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !fetchError && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  { icon: CalendarCheck, label: 'Total Appointments', value: total, change: `${pending} pending` },
                  { icon: Users,         label: 'Confirmed',          value: confirmed, change: `${completed} completed` },
                  { icon: Star,          label: 'Average Rating',      value: lawyer?.rating?.toFixed(1) || '—', change: `Based on ${lawyer?.reviews_count || 0} reviews` },
                  { icon: TrendingUp,    label: 'Upcoming',            value: upcoming.length, change: 'Next appointments' },
                ].map(({ icon: Icon, label, value, change }) => (
                  <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                        <Icon size={18} className="text-navy-700" />
                      </div>
                    </div>
                    <div className="font-serif font-bold text-navy-900 text-3xl mb-1">{value}</div>
                    <div className="text-gray-500 text-sm font-medium">{label}</div>
                    <div className="text-gold-500 text-xs mt-1">{change}</div>
                  </div>
                ))}
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-serif font-bold text-navy-900 text-xl mb-5">Upcoming Appointments</h2>

                {upcoming.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No upcoming appointments.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcoming.map((appt) => (
                      <div key={appt.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-navy-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {appt.client_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-navy-900 text-sm">{appt.client_name}</div>
                          {appt.notes && (
                            <div className="text-gray-500 text-xs truncate max-w-xs">{appt.notes}</div>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div className="flex items-center gap-1 justify-end"><CalendarCheck size={11} /> {appt.date}</div>
                          <div className="flex items-center gap-1 justify-end mt-0.5"><Clock size={11} /> {appt.time}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0
                          ${appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {appt.status === 'confirmed'
                            ? <span className="flex items-center gap-1"><CheckCircle size={11} /> Confirmed</span>
                            : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
