import { LabourItem } from "../types";
import { calcLineTotals, clampToZero, formatCurrency } from "../utils/quoteUtils";

const createId = () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

type LabourTableProps = {
  labour: LabourItem[];
  onChange: (items: LabourItem[]) => void;
};

const LabourTable = ({ labour, onChange }: LabourTableProps) => {
  const updateItem = (id: string, updates: Partial<LabourItem>) => {
    onChange(labour.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const addItem = () => {
    onChange([
      ...labour,
      {
        id: createId(),
        role: "",
        hourlyRate: 0,
        hours: 0,
        markupPercent: 20,
      },
    ]);
  };

  const removeItem = (id: string) => {
    onChange(labour.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Labour</h3>
        <button
          type="button"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          onClick={addItem}
        >
          Add labour line
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-2">Role</th>
              <th className="p-2">Hourly rate</th>
              <th className="p-2">Hours</th>
              <th className="p-2">Markup %</th>
              <th className="p-2 text-right">Line total</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {labour.map((item) => {
              const totals = calcLineTotals(item, true);
              return (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="p-2">
                    <input
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.role}
                      onChange={(event) => updateItem(item.id, { role: event.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.hourlyRate}
                      onChange={(event) =>
                        updateItem(item.id, { hourlyRate: clampToZero(Number(event.target.value)) })
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.hours}
                      onChange={(event) => updateItem(item.id, { hours: clampToZero(Number(event.target.value)) })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.markupPercent}
                      onChange={(event) =>
                        updateItem(item.id, { markupPercent: clampToZero(Number(event.target.value)) })
                      }
                    />
                  </td>
                  <td className="p-2 text-right font-semibold text-slate-700">
                    {formatCurrency(totals.total)}
                  </td>
                  <td className="p-2 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-rose-600"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabourTable;
