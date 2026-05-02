import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="section-container">
          <h1 className="font-serif font-bold text-white text-4xl lg:text-5xl">{title}</h1>
          <p className="text-white/40 text-sm mt-3">Last updated: May 2025</p>
        </div>
      </div>
      <main className="flex-1 bg-white py-14">
        <div className="section-container max-w-3xl prose prose-navy">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <div className="space-y-8 text-gray-600 leading-relaxed text-sm">
        {[
          { title: '1. Information We Collect', body: 'We collect personal information you provide when registering, booking consultations, or communicating through our platform. This includes your name, email address, phone number, and details about your legal inquiries.' },
          { title: '2. How We Use Your Information', body: 'Your information is used to facilitate consultations, improve our services, send you relevant notifications, and comply with legal obligations. We do not sell your data to third parties.' },
          { title: '3. Data Security', body: 'We implement industry-standard security measures including encryption at rest and in transit. All consultation details are kept strictly confidential in accordance with Algerian privacy law.' },
          { title: '4. Your Rights', body: 'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@avocat-link.dz to exercise these rights.' },
          { title: '5. Contact', body: 'For privacy-related questions, contact our Data Protection Officer at privacy@avocat-link.dz or by post to our registered office in Algiers, Algeria.' },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-serif font-bold text-navy-900 text-xl mb-3">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  )
}

export function TermsOfService() {
  return (
    <LegalPage title="Terms of Service">
      <div className="space-y-8 text-gray-600 leading-relaxed text-sm">
        {[
          { title: '1. Acceptance of Terms', body: 'By using Avocat-Link, you agree to these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including clients and registered lawyers.' },
          { title: '2. Platform Use', body: 'Avocat-Link is a platform for connecting clients with legal professionals. We do not provide legal advice directly. All legal counsel is provided by independent, licensed attorneys.' },
          { title: '3. Lawyer Verification', body: 'All lawyers on our platform undergo verification of their bar registration. However, we recommend conducting your own due diligence before engaging any legal professional.' },
          { title: '4. Booking and Cancellation', body: 'Consultations may be cancelled up to 24 hours in advance for a full refund. Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee.' },
          { title: '5. Liability', body: 'Avocat-Link is not liable for the advice given by lawyers on our platform. All professional relationships are formed directly between clients and lawyers.' },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-serif font-bold text-navy-900 text-xl mb-3">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  )
}

export function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy">
      <div className="space-y-8 text-gray-600 leading-relaxed text-sm">
        {[
          { title: '1. What Are Cookies', body: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your browsing experience.' },
          { title: '2. Types of Cookies We Use', body: 'We use strictly necessary cookies for site functionality, preference cookies to remember your settings, and analytics cookies to understand how our platform is used. We do not use advertising cookies.' },
          { title: '3. Managing Cookies', body: 'You can control cookie settings through your browser preferences. Disabling certain cookies may affect the functionality of our platform.' },
          { title: '4. Third-Party Cookies', body: 'We may use trusted third-party services that set their own cookies for analytics purposes. These providers are contractually obligated to protect your data.' },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-serif font-bold text-navy-900 text-xl mb-3">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  )
}
