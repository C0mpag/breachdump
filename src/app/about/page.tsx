import type { Metadata } from 'next';
import Script from 'next/script';
import { CTASection } from '@/components/CTASection';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Branching Out SEQ',
  description: 'Learn about Branching Out SEQ, a friendly lawn mowing and property maintenance team servicing South East Queensland.'
};

export default function AboutPage() {
  return (
    <div className="container-base py-16">
      <Script id="about-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' }
          ])
        )}
      </Script>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-ink">A local team that cares about your property</h1>
        <p className="mt-4 text-lg text-slate-600">
          Branching Out SEQ was started to bring reliable, friendly lawn care to busy homeowners and property managers across Brisbane
          Southside, Logan, and the Gold Coast. We believe great lawns come from consistent care, clear communication, and a tidy finish.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-ink">Our values</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Respect for your property and privacy.</li>
              <li>• Reliable scheduling and proactive updates.</li>
              <li>• Friendly, professional service every visit.</li>
              <li>• A tidy finish that feels great to come home to.</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold text-ink">Why choose us</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Local knowledge of SEQ lawn conditions.</li>
              <li>• Fully insured team (placeholder).</li>
              <li>• Flexible plans for rentals and owner-occupiers.</li>
              <li>• Clear, transparent pricing after inspection.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <CTASection
          title="Meet your new lawn care team"
          description="Let us know your goals and we will tailor a mowing plan that works for your property."
        />
      </div>
    </div>
  );
}
