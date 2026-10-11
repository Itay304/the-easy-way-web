import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import useIsNarrow from '../hooks/useIsNarrow.js';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';
import Button from './ui/Button.jsx';

export default function Header() {
  const isNarrow = useIsNarrow();
  const teacherLabel = isNarrow ? 'אני מורה — התקן את EasyLex' : 'אני מורה — התחל עכשיו';
  const studentLabel = isNarrow ? 'אני תלמיד — התקן את EasyLex' : 'כניסת תלמיד';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      {/* מתחת ל-768px (isNarrow, אותו סף בדיוק כמו useIsNarrow.js): לוגו
      בשורה אחת + שורת כפתורים נפרדת מתחתיו, כדי שאף אחד מהם לא יידחס/יישבר.
      מ-md ומעלה — שורה אחת כמו קודם. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 md:h-16 md:py-0 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        <Link to="/" className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <img src="/icons/icon-192.png" alt="EasyLex" className="h-8 w-8 md:h-9 md:w-9 rounded-lg shrink-0" />
          <span className="text-body md:text-body-lg font-bold text-brand-text whitespace-nowrap">EasyLex</span>
        </Link>
        {/* סדר: מנהל / מורה / תלמיד — המנהל הוא מי שמחליט אם לרכוש. */}
        <nav className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center md:justify-end">
          {!isNarrow && (
            // TODO: כרגע מפנה לאותו teacher.theeasywayapp.co.il — המנהל נכנס
            // עם החשבון שלו ורואה ממשק מנהל בתוך אותה אפליקציה. בעתיד יהיה
            // דף/כתובת נפרדים למנהל; לעת עתה זה מספיק כי ההפרדה היא ב-role,
            // לא ב-URL.
            <Button as="a" href={TEACHER_APP_URL} variant="ghost" size="sm" className="whitespace-nowrap">
              <Building2 size={16} />
              כניסת מנהל
            </Button>
          )}
          <Button
            as="a"
            href={TEACHER_APP_URL}
            variant="ghost"
            size="sm"
            className="flex-1 md:flex-none !text-brand-turquoise-dark hover:!bg-brand-turquoise/10 md:whitespace-nowrap"
          >
            {teacherLabel}
          </Button>
          <Button
            as="a"
            href={STUDENT_APP_URL}
            size="sm"
            className="flex-1 md:flex-none md:whitespace-nowrap"
          >
            {studentLabel}
          </Button>
        </nav>
      </div>
    </header>
  );
}
