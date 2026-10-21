import { useEffect, useState, useSyncExternalStore } from 'react';
import { getPrefs, getServerPrefs, subscribe } from '../lib/a11yPrefs.js';

const QUERY = '(prefers-reduced-motion: reduce)';

// true כשאסור לנגן אוטומטית: הגדרת "הפחתת תנועה" של המערכת, או "עצירת אנימציות וסרטונים"
// בתפריט הנגישות. מתחיל ב-false מצד ההגדרה של המערכת (כמו ב-HTML שרונדר מראש, כדי שה-hydration יתאים).
export default function usePrefersReducedMotion() {
  const [osReduced, setOsReduced] = useState(false);
  const { stopMotion } = useSyncExternalStore(subscribe, getPrefs, getServerPrefs);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setOsReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return osReduced || stopMotion;
}
