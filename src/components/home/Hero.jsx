import { useState } from 'react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { PhoneFrame } from '../ui/DeviceFrames.jsx';
import LazyVideo, { PauseButton } from '../ui/LazyVideo.jsx';
import HeroBackground from './HeroBackground.jsx';
import useAutoplayAllowed from '../../hooks/useAutoplayAllowed.js';

// 1 — פתיחה: כרטיס כהה (ink) עם לופ רקע מטושטש מלוח הבקרה, ולצידו הטלפון עם קליפ התרגול.
// הכותרת (h1) טקסט אמיתי. כפתורים: "תאמו הדגמה" + "ראו את Easylex בפעולה (1:30)" (פותח את הסרטון המלא).
// כפתור עצירה אחד עוצר את כל התנועה בפתיחה (רקע + טלפון) — WCAG 2.2.2. בפינה הימנית-תחתונה,
// רחוק מכפתור תפריט הנגישות (שמאל-למטה).
// הכרטיס מוקף שוליים בצבע הכותרת (mist) שדועכים ללבן — כך המעבר מהכותרת הבהירה לפתיחה הכהה מכוון.
export default function Hero({ onWatch }) {
  const [paused, setPaused] = useState(false);
  const plays = useAutoplayAllowed();

  return (
    <div className="bg-gradient-to-b from-mist to-white px-2 pb-2 pt-2 sm:px-4 sm:pt-4">
      <section aria-labelledby="hero-title" className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[1.75rem] bg-ink sm:rounded-[2.25rem]">
        <HeroBackground paused={paused} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-9 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
          <div className="text-center lg:text-right">
            <h1 id="hero-title" className="text-display font-extrabold tracking-tight text-white text-balance">
              לא משננים. מנצחים.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lead text-white/90 text-pretty lg:mx-0">
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
          <div className="flex justify-center">
            <PhoneFrame className="w-[min(72vw,300px)] ring-1 ring-white/15 lg:w-[320px]">
              <LazyVideo
                eager
                paused={paused}
                name="practice-v1"
                poster="/media/practice-v1-poster.webp"
                label="תלמיד מתרגל ב-Easylex בטלפון: כרטיסיות, מבחן, טעות וניסיון חוזר, ומסך סיכום"
              />
            </PhoneFrame>
          </div>
        </div>
        {plays && (
          <PauseButton
            paused={paused}
            onToggle={() => setPaused((p) => !p)}
            what="הסרטונים"
            tone="glass"
            className="absolute bottom-4 right-4"
          />
        )}
      </section>
    </div>
  );
}
