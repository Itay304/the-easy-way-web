import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Building2, Presentation, GraduationCap, BookOpen } from 'lucide-react';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';
import Button from './ui/Button.jsx';

// כניסה לאפליקציות. סדר: מנהל / מורה / תלמיד — המנהל הוא מי שמחליט אם לרכוש.
// TODO: המנהל מופנה כרגע לאותו teacher.theeasywayapp.co.il — ההפרדה היא ב-role, לא ב-URL.
const ENTRIES = [
  { href: TEACHER_APP_URL, label: 'כניסת מנהל', icon: Building2 },
  { href: TEACHER_APP_URL, label: 'אני מורה — התחל עכשיו', icon: Presentation },
  { href: STUDENT_APP_URL, label: 'כניסת תלמיד', icon: GraduationCap },
];

// כותרת דביקה בשורה אחת (56px במובייל). רקע mist — ולכן theme-color ב-index.html הוא #E1F3EF,
// כדי שסרגל הדפדפן בטלפון יתמזג איתה. במובייל הכניסות בתפריט "כניסה"; מ-md הן בשורה.
export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onClick(e) {
      if (!menuRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-mist">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-16">
        <Link to="/" className="flex min-h-11 items-center shrink-0" aria-label="Easylex — דף הבית">
          <img src="/logo-horizontal.svg" alt="Easylex" width="128" height="32" className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="ניווט ראשי" className="hidden items-center gap-2 md:flex">
          <Button as={Link} to="/books" size="sm" variant="ghost">
            הספרים
          </Button>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/15" />
          {ENTRIES.map((e, i) => (
            <Button key={e.label} as="a" href={e.href} size="sm" variant={i === ENTRIES.length - 1 ? 'dark' : 'ghost'}>
              {e.label}
            </Button>
          ))}
        </nav>

        <div className="relative md:hidden">
          <Button
            ref={buttonRef}
            type="button"
            size="sm"
            variant="dark"
            aria-expanded={open}
            aria-controls="entry-menu"
            onClick={() => setOpen((o) => !o)}
          >
            כניסה
            <ChevronDown size={18} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </Button>
          {open && (
            <div
              id="entry-menu"
              ref={menuRef}
              className="absolute left-0 top-[calc(100%+0.5rem)] w-64 rounded-2xl border border-ink/10 bg-white p-2 shadow-xl"
            >
              <ul>
                <li className="mb-1 border-b border-ink/10 pb-1">
                  <Link
                    to="/books"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold text-ink hover:bg-mist"
                  >
                    <BookOpen size={20} aria-hidden="true" className="shrink-0 text-cover" />
                    הספרים
                  </Link>
                </li>
                {ENTRIES.map((e) => (
                  <li key={e.label}>
                    <a
                      href={e.href}
                      className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold text-ink hover:bg-mist"
                    >
                      <e.icon size={20} aria-hidden="true" className="shrink-0 text-cover" />
                      {e.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
