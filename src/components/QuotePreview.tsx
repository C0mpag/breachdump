import { Quote } from "../types";
import { calcLineTotals, formatArea, formatCurrency } from "../utils/quoteUtils";

type QuotePreviewProps = {
  quote: Quote;
  totals: {
    materialsSubtotal: number;
    labourSubtotal: number;
    travelFee: number;
    subtotal: number;
    gst: number;
    total: number;
    profit: number;
  };
  onPrint: () => void;
};

const QuotePreview = ({ quote, totals, onPrint }: QuotePreviewProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print-area">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Quote Summary</h2>
          <p className="text-sm text-slate-500">LawnHub Landscaping Co.</p>
        </div>
        <button
          type="button"
          className="no-print rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          onClick={onPrint}
        >
          Print / Save PDF
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <h3 className="text-sm font-semibold text-slate-600">Client</h3>
          <p className="text-base font-semibold text-slate-900">{quote.clientName}</p>
          <p className="text-sm text-slate-600">{quote.address}</p>
          <div className="mt-3 text-sm text-slate-600">
            <p>
              Quote date: <span className="font-medium text-slate-900">{quote.quoteDate}</span>
            </p>
            <p>
              Valid until: <span className="font-medium text-slate-900">{quote.validUntil}</span>
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Measured Area</p>
          <p className="text-lg font-semibold text-emerald-700">{formatArea(quote.measuredAreaM2)}</p>
          <p className="text-sm text-slate-500">Area type: {quote.areaType}</p>
          {quote.depositPercent ? (
            <p className="mt-2 text-xs text-slate-600">
              Suggested deposit: {formatCurrency((totals.total * quote.depositPercent) / 100)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-600">Scope / Notes</h3>
        <p className="mt-1 text-sm text-slate-700">{quote.notes}</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-600">Materials</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="pb-2 text-left">Item</th>
                <th className="pb-2 text-right">Qty</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.materials.map((item) => {
                const totals = calcLineTotals(item);
                return (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-2">
                      <div className="font-medium text-slate-800">{item.name || "Material"}</div>
                      <div className="text-xs text-slate-500">
                        {item.quantity} {item.unit} @ {formatCurrency(item.unitCost)} + {item.markupPercent}%
                      </div>
                    </td>
                    <td className="py-2 text-right text-slate-600">{item.quantity}</td>
                    <td className="py-2 text-right font-semibold text-slate-800">
                      {formatCurrency(totals.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-600">Labour</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="pb-2 text-left">Role</th>
                <th className="pb-2 text-right">Hours</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.labour.map((item) => {
                const totals = calcLineTotals(item, true);
                return (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-2">
                      <div className="font-medium text-slate-800">{item.role || "Labour"}</div>
                      <div className="text-xs text-slate-500">
                        {item.hours} hrs @ {formatCurrency(item.hourlyRate)} + {item.markupPercent}%
                      </div>
                    </td>
                    <td className="py-2 text-right text-slate-600">{item.hours}</td>
                    <td className="py-2 text-right font-semibold text-slate-800">
                      {formatCurrency(totals.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-sm space-y-2 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Materials subtotal</span>
            <span className="font-semibold text-slate-900">{formatCurrency(totals.materialsSubtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Labour subtotal</span>
            <span className="font-semibold text-slate-900">{formatCurrency(totals.labourSubtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Travel fee</span>
            <span className="font-semibold text-slate-900">{formatCurrency(totals.travelFee)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          {quote.gstEnabled && (
            <div className="flex items-center justify-between">
              <span>GST (10%)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(totals.gst)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-lg font-semibold text-emerald-700">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePreview;
