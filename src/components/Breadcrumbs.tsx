import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
    <ol className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-500">{item.label}</span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </li>
      ))}
    </ol>
  </nav>
);
