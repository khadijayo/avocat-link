import { CalendarCheck, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const consultations = [
  { id: 1, lawyer: 'Me. Amira Benali', specialty: 'Criminal Defense', date: '2025-06-10', time: '10:00', status: 'upcoming', initials: 'AB', color: 'from-navy-700 to-navy-900' },
  { id: 2, lawyer: 'Me. Karim Hadj', specialty: 'Business Law', date: '2025-05-28', time: '14:00', status: 'completed', initials: 'KH', color: 'from-gold-500 to-gold-600' },
  { id: 3, lawyer: 'Me. Soraya Meziani', specialty: 'Family Law', date: '2025-05-15', time: '11:00', status: 'cancelled', initials: 'SM', color: 'from-rose-500 to-rose-700' },
]

const statusConfig = {
  upcoming: { icon: Clock, label: 'Upcoming', className: 'bg-blue-50 text-blue-600' },
  completed: { icon: CheckCircle, label: 'Completed', className: 'bg-emerald-50 text-emerald-600' },
  cancelled: { icon: XCircle, label: 'Cancelled', className: 'bg-red-50 text-red-500' },
}

export default function MyConsultations() {
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
          {consultations.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No consultations yet.</p>
              <a href="/Lawyers" className="mt-4 btn-primary inline-flex">Find a Lawyer</a>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.map((c) => {
                const { icon: Icon, label, className } = statusConfig[c.status]
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
