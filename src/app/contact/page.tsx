import type { Metadata } from 'next';
import Script from 'next/script';
import { ContactForm } from '@/components/ContactForm';
import { TrackedLink } from '@/components/TrackedLink';
import { siteConfig } from '@/lib/site';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Branching Out SEQ',
  description: 'Call or email Branching Out SEQ for lawn mowing, hedge trimming, and property maintenance in South East Queensland.'
};

export default function ContactPage() {
  return (
    <div className="container-base py-16">
      <Script id="contact-breadcrumb" type="application/ld+json">
        {JSON.stringify(
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' }
          ])
        )}
      </Script>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Get in touch</h1>
          <p className="mt-4 text-lg text-slate-600">
            Ready to book or have a question? Call, email, or send a message using the form.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              <strong className="text-ink">Phone:</strong>{' '}
              <TrackedLink
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                eventName="phone_click"
                data-location="contact"
                className="link-inline"
              >
                {siteConfig.phone}
              </TrackedLink>
            </p>
            <p>
              <strong className="text-ink">Email:</strong>{' '}
              <TrackedLink
                href={`mailto:${siteConfig.email}`}
                eventName="email_click"
                data-location="contact"
                className="link-inline"
              >
                {siteConfig.email}
              </TrackedLink>
            </p>
            <p>
              <strong className="text-ink">Business hours:</strong> {siteConfig.openingHours.join(', ')}
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-sand p-6 text-sm text-slate-500">
            Service area map embed placeholder.
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold text-ink">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
