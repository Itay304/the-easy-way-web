import { useState } from 'react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { PhoneFrame } from '../ui/DeviceFrames.jsx';
import LazyVideo, { PauseButton } from '../ui/LazyVideo.jsx';
import useVideoPaused from '../../hooks/useVideoPaused.js';
import HeroBackground from './HeroBackground.jsx';

// 1 — פתיחה, מקצה לקצה מתחת לכותרת: לופ רקע מלוח הבקרה, הטקסט בצד הכהה (ימין), הטלפון עם קליפ
// התרגול בצד הבהיר. כפתורים: "תאמו הדגמה" + "ראו את Easylex בפעולה (1:30)" (פותח את הסרטון המלא).
// השטח הפנוי לחיץ ופותח גם הוא את הסרטון: אייקון ▶ עגול מופיע ב-hover (במחשב) או קבוע ועדין (במובייל).
// כפתור עצירה אחד לכל התנועה בפתיחה (רקע + טלפון) — WCAG 2.2.2 — בפינה הימנית-תחתונה,
// רחוק מכפתור תפריט הנגישות (שמאל-למטה).
const TEXT_SHADOW = '[text-shadow:0_2px_14px_rgba(10,46,58,0.55)]';

export default function Hero({ onWatch }) {
  const [paused, togglePaused] = useVideoPaused();
  const [hover, setHover] = useState(false);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      <HeroBackground paused={paused} hover={hover} onHover={setHover} onOpen={onWatch} />

      {/* pointer-events-none: לחיצה על שטח פנוי עוברת לרקע; הטקסט, הכפתורים והטלפון מקבלים לחיצות כרגיל */}
      <div className="pointer-events-none relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-9 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="pointer-events-auto text-center lg:text-right">
          <h1 id="hero-title" className={`text-display font-extrabold tracking-tight text-white text-balance ${TEXT_SHADOW}`}>
            לא משננים. מנצחים.
          </h1>
          <p className={`mx-auto mt-5 max-w-xl text-lead text-white text-pretty lg:mx-0 ${TEXT_SHADOW}`}>
            <bdi>Easylex</bdi> — תרגול אוצר מילים באנגלית שתלמידים באמת רוצים לעשות, והמורה רואה בו הכול.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button as="a" href="#contact">
              תאמו הדגמה
            </Button>
            <Button type="button" variant="secondary" onClick={onWatch}>
              <Play size={20} aria-hidden="true" className="fill-current" />
              {/* תווית אחת ב-span — אחרת כל חלק טקסט הופך לפריט flex נפרד (רווח כפול ושבירה מוזרה) */}
              <span>
                ראו את <bdi>Easylex</bdi> בפעולה (1:30)
              </span>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <PhoneFrame className="pointer-events-auto w-[min(62vw,300px)] ring-1 ring-white/15 lg:w-[320px]">
            <LazyVideo
              eager
              paused={paused}
              name="practice-v1"
              poster="/media/practice-v1-poster.webp"
              label="תלמיד מתרגל ב-Easylex בטלפון: כרטיסיות, מבחן, טעות וניסיון חוזר, ומסך סיכום"
            />
          </PhoneFrame>
          {/* אייקון ▶ בשטח הפנוי בין הטלפון לטקסט (מרכזו 3rem מימין לשפת הטלפון; 29px במובייל). aria-hidden ולא בפוקוס — הכפתור למעלה הוא הפקד הנגיש */}
          <div
            aria-hidden="true"
            onClick={onWatch}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`pointer-events-auto absolute top-1/2 left-[calc(50%+min(31vw,150px)+29px)] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/25 ring-1 ring-white/60 transition-opacity duration-300 lg:left-[calc(50%+160px+3rem)] lg:h-[72px] lg:w-[72px] ${
              hover ? 'opacity-100' : 'opacity-70 [@media(hover:hover)]:opacity-0'
            }`}
          >
            <Play size={28} className="translate-x-[-2px] fill-white text-white" />
          </div>
        </div>
      </div>

      <PauseButton paused={paused} onToggle={togglePaused} what="הסרטונים" tone="glass" className="absolute bottom-4 right-4" />
    </section>
  );
}
