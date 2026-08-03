import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { isStandalone } from '../pwaInstall.js';
import InstallInstructions from './InstallInstructions.jsx';

const MOBILE_BREAKPOINT = 768;
const INSTALL_FLOW_KEY = 'easyway_install_flow';

function useIsNarrow() {
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    function onResize() {
      setIsNarrow(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isNarrow;
}

export default function AuthPortal({ role, title, dashboardLabel, roleLabel }) {
  const isNarrow = useIsNarrow();
  const [cameFromInstallFlow] = useState(
    () => sessionStorage.getItem(INSTALL_FLOW_KEY) === role,
  );

  useEffect(() => {
    if (cameFromInstallFlow) sessionStorage.removeItem(INSTALL_FLOW_KEY);
  }, [cameFromInstallFlow]);

  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showDashboardNotice, setShowDashboardNotice] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('אימייל או סיסמה שגויים. נסו שוב.');
    } finally {
      setSubmitting(false);
    }
  }

  // דף זה חסום בגלישה רגילה במובייל (768px ומטה) — משתמשי מובייל מופנים
  // להתקנת ה-PWA מה-Hero במקום. חריגים: אפליקציה מותקנת שכבר רצה במצב
  // standalone (start_url מוביל לכאן ישירות), או ניווט שהגיע מכפתור
  // ההתקנה עצמו (cameFromInstallFlow) — לצורך "הוסף למסך הבית" ב-iOS.
  if (isNarrow && !isStandalone() && !cameFromInstallFlow) {
    return <Navigate to="/" replace />;
  }

  if (isNarrow && cameFromInstallFlow) {
    return <InstallInstructions />;
  }

  if (user === undefined) {
    return (
      <section className="mx-auto max-w-md px-4 sm:px-6 py-24 text-center text-brand-grey-text">
        טוען...
      </section>
    );
  }

  if (user) {
    const displayName = user.displayName || user.email;
    return (
      <section className="mx-auto max-w-md px-4 sm:px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-brand-text mb-2">ברוך הבא, {displayName}!</h1>
        <p className="text-brand-grey-text mb-8">{roleLabel}</p>

        <button
          onClick={() => setShowDashboardNotice(true)}
          className="w-full py-4 rounded-xl bg-brand-green text-white font-bold text-lg hover:bg-brand-green-dark transition"
        >
          {dashboardLabel}
        </button>

        {showDashboardNotice && (
          <p className="mt-4 text-sm text-brand-turquoise font-medium">
            בקרוב! ממשק זה נמצא בבנייה ויושק בשלב הבא.
          </p>
        )}

        <button
          onClick={() => signOut(auth)}
          className="mt-6 text-sm text-brand-grey-text hover:text-brand-text underline"
        >
          התנתק
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-4 sm:px-6 py-24">
      <h1 className="text-2xl font-bold text-brand-text text-center mb-8">{title}</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="אימייל"
          className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמה"
          className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-brand-green text-white font-bold text-lg hover:bg-brand-green-dark transition disabled:opacity-60"
        >
          {submitting ? 'מתחבר...' : 'התחבר'}
        </button>
      </form>
    </section>
  );
}
