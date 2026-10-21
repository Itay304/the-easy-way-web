import { useForm } from '@formspree/react';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';
import Reveal from './ui/Reveal.jsx';

const FORMSPREE_FORM_ID = 'mrennjyz';

// הודעות שגיאה בעברית לכל שדה — במקום ההודעות של Formspree (שמגיעות באנגלית).
const FIELD_ERRORS = {
  name: 'נא למלא שם.',
  email: 'נא למלא כתובת אימייל תקינה.',
  message: 'נא לכתוב הודעה.',
};

function FieldError({ errors, field }) {
  const has = errors?.getFieldErrors(field)?.length > 0;
  if (!has) return null;
  return (
    <p id={`${field}-error`} className="mt-1 text-caption font-semibold text-brand-error-dark">
      {FIELD_ERRORS[field] || 'נא לבדוק את השדה הזה.'}
    </p>
  );
}

// 6 — סיום: טופס יצירת קשר (Formspree). אין באתר שום כתובת אימייל גלויה.
export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const formError = state.errors && state.errors.getFormErrors().length > 0;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <h2 id="contact-title" className="text-section font-extrabold text-ink text-balance">
            רוצים לראות את זה אצלכם בבית הספר?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink/80 text-pretty">
            השאירו פרטים ונחזור אליכם לתיאום הדגמה קצרה.
          </p>
        </Reveal>

        <div className="mt-10 rounded-3xl border border-ink/10 bg-mist/60 p-5 sm:p-8">
          {state.succeeded ? (
            <div role="status" className="py-6 text-center">
              <p className="text-body-lg font-bold text-ink">ההודעה נשלחה בהצלחה!</p>
              <p className="mt-1 text-ink/80">נחזור אליכם בהקדם האפשרי.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input id="name" name="name" type="text" required autoComplete="name" label="שם מלא" />
                  <FieldError errors={state.errors} field="name" />
                </div>
                <div>
                  <Input id="school" name="school" type="text" autoComplete="organization" label="בית ספר" />
                </div>
                <div>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className="text-right" label="טלפון" />
                </div>
                <div>
                  <Input id="email" name="email" type="email" required autoComplete="email" dir="ltr" className="text-right" label="אימייל" />
                  <FieldError errors={state.errors} field="email" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block font-semibold text-ink">
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-ink/25 bg-white px-4 py-3 text-ink focus:border-ink"
                />
                <FieldError errors={state.errors} field="message" />
              </div>

              <Button type="submit" disabled={state.submitting} className="w-full">
                {state.submitting ? 'שולח...' : 'שלח'}
              </Button>

              {formError && (
                <p role="alert" className="text-center text-caption font-semibold text-brand-error-dark">
                  משהו השתבש — נסו שוב בעוד רגע.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
