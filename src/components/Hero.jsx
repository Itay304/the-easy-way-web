import useIsNarrow from '../hooks/useIsNarrow.js';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';
import Button from './ui/Button.jsx';

export default function Hero() {
  const isNarrow = useIsNarrow();
  const teacherLabel = isNarrow ? 'אני מורה — התקן אפליקציה' : 'אני מורה — התחל עכשיו';
  const studentLabel = isNarrow ? 'אני תלמיד — התקן אפליקציה' : 'כניסת תלמיד';

  return (
    <section className="bg-gradient-to-b from-brand-turquoise/10 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 text-center">
        <img
          src="/icons/icon-192.png"
          alt="The Easy Way — לוגו"
          className="mx-auto h-20 w-20 rounded-2xl shadow-md mb-6"
        />
        <h1 className="text-h1 sm:text-5xl font-extrabold text-brand-text leading-tight">
          The Easy Way
        </h1>
        <p className="mt-4 text-body-lg sm:text-h3 text-brand-grey-text max-w-2xl mx-auto">
          לימוד אוצר מילים באנגלית — בדרך הנכונה
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button as="a" href={TEACHER_APP_URL} className="w-full sm:w-auto shadow-lg">
            {teacherLabel}
          </Button>
          <Button as="a" href={STUDENT_APP_URL} variant="secondary" className="w-full sm:w-auto">
            {studentLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
