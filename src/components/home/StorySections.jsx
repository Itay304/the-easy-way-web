import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { LaptopFrame, PhoneFrame, ScreenImage } from '../ui/DeviceFrames.jsx';
import LazyVideo from '../ui/LazyVideo.jsx';
import Section from './Section.jsx';

// כל הטקסטים כאן הוגהו — להעתיק בדיוק. כל התמונות והקליפים מההקלטות האמיתיות (מוסד ההדגמה, בלי אימיילים).

const DemoButton = () => (
  <Button as="a" href="#contact">
    תאמו הדגמה
  </Button>
);

const WatchButton = ({ onWatch }) => (
  <Button type="button" variant="secondary" onClick={onWatch}>
    <Play size={20} aria-hidden="true" className="fill-current" />
    צפו בסרטון (1:30)
  </Button>
);

// 2 — תלמידים: רצף בתוך התרגול, ומסך הסיכום החגיגי
export function StudentsSection({ onWatch }) {
  return (
    <Section
      titleId="students-title"
      title="תלמידים חוזרים לתרגל — כי זה כיף."
      sub="סבבים קצרים, כל כמה שאלות — משחק אחר, ורצף ותגים שמחזירים אותם כל יום."
      cta={<WatchButton onWatch={onWatch} />}
      visual={
        <div className="flex items-end justify-center gap-4 pt-6 sm:gap-6">
          <PhoneFrame className="w-[min(40vw,230px)]">
            <ScreenImage
              src="/media/phone-combo-540.webp"
              srcSet="/media/phone-combo-270.webp 270w, /media/phone-combo-540.webp 540w"
              sizes="(min-width: 1024px) 230px, 40vw"
              width="540"
              height="1053"
              loading="lazy"
              alt="מסך תרגול באפליקציה: כרטיסייה עם המילה gold ומונה ״3 ברצף!״"
            />
          </PhoneFrame>
          <PhoneFrame className="w-[min(40vw,230px)] -translate-y-6">
            <ScreenImage
              src="/media/phone-summary-540.webp"
              srcSet="/media/phone-summary-270.webp 270w, /media/phone-summary-540.webp 540w"
              sizes="(min-width: 1024px) 230px, 40vw"
              width="540"
              height="1053"
              loading="lazy"
              alt="מסך הסיכום בסוף התרגול: ״כל הכבוד!״, 19 מתוך 20 תשובות נכונות ונקודות שהרוויח התלמיד"
            />
          </PhoneFrame>
        </div>
      }
    />
  );
}

// 3 — המורה: הדשבורד האמיתי (כרטיסי סיכום, גרף שבועי, תלמידים לא פעילים, מפת המילים הקשות)
export function TeacherSection() {
  return (
    <Section
      tone="mist"
      flip
      titleId="teacher-title"
      title="המורה רואה הכול — בלי לבדוק דף אחד."
      sub="מי תרגל, מי צריך עזרה, ובאילו מילים הכיתה מתקשה."
      cta={<DemoButton />}
      visual={
        <LaptopFrame className="w-full max-w-[560px]">
          <LazyVideo
            name="dashboard-v1"
            poster="/media/dashboard-v1-poster.webp"
            label="לוח הבקרה של המורה: פעילות שבועית, תלמידים לא פעילים ומפת חום של המילים הקשות בכיתה"
          />
        </LaptopFrame>
      }
    />
  );
}

// 4 — טלפון או מחשב: אותו תרגול בדפדפן במחשב, ולצידו הטלפון
export function DevicesSection({ onWatch }) {
  return (
    <Section
      titleId="devices-title"
      title="בטלפון או במחשב — מה שיש בכיתה."
      sub="אין טלפונים בבית הספר? מתרגלים ישר מהדפדפן במחשב."
      cta={<WatchButton onWatch={onWatch} />}
      visual={
        <div className="relative w-full max-w-[560px] pb-10">
          <LaptopFrame className="mr-auto w-[88%]">
            <ScreenImage
              src="/media/desktop-practice-1280.webp"
              srcSet="/media/desktop-practice-640.webp 640w, /media/desktop-practice-1280.webp 1280w"
              sizes="(min-width: 1024px) 480px, 80vw"
              width="1280"
              height="720"
              loading="lazy"
              alt="תרגול Easylex בדפדפן במחשב: כרטיסייה עם המילה ממשלה"
            />
          </LaptopFrame>
          <PhoneFrame className="absolute bottom-0 right-0 w-[30%]">
            <ScreenImage
              src="/media/phone-quiz-540.webp"
              srcSet="/media/phone-quiz-270.webp 270w, /media/phone-quiz-540.webp 540w"
              sizes="(min-width: 1024px) 160px, 27vw"
              width="540"
              height="1053"
              loading="lazy"
              alt="אותו תרגול בטלפון: שאלת מבחן על המילה grounds"
            />
          </PhoneFrame>
        </div>
      }
    />
  );
}

// 5 — למנהלים: רשימות ה-Band כפי שהן מופיעות באשף יצירת המשימה של המורה
export function PrincipalsSection() {
  return (
    <Section
      tone="mist"
      flip
      titleId="principals-title"
      title="למנהלים: תמונה מלאה של בית הספר, בלי עבודה נוספת."
      sub="מבוסס על רשימות ה-Band של משרד החינוך."
      cta={<DemoButton />}
      visual={
        <LaptopFrame className="w-full max-w-[560px]">
          <ScreenImage
            src="/media/band-lists-1200.webp"
            srcSet="/media/band-lists-600.webp 600w, /media/band-lists-1200.webp 1200w"
            sizes="(min-width: 1024px) 540px, 90vw"
            width="1200"
            height="674"
            loading="lazy"
            alt="אשף יצירת משימה אצל המורה: בחירת רשימת מילים מתוך רשימות ה-Band — Pre Band 1, Band 1, Band 2 ו-Band 3"
          />
        </LaptopFrame>
      }
    />
  );
}
