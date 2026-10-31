import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { services } from './data/site'
import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { Hero } from './sections/Hero'
import { TrustMarquee } from './sections/TrustMarquee'
import { WarningSigns } from './sections/WarningSigns'
import { Services } from './sections/Services'
import { WhyUs } from './sections/WhyUs'
import { Process } from './sections/Process'
import { Pricing } from './sections/Pricing'
import { Testimonials } from './sections/Testimonials'
import { Faq } from './sections/Faq'
import { QuoteForm } from './sections/QuoteForm'

export default function App() {
  // Shared so picking a service in the showcase pre-fills the quote form.
  const [activeService, setActiveService] = useState(0)
  const [requestedService, setRequestedService] = useState(services[0].title)

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-forest-900 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <TrustMarquee />
        <WarningSigns />
        <Services
          activeIndex={activeService}
          onActiveChange={setActiveService}
          onBook={setRequestedService}
        />
        <WhyUs />
        <Process />
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
