import { Quote } from "../types";

const STORAGE_KEY = "lawnhub-quotes";

export const loadQuotes = (): Quote[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Quote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveQuotes = (quotes: Quote[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
};
