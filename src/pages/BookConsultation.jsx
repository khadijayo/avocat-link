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

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  })

  // 📁 NEW: documents upload (CLIENT optional)
  const [files, setFiles] = useState([])

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

  // 📁 handle file upload (local only)
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(selected)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
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
            <p className="text-gray-500 mb-2">
              Your consultation with <strong>{lawyer.name}</strong> is scheduled.
            </p>
            <p className="text-gray-500 mb-8">
              A confirmation email has been sent to <strong>{form.email}</strong>.
            </p>
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

      {/* Header */}
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">
            Book a Consultation
          </h1>
          <p className="text-white/50 text-lg">
            Schedule your appointment in just a few steps.
          </p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container max-w-4xl">

          {/* Lawyer card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lawyer.color} flex items-center justify-center text-white font-bold text-lg`}>
              {lawyer.initials}
            </div>
            <div>
              <div className="font-bold text-navy-900 text-lg">{lawyer.name}</div>
              <div className="text-gold-500 text-sm">{lawyer.specialty}</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-semibold">
              <CalendarCheck size={14} /> Available
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

            <h2 className="font-bold text-navy-900 text-2xl mb-6">Your Information</h2>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="form-input"
              />

              <input
                type="date"
                value={form.date || ''}   // 👈 IMPORTANT
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value || '' })
                }
                min={new Date().toISOString().split('T')[0]} // empêche date passée
                className="form-input"
              />
              {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
            </div>

            {/* TIME */}
            <div className="mb-5">
              <label className="font-semibold flex items-center gap-2 mb-3">
                <Clock size={14} /> Time Slot
              </label>

              <div className="flex flex-wrap gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, time: t })}
                    className={`px-4 py-2 border rounded-xl ${form.time === t ? 'bg-navy-900 text-white' : 'bg-white'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}
            </div>

            {/* NOTES */}
            <textarea
              placeholder="Case description (optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="form-input mb-6"
              rows={4}
            />

            {/* 📁 NEW: FILE UPLOAD (CLIENT OPTIONAL) */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Upload documents (optional)
              </label>

              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="form-input"
              />

              {files.length > 0 && (
                <ul className="mt-3 text-sm text-gray-600">
                  {files.map((f, i) => (
                    <li key={i}>📄 {f.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Confirm Booking
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}