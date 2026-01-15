'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export const MobileStickyFooter = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-slate-200 bg-white px-4 py-3 shadow-soft sm:hidden">
    <a
      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
      className="flex-1 rounded-full bg-brand-600 py-3 text-center text-sm font-semibold text-white"
      onClick={() => trackEvent('phone_click', { location: 'mobile_sticky' })}
    >
      Call Now
    </a>
    <Link href="/quote" className="flex-1 rounded-full border border-brand-600 py-3 text-center text-sm font-semibold text-brand-700">
      Get a Quote
    </Link>
  </div>
);
