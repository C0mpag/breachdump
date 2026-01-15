'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Unable to send message');
      }
      setStatus('sent');
      setMessage('Thanks! We will get back to you shortly.');
      trackEvent('contact_submit', { source: 'contact_form' });
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please call us instead.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="text-sm font-semibold text-slate-600">
        Name
        <input name="name" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
      </label>
      <label className="text-sm font-semibold text-slate-600">
        Email
        <input type="email" name="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
      </label>
      <label className="text-sm font-semibold text-slate-600">
        Phone
        <input name="phone" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
      </label>
      <label className="text-sm font-semibold text-slate-600">
        Message
        <textarea name="message" rows={4} required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
      </label>
      <button
        type="submit"
        className="button-primary"
        disabled={status === 'sending'}
      >
        Send message
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
};
