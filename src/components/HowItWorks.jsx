import { Search, CalendarCheck, MessageSquare, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Find Your Lawyer',
    description: 'Browse our directory of verified lawyers filtered by specialty, location, language, and availability.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Book an Appointment',
    description: 'Select a convenient time slot directly from the lawyer\'s calendar. No phone calls required.',
  },
  {
    icon: MessageSquare,
    step: '03',
    title: 'Consult Securely',
    description: 'Meet in person or via secure video — all communications are fully confidential and encrypted.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Get Legal Help',
    description: 'Receive expert legal guidance and follow-up support, with full transparency on fees.',
  },
]

export default function HowItWorks() {
  const headingRef = useScrollReveal()

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="section-container">
        <div ref={headingRef} className="animate-on-scroll text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title mt-3 mb-4">How Avocat-Link Works</h2>
          <p className="text-gray-500 leading-relaxed">
            Getting legal help has never been easier. Four steps to connect with
            the right professional for your case.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* connector line */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />

          {steps.map(({ icon: Icon, step, title, description }, i) => {
            const ref = useScrollReveal()
            return (
              <div
                key={step}
                ref={ref}
                className="animate-on-scroll relative flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-navy-950 flex items-center justify-center shadow-lg shadow-navy-900/20 z-10 relative">
                    <Icon size={28} className="text-gold-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
