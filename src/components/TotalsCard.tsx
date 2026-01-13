import { Quote } from "../types";
import { formatCurrency } from "../utils/quoteUtils";

const TotalsCard = ({
  quote,
  totals,
}: {
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
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Totals</h2>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
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
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Estimated profit (from markups)</span>
          <span>{formatCurrency(totals.profit)}</span>
        </div>
        {quote.depositPercent ? (
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Suggested deposit ({quote.depositPercent}%)</span>
            <span>{formatCurrency((totals.total * quote.depositPercent) / 100)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TotalsCard;
