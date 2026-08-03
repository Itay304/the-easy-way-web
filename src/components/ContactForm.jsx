import { useForm, ValidationError } from '@formspree/react';

const FORMSPREE_FORM_ID = 'mrennjyz';

const inputClasses =
  'w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-brand-text mb-2">צור קשר</h2>
      <p className="text-center text-brand-grey-text mb-10">
        נשמח לענות על כל שאלה — נחזור אליכם בהקדם
      </p>

      {state.succeeded ? (
        <div className="rounded-2xl bg-brand-green/10 border border-brand-green/20 p-8 text-center">
          <p className="text-brand-green font-bold text-lg">ההודעה נשלחה בהצלחה!</p>
          <p className="text-brand-grey-text mt-1">נחזור אליכם בהקדם האפשרי.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input id="name" name="name" type="text" required placeholder="שם מלא" className={inputClasses} />
          <ValidationError prefix="שם" field="name" errors={state.errors} className="text-red-600 text-sm" />

          <input id="school" name="school" type="text" placeholder="בית ספר" className={inputClasses} />
          <ValidationError prefix="בית ספר" field="school" errors={state.errors} className="text-red-600 text-sm" />

          <input id="phone" name="phone" type="tel" placeholder="טלפון" className={inputClasses} />
          <ValidationError prefix="טלפון" field="phone" errors={state.errors} className="text-red-600 text-sm" />

          <input id="email" name="email" type="email" required placeholder="אימייל" className={inputClasses} />
          <ValidationError prefix="אימייל" field="email" errors={state.errors} className="text-red-600 text-sm" />

          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="הודעה"
            className={inputClasses}
          />
          <ValidationError prefix="הודעה" field="message" errors={state.errors} className="text-red-600 text-sm" />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-4 rounded-xl bg-brand-green text-white font-bold text-lg hover:bg-brand-green-dark transition disabled:opacity-60"
          >
            {state.submitting ? 'שולח...' : 'שלח'}
          </button>

          {state.errors && state.errors.getFormErrors().length > 0 && (
            <p className="text-red-600 text-sm text-center">
              משהו השתבש — נסו שוב או צרו קשר ישירות במייל.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
