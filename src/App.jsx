import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { services } from './data/site'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { Hero } from './sections/Hero'
import { TrustMarquee } from './sections/TrustMarquee'
import { Problem } from './sections/Problem'
import { Checker } from './sections/Checker'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { WhyUs } from './sections/WhyUs'
import { Pricing } from './sections/Pricing'
import { Testimonials } from './sections/Testimonials'
import { Faq } from './sections/Faq'
import { QuoteForm } from './sections/QuoteForm'

export default function App() {
  useSmoothScroll()
  // Lifted so "Book" on a service card pre-selects it in the quote form.
  const [requestedService, setRequestedService] = useState(services[0].title)

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-forest-900 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <TrustMarquee />
        <Problem />
        <Checker />
        <Services onBook={setRequestedService} />
        <Process />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <Faq />
        <QuoteForm service={requestedService} onServiceChange={setRequestedService} />
      </main>
      <Footer />
      <MobileActionBar />
    </MotionConfig>
  )
}
