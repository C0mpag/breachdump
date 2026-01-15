import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function QuoteSuccessPage() {
  return (
    <div className="container-base py-20">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <h1 className="text-3xl font-semibold text-ink">Thanks for your quote request!</h1>
        <p className="mt-4 text-base text-slate-600">
          We have received your details and will be in touch within one business day. If you need a quicker response, give us a call.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="button-primary">
            Call {siteConfig.phone}
          </a>
          <Link href="/" className="button-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
