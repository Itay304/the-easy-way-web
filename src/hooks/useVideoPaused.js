import { useEffect, useState } from 'react';
import useAutoplayAllowed from './useAutoplayAllowed.js';

// מצב עצירה של סרטון: ברירת המחדל לפי useAutoplayAllowed (בלי ניגון אוטומטי עם "הפחתת תנועה" או
// "חיסכון בנתונים"), והמשתמש יכול להחליט אחרת בכפתור. כשההגדרה משתנה (למשל "עצירת אנימציות" בתפריט
// הנגישות) — חוזרים לברירת המחדל החדשה.
export default function useVideoPaused() {
  const allowed = useAutoplayAllowed();
  const [choice, setChoice] = useState(null);
  useEffect(() => setChoice(null), [allowed]);
  const paused = choice ?? !allowed;
  return [paused, () => setChoice(!paused)];
}
