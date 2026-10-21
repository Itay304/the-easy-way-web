import { useEffect } from 'react';

// הצהרת נגישות בסיסית. השדות בסוגריים מרובעים [ ] — למילוי ע"י בעל האתר (איש קשר ותאריך).
// לא לטעון כאן לעמידה מלאה בתקן בלי בדיקה מקצועית.
export default function Accessibility() {
  useEffect(() => {
    document.title = 'הצהרת נגישות | Easylex';
    return () => {
      document.title = 'The Easy Way | לימוד אנגלית לבתי ספר';
    };
  }, []);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 text-ink">
      <h1 className="text-section font-extrabold">הצהרת נגישות</h1>

      <div className="mt-8 space-y-8 text-body-lg leading-relaxed text-ink/90">
        <section>
          <h2 className="text-h3 font-bold text-ink">המחויבות שלנו</h2>
          <p className="mt-2">
            אנחנו רואים חשיבות רבה במתן שירות שוויוני לכל המשתמשים, ופועלים כדי שאתר <bdi>Easylex</bdi> יהיה נגיש
            ונוח לשימוש גם לאנשים עם מוגבלות.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">רמת הנגישות באתר</h2>
          <p className="mt-2">
            האתר נבנה במטרה לעמוד בדרישות תקן ישראלי 5568 (המבוסס על הנחיות WCAG 2.0) ברמה AA. בין היתר:
          </p>
          <ul className="mt-3 list-disc space-y-1 pr-6">
            <li>ניווט מלא במקלדת, עם סימון פוקוס גלוי.</li>
            <li>ניגודיות צבעים של 4.5:1 לפחות בטקסט רגיל.</li>
            <li>טקסט חלופי בעברית לתמונות ולסרטונים.</li>
            <li>מבנה כותרות היררכי ותמיכה מלאה בעברית ובכיוון מימין לשמאל.</li>
            <li>כיבוד הגדרת "הפחתת תנועה" של מערכת ההפעלה — בלי אנימציות ובלי ניגון אוטומטי.</li>
            <li>התאמה למסכים בכל גודל, מטלפון ועד מחשב.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">רכיבים שאולי אינם נגישים במלואם</h2>
          <p className="mt-2">
            הסרטונים באתר מציגים את האפליקציה ללא קריינות; כל המסר מופיע בהם כטקסט על המסך, אך אין להם כתוביות
            נפרדות. אם נתקלתם ברכיב שאינו נגיש — נשמח שתעדכנו אותנו.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">פנייה בנושא נגישות</h2>
          <p className="mt-2">רכז/ת הנגישות: [שם מלא]</p>
          <p>טלפון: [מספר טלפון]</p>
          <p>אימייל: [כתובת אימייל]</p>
          <p className="mt-2">נשתדל לענות לכל פנייה בתוך [מספר] ימי עבודה.</p>
        </section>

        <p className="text-body text-ink/80">תאריך עדכון ההצהרה: [תאריך]</p>
      </div>
    </article>
  );
}
