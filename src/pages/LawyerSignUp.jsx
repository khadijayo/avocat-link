import { useState } from 'react'
import { CheckCircle, Scale, Upload, FileText } from 'lucide-react' // Ajout de Upload et FileText
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const specialties = [
  'Criminal Defense',
  'Business & Corporate Law',
  'Family Law',
  'Real Estate Law',
  'Administrative Law',
  'Civil Litigation',
  'Labour Law',
  'Tax Law'
]

const perks = [
  'Manage your schedule online',
  'Reach thousands of clients',
  'Secure payment processing',
  'Professional profile & reviews',
  'Analytics dashboard',
  'Free to join'
]

export default function LawyerSignUp() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barNumber: '',
    specialty: '',
    experience: '',
    city: '',
    bio: '',
    agree: false
  })

  const [documents, setDocuments] = useState(null) // Changé pour gérer le fichier localement
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.barNumber.trim()) e.barNumber = 'Required'
    if (!form.specialty) e.specialty = 'Required'
    if (!form.agree) e.agree = 'You must agree to the terms'
    if (!documents) e.documents = 'You must upload certifications & diplomas'

    return e
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setDocuments(e.target.files[0])
    }
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
            <h2 className="font-serif font-bold text-navy-900 text-3xl mb-3">Application Submitted!</h2>
            <p className="text-gray-500 mb-8">Thank you for joining Avocat-Link. Our team will review your profile within 48 hours.</p>
            <a href="/" className="btn-primary">Back to Home</a>
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
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl mb-3">Join as a Lawyer</h1>
          <p className="text-white/50 text-lg">Grow your practice with Algeria's leading legal platform.</p>
        </div>
      </div>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-1">
              <div className="bg-navy-950 rounded-2xl p-7 text-white sticky top-24">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center mb-5">
                  <Scale size={22} className="text-gold-400" />
                </div>
                <h2 className="font-serif font-bold text-2xl mb-2">Why Avocat-Link?</h2>
                <p className="text-white/50 text-sm mb-6">Join hundreds of lawyers already growing their practice.</p>
                <ul className="space-y-3">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle size={15} className="text-gold-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 lg:p-10 space-y-6">
                <h2 className="font-serif font-bold text-navy-900 text-2xl">Personal & Professional Info</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'firstName', label: 'First Name', placeholder: 'Mohamed' },
                    { id: 'lastName', label: 'Last Name', placeholder: 'Benali' },
                    { id: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email' },
                    { id: 'phone', label: 'Phone', placeholder: '+213...' },
                    { id: 'barNumber', label: 'Bar Number', placeholder: 'ALG-XXXX' },
                    { id: 'city', label: 'City', placeholder: 'Algiers' }
                  ].map(({ id, label, placeholder, type = 'text' }) => (
                    <div key={id} className="space-y-2">
                      <label className="block text-[15px] font-bold text-gray-700">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[id]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none"
                      />
                      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="block text-[15px] font-bold text-gray-700">Specialty</label>
                  <select
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all outline-none appearance-none"
                  >
                    <option value="">Select...</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[15px] font-bold text-gray-700">Your Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your experience..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:border-navy-900 focus:ring-0 transition-all resize-none outline-none"
                  />
                </div>

                {/* --- SECTION MODIFIÉE : DOCUMENT UPLOAD --- */}
                <div className="space-y-2">
                  <label className="block text-[15px] font-bold text-gray-700">Certifications & Diplomas</label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="doc-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="doc-upload"
                      className={`flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed rounded-[1.5rem] cursor-pointer transition-all
                        ${errors.documents ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-navy-400'}`}
                    >
                      {documents ? (
                        <div className="flex items-center gap-2 text-navy-900 font-medium">
                          <FileText className="text-gold-500" />
                          <span className="text-sm truncate max-w-[200px]">{documents.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="text-gray-400 group-hover:text-navy-900" size={24} />
                          <span className="text-sm text-gray-500 group-hover:text-navy-900">Click to upload certifications (PDF, JPG)</span>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.documents && <p className="text-red-500 text-xs mt-2">{errors.documents}</p>}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-navy-900 focus:ring-navy-900"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">I agree to the terms and conditions</label>
                </div>
                {errors.agree && <p className="text-red-500 text-xs">{errors.agree}</p>}

                <button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gold-500/20 transition-all text-lg active:scale-[0.98]">
                  Submit Application
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