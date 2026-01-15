'use client';

import { useMemo, useState } from 'react';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics';

const frequencies = ['Once-off', 'Fortnightly', 'Monthly'];

type FormState = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  serviceSelections: string[];
  frequency: string;
  lawnSize: string;
  cornerBlock: string;
  accessNotes: string;
  pets: string;
  preferredTime: string;
  extraNotes: string;
  photos: File[];
  website: string;
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  suburb: '',
  serviceSelections: [],
  frequency: 'Once-off',
  lawnSize: '',
  cornerBlock: 'No',
  accessNotes: '',
  pets: 'No',
  preferredTime: '',
  extraNotes: '',
  photos: [],
  website: ''
};

export const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canProceed = useMemo(() => {
    if (step === 1) {
      return form.name && form.phone && form.email && form.suburb;
    }
    if (step === 2) {
      return form.serviceSelections.length > 0 && form.frequency;
    }
    if (step === 3) {
      return form.lawnSize;
    }
    return true;
  }, [form, step]);

  const toggleService = (slug: string) => {
    setForm((current) => ({
      ...current,
      serviceSelections: current.serviceSelections.includes(slug)
        ? current.serviceSelections.filter((item) => item !== slug)
        : [...current.serviceSelections, slug]
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'photos') {
          form.photos.forEach((photo) => formData.append('photos', photo));
          return;
        }
        if (key === 'serviceSelections') {
          formData.append('services', form.serviceSelections.join(', '));
          return;
        }
        if (Array.isArray(value)) {
          formData.append(key, value.join(', '));
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || 'Unable to submit quote right now.');
      }

      trackEvent('quote_submit', { source: 'quote_form' });
      window.location.href = '/quote/success';
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Something went wrong.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-700">Step {step} of 4</p>
          <h2 className="text-2xl font-semibold text-ink">Request a fast, friendly quote</h2>
        </div>
        <div className="text-sm text-slate-500">{submitting ? 'Sending…' : 'Response in 1 business day'}</div>
      </div>

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-600">
            Full name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Phone number
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Email address
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Suburb
            <input
              value={form.suburb}
              onChange={(event) => setForm({ ...form, suburb: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </label>
          <label className="hidden">
            Website
            <input
              value={form.website}
              onChange={(event) => setForm({ ...form, website: event.target.value })}
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-600">Select services</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <label key={service.slug} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    checked={form.serviceSelections.includes(service.slug)}
                    onChange={() => toggleService(service.slug)}
                    className="mt-1"
                  />
                  <span>
                    <span className="text-sm font-semibold text-ink">{service.name}</span>
                    <span className="mt-1 block text-xs text-slate-500">{service.shortDescription}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">Preferred frequency</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {frequencies.map((frequency) => (
                <button
                  key={frequency}
                  type="button"
                  onClick={() => setForm({ ...form, frequency })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    form.frequency === frequency
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {frequency}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-600">
            Approx lawn size (m²)
            <input
              value={form.lawnSize}
              onChange={(event) => setForm({ ...form, lawnSize: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="e.g. 120"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Corner block?
            <select
              value={form.cornerBlock}
              onChange={(event) => setForm({ ...form, cornerBlock: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Access notes
            <input
              value={form.accessNotes}
              onChange={(event) => setForm({ ...form, accessNotes: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Gate code, slope, parking..."
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Pets on site?
            <select
              value={form.pets}
              onChange={(event) => setForm({ ...form, pets: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-600">
            Upload photos (optional)
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(event) =>
                setForm({
                  ...form,
                  photos: event.target.files ? Array.from(event.target.files) : []
                })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Preferred date & time
            <input
              value={form.preferredTime}
              onChange={(event) => setForm({ ...form, preferredTime: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="e.g. Tuesday morning"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600 sm:col-span-2">
            Extra notes
            <textarea
              value={form.extraNotes}
              onChange={(event) => setForm({ ...form, extraNotes: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              rows={4}
              placeholder="Anything else we should know?"
            />
          </label>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        {step > 1 && (
          <button
            type="button"
            className="button-outline"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        {step < 4 && (
          <button
            type="button"
            className="button-primary"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
          >
            Continue
          </button>
        )}
        {step === 4 && (
          <button type="button" className="button-primary" onClick={handleSubmit} disabled={submitting}>
            Submit Quote Request
          </button>
        )}
      </div>
    </div>
  );
};
