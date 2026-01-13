import { Quote } from "../types";
import { clampToZero } from "../utils/quoteUtils";

type QuoteFormProps = {
  quote: Quote;
  onChange: (updates: Partial<Quote>) => void;
};

const QuoteForm = ({ quote, onChange }: QuoteFormProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Quote Builder</h2>
      <p className="mb-4 text-sm text-slate-500">Enter client details and scope notes.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Client Name
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.clientName}
            onChange={(event) => onChange({ clientName: event.target.value })}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Address / Job site
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.address}
            onChange={(event) => onChange({ address: event.target.value })}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Quote date
          <input
            type="date"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.quoteDate}
            onChange={(event) => onChange({ quoteDate: event.target.value })}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Valid until
          <input
            type="date"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.validUntil}
            onChange={(event) => onChange({ validUntil: event.target.value })}
          />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Notes / Scope
          <textarea
            className="mt-1 min-h-[96px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={quote.gstEnabled}
            onChange={(event) => onChange({ gstEnabled: event.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600"
          />
          GST 10% (Australia)
        </label>

        <label className="text-sm font-medium text-slate-700">
          Deposit %
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.depositPercent ?? 0}
            onChange={(event) => onChange({ depositPercent: clampToZero(Number(event.target.value)) })}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Travel fee (optional)
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={quote.travelFee ?? 0}
            onChange={(event) => onChange({ travelFee: clampToZero(Number(event.target.value)) })}
          />
        </label>
      </div>
    </div>
  );
};

export default QuoteForm;
