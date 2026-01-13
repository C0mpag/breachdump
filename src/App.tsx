import { useCallback, useMemo, useState } from "react";
import { LabourItem, MaterialItem, Quote } from "./types";
import QuoteForm from "./components/QuoteForm";
import MaterialsTable from "./components/MaterialsTable";
import LabourTable from "./components/LabourTable";
import MapSelector from "./components/MapSelector";
import TotalsCard from "./components/TotalsCard";
import QuotePreview from "./components/QuotePreview";
import QuoteList from "./components/QuoteList";
import { calculateTotals } from "./utils/quoteUtils";
import { loadQuotes, saveQuotes } from "./utils/storage";

const createId = () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

const createSampleQuote = (): Quote => {
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(today.getDate() + 14);

  return {
    id: createId(),
    clientName: "Alex Turner",
    address: "24 Gardenia Ave, Manly NSW",
    quoteDate: today.toISOString().slice(0, 10),
    validUntil: validUntil.toISOString().slice(0, 10),
    notes: "Scope: Remove existing turf, level soil, and install premium turf. Includes edging, cleanup, and green waste removal.",
    gstEnabled: true,
    depositPercent: 30,
    travelFee: 45,
    measuredAreaM2: 82.5,
    areaType: "Turf",
    materials: [
      {
        id: createId(),
        name: "Premium turf supply",
        unit: "m²",
        unitCost: 9,
        quantity: 82.5,
        markupPercent: 20,
      },
      {
        id: createId(),
        name: "Top soil",
        unit: "m³",
        unitCost: 65,
        quantity: 2,
        markupPercent: 20,
      },
    ],
    labour: [
      {
        id: createId(),
        role: "Landscaper",
        hourlyRate: 85,
        hours: 8,
        markupPercent: 15,
      },
      {
        id: createId(),
        role: "Labourer",
        hourlyRate: 55,
        hours: 6,
        markupPercent: 10,
      },
    ],
    createdAt: new Date().toISOString(),
  };
};

const App = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>(() => loadQuotes());
  const [quote, setQuote] = useState<Quote>(() => {
    const existing = loadQuotes();
    return existing[0] ?? createSampleQuote();
  });

  const totals = useMemo(() => calculateTotals(quote), [quote]);

  const updateQuote = useCallback((updates: Partial<Quote>) => {
    setQuote((current) => ({ ...current, ...updates }));
  }, []);

  const updateMaterials = (materials: MaterialItem[]) => updateQuote({ materials });
  const updateLabour = (labour: LabourItem[]) => updateQuote({ labour });

  const handleSaveQuote = () => {
    const quoteToSave = { ...quote, createdAt: new Date().toISOString() };
    const updated = [quoteToSave, ...savedQuotes.filter((item) => item.id !== quote.id)].slice(0, 20);
    setSavedQuotes(updated);
    saveQuotes(updated);
    setQuote(quoteToSave);
  };

  const handleLoadQuote = (loaded: Quote) => {
    setQuote(loaded);
  };

  const handleApplyAreaToMaterial = (materialId: string) => {
    setQuote((current) => ({
      ...current,
      materials: current.materials.map((item) =>
        item.id === materialId ? { ...item, quantity: current.measuredAreaM2 } : item
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">LawnHub</h1>
            <p className="text-sm text-slate-500">Fast landscaping quote builder</p>
          </div>
          <button
            type="button"
            className="no-print rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            onClick={handleSaveQuote}
          >
            Save Quote
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
        <section className="space-y-6">
          <QuoteForm quote={quote} onChange={updateQuote} />
          <TotalsCard quote={quote} totals={totals} />
        </section>

        <section className="space-y-6">
          <MapSelector
            quote={quote}
            onChange={updateQuote}
            onApplyAreaToMaterial={handleApplyAreaToMaterial}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Line Items</h2>
            <p className="mb-4 text-sm text-slate-500">Capture materials and labour line items for this quote.</p>
            <div className="space-y-6">
              <MaterialsTable materials={quote.materials} onChange={updateMaterials} />
              <LabourTable labour={quote.labour} onChange={updateLabour} />
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto max-w-7xl space-y-6 px-6 pb-10">
        <QuotePreview quote={quote} totals={totals} onPrint={() => window.print()} />
        <QuoteList quotes={savedQuotes} onLoadQuote={handleLoadQuote} />
      </section>
    </div>
  );
};

export default App;
