import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { services } from '@/data/services';
import { ServiceCard } from '@/components/ServiceCard';
import { buildFaqSchema, FaqList } from '@/components/FaqList';
import { CTASection } from '@/components/CTASection';
import { buildBreadcrumbSchema } from '@/lib/seo';

const faqs = [
  {
    question: 'Can I bundle multiple services together?',
    answer: 'Yes. We can combine mowing, edging, and clean-ups into a single visit.'
  },
  {
    question: 'Do you service rental properties?',
    answer: 'Absolutely. We provide regular visits for landlords and property managers.'
  }
];

export const metadata: Metadata = {
  title: 'Lawn Mowing & Property Maintenance Services',
  description:
    'Explore lawn mowing, edging, hedge trimming, garden clean-ups, and green waste removal across Brisbane Southside, Logan, and the Gold Coast.'
};

export default function ServicesPage() {
  return (
    <div className="container-base py-16">
      <Script id="services-faq" type="application/ld+json">
        {JSON.stringify(buildFaqSchema(faqs))}
      </Script>
      <Script id="services-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }
          ])
        )}
      </Script>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-ink">Lawn care services tailored to your property</h1>
        <p className="mt-4 text-lg text-slate-600">
          Choose from one-off tidy-ups or set-and-forget maintenance plans. We keep your property looking sharp with reliable mowing,
          edging, and garden support services.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card">
          <h2 className="text-2xl font-semibold text-ink">Need help choosing?</h2>
          <p className="mt-3 text-sm text-slate-600">
            Tell us about your property and we will recommend the right service mix and schedule.
          </p>
          <Link href="/quote" className="mt-6 inline-flex text-sm font-semibold text-brand-700">
            Request a quote →
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">FAQs</h2>
          <FaqList faqs={faqs} />
        </div>
      </div>
      <div className="mt-12">
        <CTASection
          title="Book your lawn care today"
          description="We handle mowing, edging, and clean-ups with clear communication and tidy finishes."
        />
      </div>
    </div>
  );
}
