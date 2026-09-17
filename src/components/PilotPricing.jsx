import { useState } from 'react';
import { Check } from 'lucide-react';

const INCLUDED = [
  'גישה מלאה ל-8 מודולי תרגול',
  'כל 5,040 מילים של משרד החינוך עם תרגום, דוגמאות והגדרות',
  'לוח בקרה למורים — ניהול כיתות, מעקב התקדמות, מפת חום',
  'Push notifications לתזכורות יומיות לתלמידים',
  'תמיכה טכנית לאורך כל שנת הפיילוט',
  'מתאים לרכש דרך קופה קטנה / תקציבי גפ"ן',
];

// %0D (לא %0A) לירידות שורה — לפי הפורמט המבוקש; שאר החלקים מקודדים
// כרגיל (encodeURIComponent) כדי שהקישור יהיה תקין (רווחים/עברית).
const MAILTO_HREF =
  'mailto:silverquilleducation@gmail.com' +
  '?subject=' +
  encodeURIComponent('הצטרפות לפיילוט EasyLex') +
  '&body=' +
  ['שם המוסד:', 'שם איש הקשר:', 'טלפון:', 'אימייל מוסדי:'].map(encodeURIComponent).join('%0D');

export default function PilotPricing() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-brand-text mb-10">פיילוט מורחב</h2>

      <div className="rounded-3xl bg-gradient-to-br from-brand-turquoise to-brand-turquoise-dark p-1 shadow-xl">
        <div className="rounded-[22px] bg-white p-8 sm:p-10">
          <div className="text-center mb-6">
            <span className="inline-block rounded-full bg-brand-turquoise/10 text-brand-turquoise font-bold text-sm px-4 py-1.5 mb-4">
              מחיר השקה מיוחד
            </span>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-2xl text-brand-grey-text line-through">5,000 ₪</span>
              <span className="text-4xl font-extrabold text-brand-text">2,500 ₪ לשנה</span>
            </div>
            <p className="text-brand-grey-text mt-2">לשנת לימודים מלאה למוסד</p>
          </div>

          <ul className="space-y-3 mb-8">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0 mt-0.5" />
                <span className="text-brand-text">{item}</span>
              </li>
            ))}
          </ul>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-black/20 text-brand-turquoise focus:ring-brand-turquoise"
            />
            <span className="text-sm text-brand-grey-text">
              קראתי ואני מסכים/ה ל
              <a
                href="/pilot-terms.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-turquoise font-semibold underline hover:no-underline"
              >
                תנאי הפיילוט המורחב
              </a>
            </span>
          </label>

          <button
            type="button"
            disabled={!agreed}
            onClick={() => {
              window.location.href = MAILTO_HREF;
            }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition ${
              agreed
                ? 'bg-brand-turquoise text-white hover:opacity-90 shadow-lg'
                : 'bg-brand-grey-light text-brand-grey-text cursor-not-allowed'
            }`}
          >
            הצטרפות לפיילוט
          </button>
        </div>
      </div>
    </section>
  );
}
