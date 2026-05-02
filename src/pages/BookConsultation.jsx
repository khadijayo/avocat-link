import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarCheck, Clock, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

const lawyerMap = {
  '1': { name: 'Me. Amira Benali', specialty: 'Criminal Defense', initials: 'AB', color: 'from-navy-700 to-navy-900' },
  '2': { name: 'Me. Karim Hadj', specialty: 'Business & Corporate Law', initials: 'KH', color: 'from-gold-500 to-gold-600' },
  '3': { name: 'Me. Soraya Meziani', specialty: 'Family Law', initials: 'SM', color: 'from-rose-500 to-rose-700' },
}

export default function BookConsultation() {
  const [params] = useSearchParams()
  const lawyerId = params.get('lawyer') || '1'
  const lawyer = lawyerMap[lawyerId] || lawyerMap['1']

  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.time) e.time = 'Please select a time slot'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-50 pt-20">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h2 className="font-serif font-bold text-navy-900 text-3xl mb-3">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-2">Your consultation with <strong>{lawyer.name}</strong> is scheduled.</p>
            <p className="text-gray-500 mb-8">A confirmation email has been sent to <strong>{form.email}</strong>.</p>
            <div className="flex gap-3 justify-center">
              <a href="/MyConsultations" className="btn-primary">View My Consultations</a>
              <a href="/Lawyers" className="btn-secondary">Browse More Lawyers</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">Book a Consultation</h1>
          <p className="text-white/50 text-lg">Schedule your appointment in just a few steps.</p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container max-w-4xl">
          {/* Lawyer Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lawyer.color} flex items-center justify-center text-white font-bold text-lg font-serif flex-shrink-0`}>
              {lawyer.initials}
            </div>
            <div>
              <div className="font-serif font-bold text-navy-900 text-lg">{lawyer.name}</div>
              <div className="text-gold-500 text-sm font-medium">{lawyer.specialty}</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-semibold">
              <CalendarCheck size={14} /> Available
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-serif font-bold text-navy-900 text-2xl mb-6">Your Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {[
                { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Ahmed Benali' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'ahmed@email.com' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+213 5XX XXX XXX' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[id]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-200 transition
                      ${errors[id] ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-navy-400'}`}
                  />
                  {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value, date: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-200 transition
                    ${errors.date ? 'border-red-300' : 'border-gray-200 focus:border-navy-400'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock size={14} /> Select Time Slot
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setForm({ ...form, time })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border
                      ${form.time === time
                        ? 'bg-navy-900 text-white border-navy-900 shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-2">{errors.time}</p>}
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Brief Description of Your Case <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea
                rows={4}
                placeholder="Describe your legal situation briefly..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center text-base py-4">
              Confirm Booking
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
