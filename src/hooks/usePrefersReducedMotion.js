import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// מתחיל ב-false (כמו ב-HTML שרונדר מראש, כדי שה-hydration יתאים) ומתעדכן מיד אחרי הטעינה.
// אנימציות ה-CSS מכבדות את ההגדרה בעצמן (@media ב-index.css), כך שאין רגע של תנועה.
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
