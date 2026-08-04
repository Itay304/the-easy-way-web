import useIsNarrow from '../hooks/useIsNarrow.js';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';

export default function Hero() {
  const isNarrow = useIsNarrow();
  const teacherLabel = isNarrow ? 'אני מורה — התקן אפליקציה' : 'אני מורה — התחל עכשיו';
  const studentLabel = isNarrow ? 'אני תלמיד — התקן אפליקציה' : 'כניסת תלמיד';

  return (
    <section className="bg-gradient-to-b from-brand-green/10 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 text-center">
        <img
          src="/icons/icon-192.png"
          alt="The Easy Way — לוגו"
          className="mx-auto h-20 w-20 rounded-2xl shadow-md mb-6"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text leading-tight">
          The Easy Way
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-brand-grey-text max-w-2xl mx-auto">
          לימוד אוצר מילים באנגלית — בדרך הנכונה
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={TEACHER_APP_URL}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-green text-white font-bold text-lg shadow-lg hover:bg-brand-green-dark transition"
          >
            {teacherLabel}
          </a>
          <a
            href={STUDENT_APP_URL}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border-2 border-brand-turquoise text-brand-turquoise font-bold text-lg hover:bg-brand-turquoise/10 transition"
          >
            {studentLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
