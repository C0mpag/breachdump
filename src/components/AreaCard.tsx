import Link from 'next/link';
import type { Area } from '@/data/areas';

export const AreaCard = ({ area }: { area: Area }) => (
  <article className="card">
    <h3 className="text-xl font-semibold text-ink">{area.name}</h3>
    <p className="mt-3 text-sm text-slate-600">{area.description}</p>
    <div className="mt-4 text-sm text-slate-500">Nearby: {area.nearby.join(', ')}</div>
    <Link href={`/service-areas/${area.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-700">
      View local services →
    </Link>
  </article>
);
