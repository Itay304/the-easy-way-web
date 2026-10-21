import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-24 pt-10 sm:px-6 md:flex-row md:justify-between md:pb-10">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" aria-hidden="true" width="32" height="32" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-white">
            <bdi>Easylex by The Easy Way</bdi>
          </span>
        </div>
        <nav aria-label="קישורים בתחתית העמוד">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <li>
              <Link to="/books" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline-offset-4 hover:underline">
                הספרים
              </Link>
            </li>
            <li>
              <Link to="/terms" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline-offset-4 hover:underline">
                תקנון
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline-offset-4 hover:underline">
                מדיניות פרטיות
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline-offset-4 hover:underline">
                הצהרת נגישות
              </Link>
            </li>
            <li>
              <a href="/#contact" className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white underline-offset-4 hover:underline">
                צור קשר
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-caption text-center">
          © {new Date().getFullYear()} The Easy Way — לימוד אוצר מילים באנגלית לבתי ספר
        </p>
      </div>
    </footer>
  );
}
