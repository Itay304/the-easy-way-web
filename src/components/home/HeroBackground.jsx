import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

// רקע הפתיחה: לופ של 13 שניות מלוח הבקרה האמיתי (גלילה למפת החום, קדימה ואחורה), עם טשטוש והכהיה
// "אפויים" בקובץ (ffmpeg) — בלי filter:blur ב-CSS. תמונת הפתיחה (poster) נטענת מראש ומוצגת קודם;
// הווידאו נטען רק אחרי אירוע load + זמן פנוי, וגם זה רק אם אין "הפחתת תנועה" או חיסכון בנתונים.
// מעליו — שכבת ink (82%→72%): לבן על הפריים הבהיר ביותר בלופ ≥ 6.9:1 (נמדד).
const POSTER = '/media/hero-bg-v1-poster.webp';

function whenIdleAfterLoad(cb) {
  let cancelled = false;
  let idleId;
  const run = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(cb, { timeout: 2000 });
    else idleId = window.setTimeout(cb, 300);
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener('load', run);
    if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    window.clearTimeout(idleId);
  };
}

export default function HeroBackground({ paused }) {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (reduced || navigator.connection?.saveData) return undefined;
    return whenIdleAfterLoad(() => setLoad(true));
  }, [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    if (paused || reduced) v.pause();
    else v.play().catch(() => {});
  }, [load, paused, reduced]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <img src={POSTER} alt="" width="1280" height="720" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {load && (
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" poster={POSTER} muted loop playsInline autoPlay={!paused}>
          <source src="/media/hero-bg-v1.webm" type="video/webm" />
          <source src="/media/hero-bg-v1.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-ink/[0.82] to-ink/[0.72]" />
    </div>
  );
}

