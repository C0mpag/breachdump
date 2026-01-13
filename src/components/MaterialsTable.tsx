import { MaterialItem } from "../types";
import { calcLineTotals, clampToZero, formatCurrency } from "../utils/quoteUtils";

const createId = () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

type MaterialsTableProps = {
  materials: MaterialItem[];
  onChange: (items: MaterialItem[]) => void;
};

const MaterialsTable = ({ materials, onChange }: MaterialsTableProps) => {
  const updateItem = (id: string, updates: Partial<MaterialItem>) => {
    onChange(materials.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const addItem = () => {
    onChange([
      ...materials,
      {
        id: createId(),
        name: "",
        unit: "m²",
        unitCost: 0,
        quantity: 0,
        markupPercent: 20,
      },
    ]);
  };

  const removeItem = (id: string) => {
    onChange(materials.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Materials</h3>
        <button
          type="button"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          onClick={addItem}
        >
          Add item
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-xs">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-2">Item name</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Unit cost</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Markup %</th>
              <th className="p-2 text-right">Line total</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {materials.map((item) => {
              const totals = calcLineTotals(item);
              return (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="p-2">
                    <input
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.name}
                      onChange={(event) => updateItem(item.id, { name: event.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.unit}
                      onChange={(event) => updateItem(item.id, { unit: event.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.unitCost}
                      onChange={(event) =>
                        updateItem(item.id, { unitCost: clampToZero(Number(event.target.value)) })
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded border border-slate-200 px-2 py-1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateItem(item.id, { quantity: clampToZero(Number(event.target.value)) })
                      }
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

export default MaterialsTable;
