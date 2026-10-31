import {
  Building2,
  CalendarCheck,
  Camera,
  Fan,
  Flame,
  Leaf,
  ShieldCheck,
  Sparkles,
  Wind,
  BadgeDollarSign,
  ScanSearch,
  Wrench,
  ClipboardCheck,
} from 'lucide-react'

export const company = {
  name: 'TheLintstones',
  legalName: 'TheLintstones Duct Cleaning',
  phone: '1-800-205-0031',
  phoneHref: 'tel:18002050031',
  email: 'info@thelintstones.com',
  offerPrice: 149,
  yearsInBusiness: 10,
  hours: [
    { days: 'Mon – Fri', time: '9:00 am – 5:00 pm' },
    { days: 'Saturday', time: 'Closed' },
    { days: 'Sunday', time: 'Closed' },
  ],
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export const trustPoints = [
  'Certified technicians',
  'Eco-friendly, non-toxic products',
  'Residential & commercial',
  'Fully insured',
  'Flat-rate pricing',
  'Before & after photos on every job',
  'Pet and kid safe',
]

export const warningSigns = [
  'Dust settles again a day or two after you clean',
  'Allergies flare up indoors, not outside',
  'A musty smell when the AC kicks on',
  'Some rooms never reach the set temperature',
  'You recently renovated or moved in',
  'Pets shed and the filter clogs fast',
]

export const services = [
  {
    id: 'air-ducts',
    title: 'Air Duct Cleaning',
    blurb:
      'Full supply and return system cleaned under negative pressure, so the debris leaves your home instead of moving around it.',
    image: '/images/flex-duct-vacuum.png',
    icon: Wind,
    featured: true,
  },
  {
    id: 'hvac-coil',
    title: 'HVAC & Coil Cleaning',
    blurb:
      'Clogged coils make your system work harder for less air. We clear them so it runs cooler and cheaper.',
    image: '/images/coil-cleaning.png',
    icon: Fan,
  },
  {
    id: 'commercial',
    title: 'Commercial Ductwork',
    blurb:
      'Offices, retail and restaurants. Scheduled around your hours with minimal disruption to staff and customers.',
    image: '/images/commercial-trunk-line.png',
    icon: Building2,
  },
  {
    id: 'dryer-vent',
    title: 'Dryer Vent Cleaning',
    blurb:
      'Skipped vent cleaning is the top cause of dryer fires. Faster, cheaper drying loads are a bonus.',
    icon: Flame,
  },
  {
    id: 'mold',
    title: 'Eco Mold Treatment',
    blurb: 'Plant-based treatments that stop mold growth in the system without harsh fumes.',
    icon: Leaf,
  },
  {
    id: 'sanitize',
    title: 'Sanitize & Deodorize',
    blurb: 'Neutralises pet, smoke and cooking odours at the source, not just the vents.',
    icon: Sparkles,
  },
]

export const reasons = [
  {
    icon: ShieldCheck,
    title: 'Certified, background-checked techs',
    body: 'Trained on current equipment and methods. The person who shows up is the person who does the work.',
  },
  {
    icon: BadgeDollarSign,
    title: 'The price we quote is the price you pay',
    body: 'No surprise “contamination fees” at the end of the job. You approve the total before we start.',
  },
  {
    icon: Leaf,
    title: 'Safe for kids and pets',
    body: 'Organic, non-toxic cleaning solutions. Your family can be home while we work.',
  },
  {
    icon: Camera,
    title: 'Proof, not promises',
    body: 'We photograph your ducts before and after, so you can see exactly what came out.',
  },
]

export const steps = [
  {
    icon: CalendarCheck,
    title: 'Book a time',
    body: 'Pick a slot online or call us. Most appointments are available the same week.',
  },
  {
    icon: ScanSearch,
    title: 'Inspect',
    body: 'We camera-inspect your system and confirm the price before any work begins.',
  },
  {
    icon: Wrench,
    title: 'Deep clean',
    body: 'Negative-pressure vacuum plus rotary brushing, register by register, all the way to the unit.',
  },
  {
    icon: ClipboardCheck,
    title: 'Walkthrough',
    body: 'We show you the before & after photos and leave your home as tidy as we found it.',
  },
]

export const offerIncludes = [
  'Supply & return lines cleaned',
  'Negative-pressure HEPA vacuum',
  'Rotary brush agitation',
  'Register & grille wash',
  'Camera inspection, before & after',
  'Floor protection and clean-up',
]

// Placeholder reviews — replace with real, attributable customer reviews before launch.
export const testimonials = [
  {
    quote:
      'They showed me photos of what came out of our vents and I honestly couldn’t believe we’d been breathing that. The house smells different now.',
    name: 'Sarah M.',
    detail: 'Homeowner',
  },
  {
    quote:
      'Quoted $149, paid $149. On time, polite, and they put down floor covers without being asked. Booking again next year.',
    name: 'Daniel R.',
    detail: 'Homeowner',
  },
  {
    quote:
      'We had them do the whole office after hours. Zero disruption, and the stuffy smell in the back rooms is gone.',
    name: 'Priya K.',
    detail: 'Office manager',
  },
]

export const faqs = [
  {
    q: 'What does the $149 special include?',
    a: 'A full cleaning of one AC unit’s supply and return ductwork using a negative-pressure HEPA vacuum and rotary brushes, plus a register wash and a before & after camera inspection. If your home has more than one system, each is priced the same way.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'No. We inspect first and confirm the total with you before starting. If we don’t quote it, you don’t pay it.',
  },
  {
    q: 'How long does a cleaning take?',
    a: 'Most single-unit homes take between two and four hours, depending on the number of vents and how much build-up there is.',
  },
  {
    q: 'How often should air ducts be cleaned?',
    a: 'Every three to five years for most homes. Sooner if you have pets, allergies, smokers in the house, or you’ve just finished a renovation.',
  },
  {
    q: 'Are your products safe for kids and pets?',
    a: 'Yes. We use organic, non-toxic cleaning and mold treatment solutions. You don’t need to leave the house while we work.',
  },
  {
    q: 'Do you work on commercial properties?',
    a: 'We do — offices, retail units, restaurants and multi-unit buildings. We can schedule outside business hours to avoid disrupting your team.',
  },
]
