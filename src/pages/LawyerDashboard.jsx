import { CalendarCheck, Users, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const stats = [
  { icon: CalendarCheck, label: 'Total Appointments', value: '48', change: '+12 this month' },
  { icon: Users, label: 'Active Clients', value: '23', change: '+5 this month' },
  { icon: Star, label: 'Average Rating', value: '4.9', change: 'Based on 124 reviews' },
  { icon: TrendingUp, label: 'Revenue (DZD)', value: '240,000', change: '+18% this month' },
]

const upcoming = [
  { id: 1, client: 'Ahmed Rahmani', type: 'Criminal Consultation', date: '2025-06-10', time: '10:00', status: 'confirmed' },
  { id: 2, client: 'Fatima Boudali', type: 'Criminal Consultation', date: '2025-06-11', time: '14:00', status: 'pending' },
  { id: 3, client: 'Mourad Khelifi', type: 'Criminal Consultation', date: '2025-06-12', time: '09:00', status: 'confirmed' },
]

export default function LawyerDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">Lawyer Dashboard</h1>
          <p className="text-white/50 text-lg">Manage your appointments and track your practice.</p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {stats.map(({ icon: Icon, label, value, change }) => (
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
            <div className="space-y-3">
              {upcoming.map((appt) => (
                <div key={appt.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-navy-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {appt.client.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-navy-900 text-sm">{appt.client}</div>
                    <div className="text-gray-500 text-xs">{appt.type}</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div className="flex items-center gap-1 justify-end"><CalendarCheck size={11} /> {appt.date}</div>
                    <div className="flex items-center gap-1 justify-end mt-0.5"><Clock size={11} /> {appt.time}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0
                    ${appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {appt.status === 'confirmed' ? <span className="flex items-center gap-1"><CheckCircle size={11} /> Confirmed</span> : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
