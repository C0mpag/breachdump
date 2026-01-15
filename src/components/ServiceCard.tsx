import Link from 'next/link';
import type { Service } from '@/data/services';

export const ServiceCard = ({ service }: { service: Service }) => (
  <article className="card flex h-full flex-col">
    <h3 className="text-xl font-semibold text-ink">{service.name}</h3>
    <p className="mt-3 text-sm text-slate-600">{service.shortDescription}</p>
    <div className="mt-6">
      <Link href={`/services/${service.slug}`} className="link-inline text-sm font-semibold">
        Learn more →
      </Link>
    </div>
  </article>
);
