import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import useIsNarrow from '../hooks/useIsNarrow.js';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';

export default function Header() {
  const isNarrow = useIsNarrow();
  const teacherLabel = isNarrow ? 'אני מורה — התקן אפליקציה' : 'אני מורה — התחל עכשיו';
  const studentLabel = isNarrow ? 'אני תלמיד — התקן אפליקציה' : 'כניסת תלמיד';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/icons/icon-192.png" alt="The Easy Way" className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold text-brand-text">The Easy Way</span>
        </Link>
        {/* סדר: מנהל / מורה / תלמיד — המנהל הוא מי שמחליט אם לרכוש. */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {!isNarrow && (
            // TODO: כרגע מפנה לאותו teacher.theeasywayapp.co.il — המנהל נכנס
            // עם החשבון שלו ורואה ממשק מנהל בתוך אותה אפליקציה. בעתיד יהיה
            // דף/כתובת נפרדים למנהל; לעת עתה זה מספיק כי ההפרדה היא ב-role,
            // לא ב-URL.
            <a
              href={TEACHER_APP_URL}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold text-brand-text hover:bg-black/5 transition"
            >
              <Building2 size={16} />
              כניסת מנהל
            </a>
          )}
          <a
            href={TEACHER_APP_URL}
            className="px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold text-brand-green hover:bg-brand-green/10 transition"
          >
            {teacherLabel}
          </a>
          <a
            href={STUDENT_APP_URL}
            className="px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold text-white bg-brand-turquoise hover:opacity-90 transition"
          >
            {studentLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
