import { useEffect } from 'react';

// הצהרת נגישות. פרטי רכז הנגישות והתאריך — לעדכן כאן כשמשתנים (זה העמוד היחיד באתר עם טלפון ואימייל).
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
            האתר נבנה במטרה לעמוד בדרישות תקן ישראלי 5568 ברמה AA ובהנחיות WCAG 2.1 ברמה AA. בין היתר:
          </p>
          <ul className="mt-3 list-disc space-y-1 pr-6">
            <li>ניווט מלא במקלדת, עם סימון פוקוס גלוי.</li>
            <li>ניגודיות צבעים של 4.5:1 לפחות בטקסט רגיל.</li>
            <li>טקסט חלופי בעברית לתמונות ולסרטונים.</li>
            <li>מבנה כותרות היררכי ותמיכה מלאה בעברית ובכיוון מימין לשמאל.</li>
            <li>כיבוד הגדרת "הפחתת תנועה" ו"חיסכון בנתונים" של המכשיר — בלי אנימציות ובלי ניגון אוטומטי.</li>
            <li>כפתור עצירה לכל סרטון שמתנגן לבד.</li>
            <li>התאמה למסכים בכל גודל, מטלפון ועד מחשב.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">תפריט הנגישות</h2>
          <p className="mt-2">
            בכל עמוד יש כפתור נגישות קבוע בפינה השמאלית התחתונה. התפריט מאפשר הגדלת טקסט בשלוש דרגות, ניגודיות
            גבוהה, הדגשת קישורים, גופן קריא, עצירת אנימציות וסרטונים, ואיפוס ההגדרות. ההגדרות נשמרות בדפדפן שלכם
            לביקור הבא. התפריט שלנו, ללא תוסף או סקריפט חיצוני, ונגיש במקלדת ובקורא מסך.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">רכיבים שאולי אינם נגישים במלואם</h2>
          <p className="mt-2">
            הסרטונים באתר מציגים את האפליקציה ללא קריינות; כל המסר מופיע בהם כטקסט על המסך, אך אין להם כתוביות
            נפרדות. בסרטון המלא יש מוזיקה ללא דיבור. סרטון הרקע בראש העמוד הוא קישוטי בלבד. אם נתקלתם ברכיב שאינו
            נגיש — נשמח שתעדכנו אותנו.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-bold text-ink">פנייה בנושא נגישות</h2>
          <p className="mt-2">רכז נגישות: איתי וייס</p>
          <p>
            טלפון:{' '}
            <a href="tel:+972583237307" dir="ltr" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4 hover:text-cover">
              058-323-7307
            </a>
          </p>
          <p>
            אימייל:{' '}
            <a href="mailto:silverquilleducation@gmail.com" dir="ltr" className="inline-flex min-h-11 max-w-full items-center [overflow-wrap:anywhere] font-semibold text-ink underline underline-offset-4 hover:text-cover">
              silverquilleducation@gmail.com
            </a>
          </p>
          <p className="mt-2">זמן מענה: עד 14 ימים</p>
        </section>

        <p className="text-body text-ink/80">תאריך עדכון ההצהרה: 21.10.2026</p>
      </div>
    </article>
  );
}
