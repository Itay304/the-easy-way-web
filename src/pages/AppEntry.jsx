import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { setManifest, isStandalone } from '../pwaInstall.js';
import InstallStepsCards from '../components/InstallStepsCards.jsx';

const ROLE_COPY = {
  student: {
    manifest: '/manifest-student.json',
    title: 'אפליקציית התלמיד',
    description: 'תרגלו את המילים שהמורה קבע ועקבו אחרי ההתקדמות שלכם — ישירות מהטלפון.',
  },
  teacher: {
    manifest: '/manifest-teacher.json',
    title: 'אפליקציית המורה',
    description: 'עקבו אחרי כל תלמיד, שלחו משימות וראו מי מתקדם — ישירות מהטלפון.',
  },
};

export default function AppEntry() {
  const { role } = useParams();
  const copy = ROLE_COPY[role] ?? ROLE_COPY.student;

  useEffect(() => {
    setManifest(copy.manifest);
  }, [copy.manifest]);

  if (!isStandalone()) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
        <img src="/icons/icon-192.png" alt="" className="h-16 w-16 rounded-2xl shadow-md mb-4" />
        <h1 className="text-2xl font-bold text-brand-text mb-2">{copy.title}</h1>
        <p className="text-brand-grey-text max-w-sm mx-auto mb-10">{copy.description}</p>
        <InstallStepsCards />
      </section>
    );
  }

  return <LoginSignupForm />;
}

function LoginSignupForm() {
  const [user, setUser] = useState(undefined);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch {
      setError(mode === 'login' ? 'אימייל או סיסמה שגויים.' : 'שגיאה בהרשמה. נסו שוב.');
    } finally {
      setSubmitting(false);
    }
  }

  if (user === undefined) {
    return (
      <section className="min-h-screen flex items-center justify-center text-brand-grey-text">
        טוען...
      </section>
    );
  }

  if (user) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-brand-text mb-8">
          ברוך הבא, {user.displayName || user.email}!
        </h1>
        <button
          onClick={() => signOut(auth)}
          className="text-sm text-brand-grey-text hover:text-brand-text underline"
        >
          התנתק
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <img src="/icons/icon-192.png" alt="" className="h-16 w-16 rounded-2xl shadow-md mb-6" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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
          {submitting ? '...' : mode === 'login' ? 'התחבר' : 'הירשם'}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="w-full text-sm text-brand-grey-text hover:text-brand-text underline"
        >
          {mode === 'login' ? 'אין לך חשבון? הירשם' : 'כבר יש לך חשבון? התחבר'}
        </button>
      </form>
    </section>
  );
}
