import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Lawyers from './pages/Lawyers'
import BookConsultation from './pages/BookConsultation'
import MyConsultations from './pages/MyConsultations'
import LawyerDashboard from './pages/LawyerDashboard'
import LawyerSignUp from './pages/LawyerSignUp'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'

import useScrollToTop from './hooks/useScrollToTop'

export default function App() {
  useScrollToTop()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Landing" element={<Home />} />

      <Route path="/Lawyers" element={<Lawyers />} />
      <Route path="/BookConsultation" element={<BookConsultation />} />
      <Route path="/MyConsultations" element={<MyConsultations />} />

      <Route path="/LawyerDashboard" element={<LawyerDashboard />} />
      <Route path="/LawyerSignUp" element={<LawyerSignUp />} />

      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/TermsOfService" element={<TermsOfService />} />
      <Route path="/CookiePolicy" element={<CookiePolicy />} />
    </Routes>
  )
}