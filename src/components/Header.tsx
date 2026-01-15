import Link from 'next/link';
import { Logo } from './Logo';
import { TrackedLink } from './TrackedLink';
import { siteConfig } from '@/lib/site';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="container-base flex items-center justify-between py-4">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-brand-700">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/quote" className="button-primary">
          Get a Quote
        </Link>
        <TrackedLink
          href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
          className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700 sm:inline-flex"
          eventName="phone_click"
          data-location="header"
        >
          Call {siteConfig.phone}
        </TrackedLink>
      </div>
    </div>
  </header>
);
