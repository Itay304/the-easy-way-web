import { Link } from 'react-router-dom';
import useIsNarrow from '../hooks/useIsNarrow.js';

export default function Header() {
  const isNarrow = useIsNarrow();
  const teacherTo = isNarrow ? '/app/teacher' : '/teacher';
  const studentTo = isNarrow ? '/app/student' : '/student';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/icons/icon-192.png" alt="The Easy Way" className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold text-brand-text">The Easy Way</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            to={teacherTo}
            className="px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold text-brand-green hover:bg-brand-green/10 transition"
          >
            אני מורה
          </Link>
          <Link
            to={studentTo}
            className="px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold text-white bg-brand-turquoise hover:opacity-90 transition"
          >
            אני תלמיד
          </Link>
        </nav>
      </div>
    </header>
  );
}
