import type { Metadata } from 'next';

export type FaqItem = {
  question: string;
  answer: string;
};

export const buildFaqSchema = (faqs: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const FaqList = ({ faqs }: { faqs: FaqItem[] }) => (
  <div className="mt-8 space-y-4">
    {faqs.map((faq) => (
      <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
        <summary className="cursor-pointer text-base font-semibold text-ink">{faq.question}</summary>
        <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
      </details>
    ))}
  </div>
);

export const faqMetadata: Metadata = {
  other: {
    'schema:faq': 'FAQPage'
  }
};
