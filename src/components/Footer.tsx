import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { TrackedLink } from './TrackedLink';

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-sand">
    <div className="container-base grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
      <div>
        <h2 className="text-xl font-semibold">{siteConfig.name}</h2>
        <p className="mt-3 text-sm text-slate-600">{siteConfig.description}</p>
        <div className="mt-4 text-sm text-slate-600">
          <p>ABN: {siteConfig.abn}</p>
          <p>
            Phone:{' '}
            <TrackedLink
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              eventName="phone_click"
              data-location="footer"
              className="link-inline"
            >
              {siteConfig.phone}
            </TrackedLink>
          </p>
          <p>
            Email:{' '}
            <TrackedLink
              href={`mailto:${siteConfig.email}`}
              eventName="email_click"
              data-location="footer"
              className="link-inline"
            >
              {siteConfig.email}
            </TrackedLink>
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Quick Links</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            <Link href="/services" className="hover:text-brand-700">
              Services
            </Link>
          </li>
          <li>
            <Link href="/service-areas" className="hover:text-brand-700">
              Service Areas
            </Link>
          </li>
          <li>
            <Link href="/quote" className="hover:text-brand-700">
              Get a Quote
            </Link>
          </li>
          <li>
            <Link href="/reviews" className="hover:text-brand-700">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Policies</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            <Link href="/privacy" className="hover:text-brand-700">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-brand-700">
              Terms of Service
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-xs text-slate-500">Open: {siteConfig.openingHours.join(', ')}</p>
      </div>
    </div>
    <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </div>
  </footer>
);
