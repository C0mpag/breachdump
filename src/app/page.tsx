import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { CTASection } from '@/components/CTASection';
import { ServiceCard } from '@/components/ServiceCard';
import { FaqList, buildFaqSchema } from '@/components/FaqList';
import { siteConfig } from '@/lib/site';

const faqs = [
  {
    question: 'How often should I mow my lawn in South East Queensland?',
    answer:
      'Most lawns grow quickly in warmer months, so fortnightly mowing is ideal. In cooler months, monthly visits are often enough.'
  },
  {
    question: 'Do you offer once-off tidy-ups?',
    answer: 'Yes. We do once-off jobs, seasonal clean-ups, and ongoing maintenance plans.'
  },
  {
    question: 'Can you take green waste away?',
    answer: 'Absolutely. We can remove clippings and green waste as part of your service.'
  },
  {
    question: 'Do I need to be home for the service?',
    answer:
      'Not always. If we have safe access, we can complete the job and send an update with photos.'
  },
  {
    question: 'What happens if it rains?',
    answer: 'We reschedule in heavy rain to protect your lawn and ensure a neat finish.'
  },
  {
    question: 'Can you work around pets?',
    answer: 'Yes. Let us know about pets so we can plan safe access.'
  },
  {
    question: 'How do you price mowing?',
    answer:
      'Pricing depends on lawn size, growth, access, and requested services. We provide a clear quote after inspection.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfer and card payments via invoice.'
  }
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <Script id="home-faq" type="application/ld+json">
        {JSON.stringify(buildFaqSchema(faqs))}
      </Script>
      <section className="bg-sand">
        <div className="container-base grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Lawn Mowing & Property Maintenance</p>
            <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
              Friendly, reliable lawn care across Brisbane Southside, Logan & the Gold Coast.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {siteConfig.name} keeps your lawns tidy, healthy, and photo-ready with consistent mowing, edging, and garden clean-ups.
              We show up on time, communicate clearly, and leave every property spotless.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/quote" className="button-primary">
                Get a Quote
              </Link>
              <Link href="/services" className="button-outline">
                View Services
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
              <div>✅ Fully insured (placeholder)</div>
              <div>✅ Local family-run team</div>
              <div>✅ Reliable arrival windows</div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/placeholder.svg"
              alt="Lawn mowing team working on a tidy suburban lawn"
              width={560}
              height={560}
              className="rounded-3xl border border-slate-200 shadow-soft"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-base py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="section-title">Why locals choose Branching Out SEQ</h2>
            <p className="section-subtitle">
              We deliver a clean finish, clear communication, and ongoing care plans that keep your property looking its best.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li>• Reliable, on-time service with friendly updates.</li>
              <li>• Insured team with safe equipment and tidy work sites.</li>
              <li>• Flexible scheduling for homeowners, renters, and property managers.</li>
              <li>• Transparent pricing with clear inclusions.</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-ink">Our process</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              <li>1. Book your service or request a quote.</li>
              <li>2. We arrive on time with the right equipment.</li>
              <li>3. Mow, edge, and tidy with care.</li>
              <li>4. Clean up and remove green waste if requested.</li>
              <li>5. Invoice with easy payment options.</li>
            </ol>
            <Link href="/quote" className="mt-6 inline-flex text-sm font-semibold text-brand-700">
              Book your mow →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-base py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="section-title">Services we offer</h2>
              <p className="section-subtitle">
                From weekly mowing to complete garden clean-ups, choose a service plan that suits your property.
              </p>
            </div>
            <Link href="/services" className="hidden text-sm font-semibold text-brand-700 sm:inline-flex">
              View all services →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10">
            <CTASection
              title="Ready for a consistent, tidy lawn?"
              description="Get a fast quote and lock in a schedule that works for you."
            />
          </div>
        </div>
      </section>

      <section className="container-base py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="section-title">Service areas across South East Queensland</h2>
            <p className="section-subtitle">
              We service Brisbane Southside, Logan, and the northern Gold Coast. Explore our local suburb pages for tailored lawn care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {areas.slice(0, 6).map((area) => (
                <Link key={area.slug} href={`/service-areas/${area.slug}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm">
                  {area.name}
                </Link>
              ))}
            </div>
            <Link href="/service-areas" className="mt-6 inline-flex text-sm font-semibold text-brand-700">
              View all service areas →
            </Link>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-ink">Transparent pricing</h3>
            <p className="mt-3 text-sm text-slate-600">
              Lawn mowing starts from $55 for small yards, with mid-size properties typically between $75–$110. Larger or overgrown
              lawns are quoted after inspection. Final pricing is confirmed after we see the property.
            </p>
            <div className="mt-4 text-xs text-slate-500">*Prices are placeholders and vary based on access and conditions.</div>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-base py-16">
          <h2 className="section-title">Trusted by local homeowners</h2>
          <p className="section-subtitle">Review placeholders to be updated with your latest client feedback.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card">
                <p className="text-sm text-slate-600">
                  “Friendly, on-time service and a beautifully tidy lawn. Highly recommend Branching Out SEQ.”
                </p>
                <p className="mt-4 text-sm font-semibold text-ink">Local homeowner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-base py-16">
        <h2 className="section-title">Before & after results</h2>
        <p className="section-subtitle">Add real customer photos to showcase transformation work.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="overflow-hidden rounded-3xl border border-slate-200">
              <Image
                src="/images/placeholder.svg"
                alt="Before and after lawn mowing placeholder"
                width={640}
                height={420}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-base py-16">
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-subtitle">Quick answers to common lawn care questions.</p>
          <FaqList faqs={faqs} />
          <div className="mt-10">
            <CTASection
              title="Let’s get your lawn sorted"
              description="Tell us about your property and we will send a tailored quote."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
