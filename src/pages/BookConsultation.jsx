import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarCheck, Clock, CheckCircle, Scale, Upload, FileText } from 'lucide-react'
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

  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', notes: '', file: null })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] })
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center max-w-md px-4">
            <CheckCircle size={60} className="text-emerald-500 mx-auto mb-6" />
            <h2 className="font-serif font-bold text-navy-900 text-3xl mb-3">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-8">Your consultation with {lawyer.name} is scheduled.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Colonne Gauche (Style Carte Foncée comme avc.png) */}
            <div className="lg:col-span-4">
              <div className="bg-[#0B1221] rounded-[2rem] p-10 text-white min-h-[600px] flex flex-col shadow-2xl sticky top-28">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Scale size={28} className="text-gold-400" />
                </div>

                <h2 className="font-serif font-bold text-3xl mb-4 leading-tight">
                  Why Book with {lawyer.name.split(' ')[1]}?
                </h2>
                <p className="text-white/50 mb-10 leading-relaxed text-sm">
                  Get professional legal advice tailored to your specific situation and manage your case efficiently.
                </p>

                <ul className="space-y-6">
                  {[
                    'Instant appointment confirmation',
                    'Secure and private consultation',
                    'Expert in ' + lawyer.specialty,
                    'Document review included',
                    'Flexible rescheduling'
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-4 text-sm text-white/80 font-medium">
                      <CheckCircle size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne Droite (Formulaire Blanc) */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 lg:p-12">
                <h2 className="font-serif font-bold text-navy-900 text-3xl mb-10">Consultation Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Mohamed Benali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-gray-700">Phone</label>
                    <input
                      type="tel"
                      placeholder="+213..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-gray-700">Preferred Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <label className="text-[15px] font-bold text-gray-700 block">Select Time Slot</label>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setForm({ ...form, time })}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border
                          ${form.time === time
                            ? 'bg-navy-900 text-white border-navy-900 shadow-md'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}
                </div>

                {/* --- NEW: FILE UPLOAD SECTION --- */}
                <div className="mt-8 space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Upload Case Files <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-navy-400 transition-all"
                    >
                      {form.file ? (
                        <div className="flex items-center gap-2 text-navy-900 font-medium">
                          <FileText className="text-gold-500" />
                          <span>{form.file.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="text-gray-400 group-hover:text-navy-900" size={24} />
                          <span className="text-sm text-gray-500 group-hover:text-navy-900">PDF, JPG or PNG (max 5MB)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Description of your case</label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your legal needs..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all resize-none outline-none"
                  />
                </div>

                <button type="submit" className="w-full mt-12 bg-gold-500 hover:bg-gold-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-gold-500/20 transition-all text-lg active:scale-[0.98]">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}