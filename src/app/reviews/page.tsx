import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: 'Read testimonials from Branching Out SEQ lawn mowing customers across Brisbane Southside, Logan, and the Gold Coast.'
};

export default function ReviewsPage() {
  return (
    <div className="container-base py-16">
      <Script id="reviews-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Reviews', path: '/reviews' }
          ])
        )}
      </Script>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-ink">Reviews from local homeowners</h1>
        <p className="mt-4 text-lg text-slate-600">
          We pride ourselves on friendly service and tidy finishes. Replace these placeholders with your latest Google reviews.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="card">
            <p className="text-sm text-slate-600">
              “Amazing service, the lawn looks perfect and the team were so easy to deal with.”
            </p>
            <p className="mt-4 text-sm font-semibold text-ink">Local customer</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-sand p-8 text-center">
        <h2 className="text-2xl font-semibold text-ink">Want a lawn like this?</h2>
        <p className="mt-3 text-sm text-slate-600">Get a quick quote and we will organise the right schedule.</p>
        <Link href="/quote" className="button-primary mt-6">
          Request a quote
        </Link>
      </div>
      <div className="mt-12">
        <CTASection
          title="Book your next mow"
          description="We respond quickly and keep your lawn looking its best."
        />
      </div>
    </div>
  );
}
