import type { Metadata } from 'next';
import Script from 'next/script';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Branching Out SEQ.'
};

export default function TermsPage() {
  return (
    <div className="container-base py-16">
      <Script id="terms-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms of Service', path: '/terms' }
          ])
        )}
      </Script>
      <h1 className="text-4xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-4 text-base text-slate-600">
        Quotes are estimates based on provided information and are confirmed after inspection. We reserve the right to reschedule due
        to weather or safety issues. Payments are due within the agreed timeframe on the invoice.
      </p>
      <p className="mt-4 text-base text-slate-600">
        By booking a service, you agree to provide safe access to the property and to inform us of any hazards or pet considerations.
      </p>
    </div>
  );
}
