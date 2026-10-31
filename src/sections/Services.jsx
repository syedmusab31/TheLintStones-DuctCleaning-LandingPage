import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { cn } from '../lib/cn'
import { SectionHeading } from '../components/ui/SectionHeading'

function ServiceCard({ service }) {
  const Icon = service.icon
  const hasImage = Boolean(service.image)

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card border border-line bg-white/70 transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgb(18_38_28/0.35)]',
        service.featured && 'md:col-span-2 md:row-span-2',
      )}
    >
      {hasImage && (
        <div
          className={cn(
            'relative overflow-hidden bg-sand',
            service.featured
              ? 'aspect-[16/9] md:aspect-auto md:min-h-72 md:flex-1'
              : 'aspect-[16/9]',
          )}
        >
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col p-6 sm:p-7',
          !service.featured && 'flex-1',
          !hasImage && 'justify-between gap-10',
        )}
      >
        <span
          className={cn(
            'grid size-11 place-items-center rounded-2xl bg-forest-100 text-forest-700',
            hasImage && 'hidden',
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className={cn('font-semibold', service.featured ? 'text-3xl' : 'text-xl')}>
            <a href="#quote" className="after:absolute after:inset-0">
              {service.title}
            </a>
          </h3>
          <p className="mt-2 leading-relaxed text-stone-ink">{service.blurb}</p>
        </div>
      </div>

      <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-cream/90 text-forest-900 shadow-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold-400">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </motion.article>
  )
}

export function Services() {
  return (
    <section id="services" className="bg-sand/60 py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="Everything that moves air through your home."
          description="One crew, one visit. From a single dryer vent to a full commercial system."
        />

        <motion.div
          className="mt-14 grid gap-4 md:grid-cols-3"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
