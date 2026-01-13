import { LabourItem, MaterialItem, Quote } from "../types";

const AUD_FORMATTER = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number) => AUD_FORMATTER.format(value);

export const formatArea = (value: number) => `${value.toFixed(2)} m²`;

export const clampToZero = (value: number) => (Number.isNaN(value) ? 0 : Math.max(0, value));

export const calcLineTotals = (item: MaterialItem | LabourItem, isLabour = false) => {
  const unitCost = "unitCost" in item ? item.unitCost : item.hourlyRate;
  const quantity = "quantity" in item ? item.quantity : item.hours;
  const baseCost = clampToZero(unitCost) * clampToZero(quantity);
  const markup = clampToZero(item.markupPercent);
  const total = baseCost * (1 + markup / 100);
  return { baseCost, total, markupValue: total - baseCost };
};

export const calculateTotals = (quote: Quote) => {
  const materials = quote.materials.map((item) => calcLineTotals(item));
  const labour = quote.labour.map((item) => calcLineTotals(item, true));
  const materialsSubtotal = materials.reduce((sum, item) => sum + item.total, 0);
  const labourSubtotal = labour.reduce((sum, item) => sum + item.total, 0);
  const profit = [...materials, ...labour].reduce((sum, item) => sum + item.markupValue, 0);
  const travelFee = clampToZero(quote.travelFee ?? 0);
  const subtotal = materialsSubtotal + labourSubtotal + travelFee;
  const gst = quote.gstEnabled ? subtotal * 0.1 : 0;
  const total = subtotal + gst;
  return {
    materialsSubtotal,
    labourSubtotal,
    travelFee,
    subtotal,
    gst,
    total,
    profit,
  };
};
