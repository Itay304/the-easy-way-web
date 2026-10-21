import useIsNarrow from '../hooks/useIsNarrow.js';
import { TEACHER_APP_URL, STUDENT_APP_URL } from '../lib/appLinks.js';
import Button from './ui/Button.jsx';

export default function Hero() {
  const isNarrow = useIsNarrow();
  const teacherLabel = isNarrow ? 'אני מורה — התקן את Easylex' : 'אני מורה — התחל עכשיו';
  const studentLabel = isNarrow ? 'אני תלמיד — התקן את Easylex' : 'כניסת תלמיד';

  return (
    <section className="bg-gradient-to-b from-brand-turquoise/10 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1>
          <img src="/logo.svg" alt="Easylex" className="mx-auto w-60 sm:w-80 h-auto" />
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
