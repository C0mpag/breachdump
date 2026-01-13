import { Quote } from "../types";

const QuoteList = ({ quotes, onLoadQuote }: { quotes: Quote[]; onLoadQuote: (quote: Quote) => void }) => {
  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        No saved quotes yet. Save the current quote to build your history.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Saved Quotes</h2>
      <p className="text-sm text-slate-500">Load a previous quote from this list.</p>
      <ul className="mt-4 divide-y divide-slate-100 text-sm">
        {quotes.map((quote) => (
          <li key={quote.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="font-semibold text-slate-800">{quote.clientName}</p>
              <p className="text-xs text-slate-500">{quote.address}</p>
            </div>
            <div className="text-xs text-slate-500">Created {new Date(quote.createdAt).toLocaleDateString()}</div>
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
              onClick={() => onLoadQuote(quote)}
            >
              Load
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
