import type { Metadata } from 'next';
import Script from 'next/script';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Branching Out SEQ.'
};

export default function PrivacyPage() {
  return (
    <div className="container-base py-16">
      <Script id="privacy-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy' }
          ])
        )}
      </Script>
      <h1 className="text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-base text-slate-600">
        We respect your privacy. Any personal information you share is used only to respond to your enquiries and deliver services. We
        do not sell your data, and we store quote details securely.
      </p>
      <p className="mt-4 text-base text-slate-600">
        If you have any questions about this policy, contact us and we will be happy to help.
      </p>
    </div>
  );
}
