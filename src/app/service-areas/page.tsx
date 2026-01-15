import type { Metadata } from 'next';
import Script from 'next/script';
import { areas } from '@/data/areas';
import { AreaCard } from '@/components/AreaCard';
import { CTASection } from '@/components/CTASection';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Service Areas | Brisbane Southside, Logan & Gold Coast',
  description:
    'Branching Out SEQ services Brisbane Southside, Logan, Beenleigh, Ormeau, Pimpama, and nearby suburbs with lawn mowing and property maintenance.'
};

export default function ServiceAreasPage() {
  return (
    <div className="container-base py-16">
      <Script id="service-areas-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service Areas', path: '/service-areas' }
          ])
        )}
      </Script>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-ink">Local lawn mowing across South East Queensland</h1>
        <p className="mt-4 text-lg text-slate-600">
          Our team services Brisbane Southside, Logan, and the northern Gold Coast. Browse suburb pages for localised mowing, hedge
          trimming, and garden clean-up support.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>
      <div className="mt-12">
        <CTASection
          title="Not sure if we service your suburb?"
          description="Send us your address and we will confirm availability within one business day."
        />
      </div>
    </div>
  );
}
