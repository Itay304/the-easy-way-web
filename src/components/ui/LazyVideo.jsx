import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import useInView from '../../hooks/useInView.js';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

// כפתור עצירה/הפעלה לסרטון שמתנגן לבד (חובה לפי WCAG 2.2.2 — תנועה אוטומטית ארוכה מ-5 שניות)
// tone: dark — על תמונה בהירה; glass — על רקע כהה (פתיחה)
export function PauseButton({ paused, onToggle, className = '', what = 'הסרטון', tone = 'dark' }) {
  const label = paused ? `הפעלת ${what}` : `עצירת ${what}`;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md ${tone === 'glass' ? 'bg-white/15 ring-1 ring-white/50 hover:bg-white/25' : 'bg-ink/85 hover:bg-ink'} ${className}`}
    >
      {paused ? <Play size={18} aria-hidden="true" className="fill-current" /> : <Pause size={18} aria-hidden="true" className="fill-current" />}
    </button>
  );
}

// קליפ שקט בלופ מתוך האפליקציה האמיתית. נטען רק כשהוא מתקרב למסך (preload="none" עד אז),
// מתנגן רק כשהוא נראה, ונעצר כשיוצאים ממנו. בלי ניגון אוטומטי עם "הפחתת תנועה" (מערכת או תפריט הנגישות):
// רואים את תמונת הפתיחה ואפשר להפעיל ידנית עם הפקדים.
// paused — עצירה מבחוץ (כפתור משותף); pauseButton — כפתור עצירה משלו בפינת הקליפ.
export default function LazyVideo({ name, poster, label, className = '', eager = false, paused = false, pauseButton = false }) {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [ownPaused, setOwnPaused] = useState(false);
  const [nearRef, near] = useInView({ rootMargin: '300px' });
  const [visibleRef, visible] = useInView({ once: false, threshold: 0.3 });
  const load = eager || near;
  const stopped = paused || ownPaused;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load || reduced) return;
    if (visible && !stopped) v.play().catch(() => {});
    else v.pause();
  }, [load, visible, reduced, stopped]);

  return (
    <div ref={nearRef} className={`absolute inset-0 ${className}`}>
      <div ref={visibleRef} className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-top"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={reduced}
          aria-label={label}
        >
          {load && <source src={`/media/${name}.webm`} type="video/webm" />}
          {load && <source src={`/media/${name}.mp4`} type="video/mp4" />}
        </video>
      </div>
      {pauseButton && !reduced && (
        <PauseButton paused={ownPaused} onToggle={() => setOwnPaused((p) => !p)} className="absolute bottom-3 left-3" />
      )}
    </div>
  );
}
