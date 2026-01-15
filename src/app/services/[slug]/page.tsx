import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, serviceBySlug } from '@/data/services';
import { FaqList, buildFaqSchema } from '@/components/FaqList';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/site';

const buildBreadcrumbSchema = (name: string, slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
    { '@type': 'ListItem', position: 3, name, item: `${siteConfig.url}/services/${slug}` }
  ]
});

export const generateStaticParams = async () => services.map((service) => ({ slug: service.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const service = serviceBySlug(params.slug);
  if (!service) {
    return { title: 'Service not found' };
  }
  return {
    title: `${service.name} in Brisbane Southside, Logan & Gold Coast`,
    description: `${service.shortDescription} Book ${service.name.toLowerCase()} with ${siteConfig.name} today.`,
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.shortDescription
    }
  };
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceBySlug(params.slug);
  if (!service) return notFound();

  return (
    <div className="container-base py-16">
      <Script id={`service-faq-${service.slug}`} type="application/ld+json">
        {JSON.stringify(buildFaqSchema(service.faqs))}
      </Script>
      <Script id={`service-breadcrumb-${service.slug}`} type="application/ld+json">
        {JSON.stringify(buildBreadcrumbSchema(service.name, service.slug))}
      </Script>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name }
        ]}
      />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-4xl font-semibold text-ink">{service.name} in South East Queensland</h1>
          <p className="mt-4 text-lg text-slate-600">{service.description}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-ink">What’s included</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {service.inclusions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-ink">FAQs</h2>
            <FaqList faqs={service.faqs} />
          </div>
        </div>
        <aside className="card h-fit">
          <h2 className="text-2xl font-semibold text-ink">Get a fast quote</h2>
          <p className="mt-3 text-sm text-slate-600">
            Tell us about your {service.name.toLowerCase()} needs. We will respond within one business day with clear pricing.
          </p>
          <Link href="/quote" className="button-primary mt-6 w-full">
            Get a Quote
          </Link>
          <div className="mt-6 text-sm text-slate-600">
            <p>Servicing Brisbane Southside, Logan & the Gold Coast.</p>
          </div>
        </aside>
      </div>
      <div className="mt-12">
        <CTASection
          title="Keep your lawn sharp year-round"
          description="Combine mowing, edging, and green waste removal for a tidy, consistent finish."
        />
      </div>
    </div>
  );
}
