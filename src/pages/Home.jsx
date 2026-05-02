import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import FeaturedLawyers from '../components/FeaturedLawyers'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedLawyers />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  )
}
