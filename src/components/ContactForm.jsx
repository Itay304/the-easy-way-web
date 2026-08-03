import { useState } from 'react';

// יש ליצור טופס חינמי ב-https://formspree.io (מחובר ל-itayzweiss@gmail.com)
// ולהחליף את המזהה למטה במזהה האמיתי שמתקבל שם.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-brand-text mb-2">צור קשר</h2>
      <p className="text-center text-brand-grey-text mb-10">
        נשמח לענות על כל שאלה — נחזור אליכם בהקדם
      </p>

      {status === 'sent' ? (
        <div className="rounded-2xl bg-brand-green/10 border border-brand-green/20 p-8 text-center">
          <p className="text-brand-green font-bold text-lg">ההודעה נשלחה בהצלחה!</p>
          <p className="text-brand-grey-text mt-1">נחזור אליכם בהקדם האפשרי.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="שם מלא"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <input
            name="school"
            type="text"
            placeholder="בית ספר"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <input
            name="phone"
            type="tel"
            placeholder="טלפון"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="אימייל"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="הודעה"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 rounded-xl bg-brand-green text-white font-bold text-lg hover:bg-brand-green-dark transition disabled:opacity-60"
          >
            {status === 'sending' ? 'שולח...' : 'שלח'}
          </button>
          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">
              משהו השתבש — נסו שוב או צרו קשר ישירות במייל.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
