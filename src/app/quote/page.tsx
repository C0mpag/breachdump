import type { Metadata } from 'next';
import Script from 'next/script';
import { QuoteForm } from '@/components/QuoteForm';
import { TrackedLink } from '@/components/TrackedLink';
import { siteConfig } from '@/lib/site';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Get a Quote | Lawn Mowing Brisbane Southside & Logan',
  description:
    'Request a fast quote for lawn mowing, hedge trimming, or garden clean-ups across Brisbane Southside, Logan, and the Gold Coast.'
};

export default function QuotePage() {
  return (
    <div className="container-base py-16">
      <Script id="quote-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Get a Quote', path: '/quote' }
          ])
        )}
      </Script>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Get a fast lawn care quote</h1>
          <p className="mt-4 text-lg text-slate-600">
            Share a few details about your property and we will respond within one business day with clear pricing.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-sand p-6 text-sm text-slate-600">
            <p className="font-semibold text-ink">Prefer to chat?</p>
            <p className="mt-2">
              Call{' '}
              <TrackedLink
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                eventName="phone_click"
                data-location="quote"
                className="link-inline"
              >
                {siteConfig.phone}
              </TrackedLink>{' '}
              or email{' '}
              <TrackedLink
                href={`mailto:${siteConfig.email}`}
                eventName="email_click"
                data-location="quote"
                className="link-inline"
              >
                {siteConfig.email}
              </TrackedLink>
              .
            </p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
