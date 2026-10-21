import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { BOOKS, BOOKS_META } from '../content/books.js';

// עמוד הספרים (/books). מרונדר מראש ל-dist/books.html (scripts/prerender.mjs), כולל title/description/og
// ו-JSON-LD של ItemList. כל הטקסטים הוגהו — להעתיק בדיוק. בלי מחיר בשום מקום.

// הצצה לספר — טקסט אמיתי. ** מסמן את המילה המודגשת (לא מוצג).
const SAMPLE = [
  {
    en: 'absence (n): His **absence** from school worried the teacher.',
    he: '**היעדרותו** מבית הספר הדאיגה את המורה.',
  },
  {
    en: 'absolute (adj): She has **absolute** confidence in her plan.',
    he: 'יש לה ביטחון **מוחלט** בתוכנית שלה.',
  },
  {
    en: 'acceptable (adj): This behavior is not **acceptable** in class.',
    he: 'ההתנהגות הזאת לא **מקובלת** בכיתה.',
  },
];

const bold = (s) => s.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));

function Cover({ id, name, className = '' }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/media/books/${id}-240.avif 240w, /media/books/${id}-480.avif 480w, /media/books/${id}-720.avif 720w`} sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 120px" />
      <source type="image/webp" srcSet={`/media/books/${id}-240.webp 240w, /media/books/${id}-480.webp 480w, /media/books/${id}-720.webp 720w`} sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 120px" />
      <img
        src={`/media/books/${id}-480.webp`}
        width="480"
        height="640"
        loading="lazy"
        decoding="async"
        alt={`כריכת הספר ${name}`}
        className={`aspect-[3/4] w-full rounded-xl object-cover object-center ${className}`}
      />
    </picture>
  );
}

// שם הסדרה ברווחים לא-שבירים — לא נשבר באמצע במצב רגיל
const SERIES = 'The Easy Way';

// "PRE-Band I · The Easy Way"
function BookName({ name }) {
  const [title] = name.split(' · ');
  return (
    <bdi lang="en">
      {title} · {SERIES}
    </bdi>
  );
}

function BookCard({ book, step }) {
  return (
    <li
      className="book-card relative flex gap-4 overflow-hidden rounded-2xl border border-ink/10 bg-white p-4 shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg lg:flex-col lg:p-5"
      style={{ borderTop: `4px solid ${book.accent}` }}
    >
      <div className="w-28 shrink-0 sm:w-36 lg:w-full">
        <Cover id={book.id} name={book.name} />
      </div>
      {/* min-w-0: עמודת הטקסט יכולה להצטמצם (אחרת בהגדלת טקסט היא דוחפת את הכרטיס מעבר למסך) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-full text-body font-extrabold text-white"
          style={{ backgroundColor: book.accent }}
          aria-hidden="true"
        >
          {step}
        </span>
        <h3 className="text-h3 font-extrabold text-ink break-words">
          <span className="sr-only">שלב {step}: </span>
          <BookName name={book.name} />
        </h3>
        <p className="mt-2 flex-1 text-ink/85">{book.line}</p>
        <p className="mt-3 text-caption font-semibold text-ink/80">ספר מודפס · {book.pages} עמודים</p>
        <Button
          as="a"
          href={book.url}
          target="_blank"
          rel="noopener"
          size="sm"
          variant="dark"
          className="mt-4 self-start"
          // השם הנגיש מתחיל בטקסט הגלוי (WCAG 2.5.3), ואחריו שם הספר וההודעה על חלון חדש
          aria-label={`לרכישה ב-bookpod: ${book.name} (נפתח בחלון חדש)`}
        >
          לרכישה ב-bookpod
          <ExternalLink size={16} aria-hidden="true" />
          <span className="sr-only">(נפתח בחלון חדש)</span>
        </Button>
      </div>
    </li>
  );
}

export default function Books() {
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute('content');
    document.title = BOOKS_META.title;
    desc?.setAttribute('content', BOOKS_META.description);
    return () => {
      document.title = prevTitle;
      if (prevDesc) desc?.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <>
      {/* 1 — פתיחה */}
      <section aria-labelledby="books-title" className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h1 id="books-title" className="text-display font-extrabold tracking-tight text-ink text-balance break-words">
            {/* "The Easy Way" ברווחים לא-שבירים (לא נשבר באמצע), והמקף צמוד למילה שלפניו. break-words: בהגדלת טקסט
                קיצונית השם יישבר במקום לדחוף את הדף הצידה */}
            ספרי <bdi lang="en">{SERIES}</bdi>{' '}— הדרך שלך לבגרות באנגלית
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-ink/85 text-pretty">
            ארבעה ספרים, מהבסיס ועד 5 יחידות. כל מילה מהרשימות של משרד החינוך — במשפט אמיתי, עם תרגום מלא לעברית.
          </p>
        </div>
      </section>

      {/* 2 — המדף: התקדמות 1→4 (שלבים במחשב, רשימה במובייל) */}
      <section aria-labelledby="shelf-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          {/* כותרת לקוראי מסך בלבד — שומרת על סדר הכותרות (h1 → h2 → h3 בכרטיסים) */}
          <h2 id="shelf-title" className="sr-only">
            ארבעת הספרים לפי הסדר
          </h2>
          <ol className="grid gap-5 lg:grid-cols-4 lg:gap-6">
            {BOOKS.map((b, i) => (
              <BookCard key={b.id} book={b} step={i + 1} />
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — איך בנוי כל ספר + הצצה */}
      <section aria-labelledby="structure-title" className="bg-mist">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal className="text-center">
            <h2 id="structure-title" className="text-section font-extrabold text-ink text-balance">
              איך בנוי כל ספר
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lead text-ink/85 text-pretty">
              כל מילה מהרשימה של משרד החינוך — במשפט אמיתי, עם תרגום מלא לעברית. ככה לומדים לא רק מה המילה אומרת, אלא איך
              משתמשים בה.
            </p>
          </Reveal>
          <div className="mt-10 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm sm:p-8">
            <h3 className="text-h3 font-extrabold text-ink">הצצה לספר</h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {SAMPLE.map((s) => (
                <li key={s.en} className="py-4">
                  <p lang="en" dir="ltr" className="text-left text-body-lg text-ink">
                    {bold(s.en)}
                  </p>
                  <p className="mt-1 text-body-lg text-ink/85">{bold(s.he)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — חיבור לאפליקציה */}
      <section aria-labelledby="books-app-title" className="bg-white">
        <Reveal className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 id="books-app-title" className="text-section font-extrabold text-ink text-balance">
            לומדים מהספר — ומתרגלים ב-<bdi>Easylex</bdi>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lead text-ink/85 text-pretty">
            רשימות ה-Band של משרד החינוך נמצאות גם באפליקציה: תרגול קצר, משחקי, עם מעקב של המורה.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/#contact">
              תאמו הדגמה
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
