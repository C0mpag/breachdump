import Link from 'next/link';

export const CTASection = ({
  title,
  description,
  buttonLabel = 'Get a Quote'
}: {
  title: string;
  description: string;
  buttonLabel?: string;
}) => (
  <section className="rounded-3xl bg-brand-50 px-6 py-10 text-center shadow-soft sm:px-12">
    <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
    <p className="mt-3 text-base text-slate-600">{description}</p>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <Link href="/quote" className="button-primary">
        {buttonLabel}
      </Link>
      <Link href="/contact" className="button-outline">
        Contact Us
      </Link>
    </div>
  </section>
);
