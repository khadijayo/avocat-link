import { Scale, Briefcase, Home, Users, FileText, Shield } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const services = [
  {
    icon: Scale,
    title: 'Criminal Defense',
    description: 'Expert representation for criminal charges, from investigation through trial, protecting your rights at every stage.',
    color: 'from-blue-500 to-navy-700',
  },
  {
    icon: Briefcase,
    title: 'Business Law',
    description: 'Comprehensive legal support for businesses — contracts, compliance, mergers, and corporate governance.',
    color: 'from-navy-600 to-navy-900',
  },
  {
    icon: Home,
    title: 'Real Estate',
    description: 'Navigate property transactions, disputes, and contracts with confidence guided by expert legal counsel.',
    color: 'from-gold-400 to-gold-600',
  },
  {
    icon: Users,
    title: 'Family Law',
    description: 'Sensitive handling of divorce, custody, adoption, and inheritance matters with compassion and precision.',
    color: 'from-rose-400 to-rose-700',
  },
  {
    icon: FileText,
    title: 'Civil Litigation',
    description: 'Skilled advocacy in civil disputes, from negotiation and mediation to court representation.',
    color: 'from-violet-500 to-violet-800',
  },
  {
    icon: Shield,
    title: 'Administrative Law',
    description: 'Guidance through regulatory matters, government disputes, and administrative proceedings.',
    color: 'from-emerald-500 to-emerald-800',
  },
]

function ServiceCard({ service, index }) {
  const ref = useScrollReveal()
  const { icon: Icon, title, description, color } = service

  return (
    <div
      ref={ref}
      className="animate-on-scroll group bg-white rounded-2xl p-6 border border-gray-100 card-hover shadow-sm"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-serif font-bold text-navy-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function Services() {
  const headingRef = useScrollReveal()

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="animate-on-scroll text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Practice Areas</span>
          <h2 className="section-title mt-3 mb-4">
            Legal Expertise for Every Need
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Our network of verified lawyers covers all major areas of Algerian law,
            ensuring you find the right expert for your specific situation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
