import { useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

// האם מותר לנגן וידאו אוטומטית: אין "הפחתת תנועה" (מערכת / תפריט הנגישות) ואין "חיסכון בנתונים".
// saveData נבדק אחרי הטעינה (false ב-HTML שרונדר מראש, כדי שה-hydration יתאים).
export default function useAutoplayAllowed() {
  const reduced = usePrefersReducedMotion();
  const [saveData, setSaveData] = useState(false);
  useEffect(() => setSaveData(!!navigator.connection?.saveData), []);
  return !reduced && !saveData;
}
