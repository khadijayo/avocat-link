import { useState } from 'react'
import { CheckCircle, Scale } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const specialties = ['Criminal Defense', 'Business & Corporate Law', 'Family Law', 'Real Estate Law', 'Administrative Law', 'Civil Litigation', 'Labour Law', 'Tax Law']
const perks = ['Manage your schedule online', 'Reach thousands of clients', 'Secure payment processing', 'Professional profile & reviews', 'Analytics dashboard', 'Free to join']

export default function LawyerSignUp() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', barNumber: '', specialty: '', experience: '', city: '', bio: '', agree: false })
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
            <h2 className="font-serif font-bold text-navy-900 text-3xl mb-3">Application Submitted!</h2>
            <p className="text-gray-500 mb-8">Thank you for joining Avocat-Link. Our team will review your profile and contact you within 48 hours.</p>
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
            {/* Perks */}
            <div className="lg:col-span-1">
              <div className="bg-navy-950 rounded-2xl p-7 text-white sticky top-24">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center mb-5">
                  <Scale size={22} className="text-gold-400" />
                </div>
                <h2 className="font-serif font-bold text-2xl mb-2">Why Avocat-Link?</h2>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">Join hundreds of lawyers already growing their practice on our platform.</p>
                <ul className="space-y-3">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle size={15} className="text-gold-400 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
                <h2 className="font-serif font-bold text-navy-900 text-2xl">Personal & Professional Info</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'firstName', label: 'First Name', placeholder: 'Mohamed' },
                    { id: 'lastName', label: 'Last Name', placeholder: 'Benali' },
                    { id: 'email', label: 'Email Address', placeholder: 'email@example.com', type: 'email' },
                    { id: 'phone', label: 'Phone', placeholder: '+213 5XX XXX XXX', type: 'tel' },
                    { id: 'barNumber', label: 'Bar Registration Number', placeholder: 'e.g. ALG-2015-0042' },
                    { id: 'city', label: 'City', placeholder: 'Algiers' },
                  ].map(({ id, label, placeholder, type = 'text' }) => (
                    <div key={id}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[id]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-100 transition
                          ${errors[id] ? 'border-red-300' : 'border-gray-200 focus:border-navy-400'}`}
                      />
                      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Specialty</label>
                    <select
                      value={form.specialty}
                      onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy-100 transition bg-white
                        ${errors.specialty ? 'border-red-300' : 'border-gray-200 focus:border-navy-400'}`}
                    >
                      <option value="">Select specialty...</option>
                      {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      placeholder="e.g. 8"
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Professional Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your experience, education, and areas of expertise..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 resize-none transition"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-navy-900"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree to the <a href="/TermsOfService" className="text-navy-900 underline font-medium">Terms of Service</a> and <a href="/PrivacyPolicy" className="text-navy-900 underline font-medium">Privacy Policy</a>
                  </label>
                </div>
                {errors.agree && <p className="text-red-500 text-xs -mt-3">{errors.agree}</p>}

                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
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
