import { useEffect, useRef, useState } from 'react';

// רקע הפתיחה, מקצה לקצה: לופ של 13 שניות מלוח הבקרה האמיתי (גלילה למפת החום, קדימה ואחורה),
// עם טשטוש קל "אפוי" בקובץ (ffmpeg) — בלי filter:blur ב-CSS. תמונת הפתיחה (poster) נטענת מראש ומוצגת
// קודם; הווידאו נטען רק אחרי אירוע load + זמן פנוי, ורק כשלא עצור (paused מגיע מ-useVideoPaused:
// עצור מראש עם "הפחתת תנועה" או "חיסכון בנתונים").
// שכבת ink כיוונית: כהה מאחורי הטקסט (ימין ב-RTL / למעלה במובייל), בהירה בצד הטלפון.
// ניגודיות לבן נמדדה על הפריים הבהיר ביותר, כולל מצב hover (ראו הדוח).
// כל השטח לחיץ ופותח את הסרטון המלא — אבל aria-hidden ולא בפוקוס: הפקד הנגיש הוא הכפתור
// "ראו את Easylex בפעולה (1:30)".
const POSTER = '/media/hero-bg-v2-poster.webp';

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

export default function HeroBackground({ paused, hover, onHover, onOpen }) {
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (paused || load) return undefined;
    return whenIdleAfterLoad(() => setLoad(true));
  }, [paused, load]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [load, paused]);

  return (
    <div
      aria-hidden="true"
      onClick={onOpen}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="absolute inset-0 cursor-pointer"
    >
      <div className={`absolute inset-0 transition-[filter] duration-300 ${hover ? 'brightness-110' : ''}`}>
        <img src={POSTER} alt="" width="1280" height="720" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        {load && (
          <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" poster={POSTER} muted loop playsInline autoPlay={!paused}>
            <source src="/media/hero-bg-v2.webm" type="video/webm" />
            <source src="/media/hero-bg-v2.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-ink/[0.82] via-ink/[0.7] via-55% to-ink/25 lg:bg-gradient-to-l lg:from-ink/[0.86] lg:via-ink/[0.76] lg:via-50% lg:to-ink/15" />
    </div>
  );
}
