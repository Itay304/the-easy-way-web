import { useForm, ValidationError } from '@formspree/react';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';

const FORMSPREE_FORM_ID = 'mrennjyz';

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
          <Input id="name" name="name" type="text" required placeholder="שם מלא" />
          <ValidationError prefix="שם" field="name" errors={state.errors} className="text-brand-error text-sm" />

          <Input id="school" name="school" type="text" placeholder="בית ספר" />
          <ValidationError prefix="בית ספר" field="school" errors={state.errors} className="text-brand-error text-sm" />

          <Input id="phone" name="phone" type="tel" placeholder="טלפון" />
          <ValidationError prefix="טלפון" field="phone" errors={state.errors} className="text-brand-error text-sm" />

          <Input id="email" name="email" type="email" required placeholder="אימייל" />
          <ValidationError prefix="אימייל" field="email" errors={state.errors} className="text-brand-error text-sm" />

          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="הודעה"
            className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
          />
          <ValidationError prefix="הודעה" field="message" errors={state.errors} className="text-brand-error text-sm" />

          <Button type="submit" disabled={state.submitting} className="w-full disabled:opacity-60">
            {state.submitting ? 'שולח...' : 'שלח'}
          </Button>

          {state.errors && state.errors.getFormErrors().length > 0 && (
            <p className="text-brand-error text-sm text-center">
              משהו השתבש — נסו שוב או צרו קשר ישירות במייל.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
