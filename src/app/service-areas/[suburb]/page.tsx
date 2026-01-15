import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areaBySlug, areas } from '@/data/areas';
import { services } from '@/data/services';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildFaqSchema, FaqList } from '@/components/FaqList';
import { CTASection } from '@/components/CTASection';
import { siteConfig } from '@/lib/site';

const buildBreadcrumbSchema = (name: string, slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteConfig.url}/service-areas` },
    { '@type': 'ListItem', position: 3, name, item: `${siteConfig.url}/service-areas/${slug}` }
  ]
});

export const generateStaticParams = async () => areas.map((area) => ({ suburb: area.slug }));

export const generateMetadata = ({ params }: { params: { suburb: string } }): Metadata => {
  const area = areaBySlug(params.suburb);
  if (!area) return { title: 'Area not found' };

  return {
    title: `Lawn Mowing ${area.name} | Local Lawn Care`,
    description: `Book lawn mowing, hedge trimming, garden clean ups, and green waste removal in ${area.name}. Fast quotes from ${siteConfig.name}.`,
    openGraph: {
      title: `Lawn Mowing ${area.name} | ${siteConfig.name}`,
      description: area.description
    }
  };
};

export default function SuburbPage({ params }: { params: { suburb: string } }) {
  const area = areaBySlug(params.suburb);
  if (!area) return notFound();

  const faqs = [
    {
      question: `How quickly can you visit ${area.name}?`,
      answer: `We usually offer bookings within 3 to 5 business days for ${area.name}, depending on seasonal demand.`
    },
    {
      question: `Do you offer garden clean ups in ${area.name}?`,
      answer: `Yes, we provide garden clean ups and green waste removal across ${area.name} and nearby suburbs.`
    },
    {
      question: `Can you provide ongoing mowing in ${area.name}?`,
      answer: 'Absolutely. We schedule regular fortnightly or monthly visits to keep your lawn consistent.'
    }
  ];

  return (
    <div className="container-base py-16">
      <Script id={`area-faq-${area.slug}`} type="application/ld+json">
        {JSON.stringify(buildFaqSchema(faqs))}
      </Script>
      <Script id={`area-breadcrumb-${area.slug}`} type="application/ld+json">
        {JSON.stringify(buildBreadcrumbSchema(area.name, area.slug))}
      </Script>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas' },
          { label: area.name }
        ]}
      />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Lawn mowing in {area.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{area.description}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-ink">Popular services in {area.name}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="link-inline">
                    {service.name} in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-ink">Local highlights</h2>
            <p className="mt-3 text-sm text-slate-600">
              We regularly service homes near {area.landmarks.join(', ')} and across surrounding suburbs like {area.nearby.join(', ')}.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-ink">FAQs</h2>
            <FaqList faqs={faqs} />
          </div>
        </div>
        <aside className="card h-fit">
          <h2 className="text-2xl font-semibold text-ink">Get a local quote</h2>
          <p className="mt-3 text-sm text-slate-600">
            Share your {area.name} address and lawn size, and we will send a tailored mowing quote.
          </p>
          <Link href="/quote" className="button-primary mt-6 w-full">
            Request a quote
          </Link>
          <div className="mt-6 text-sm text-slate-600">
            <p>Phone: {siteConfig.phone}</p>
            <p>Email: {siteConfig.email}</p>
          </div>
        </aside>
      </div>
      <div className="mt-12">
        <CTASection
          title={`Need lawn care in ${area.name}?`}
          description="Let us know what you need and we will organise the right service schedule."
        />
      </div>
    </div>
  );
}
