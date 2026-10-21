import { useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView.js';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

// קליפ שקט בלופ מתוך האפליקציה האמיתית. נטען רק כשהוא מתקרב למסך (preload="none" עד אז),
// מתנגן רק כשהוא נראה, ונעצר כשיוצאים ממנו. עם prefers-reduced-motion — לא מתנגן לבד:
// רואים את תמונת הפתיחה (poster) ואפשר להפעיל ידנית עם הפקדים.
export default function LazyVideo({ name, poster, label, className = '', eager = false }) {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [nearRef, near] = useInView({ rootMargin: '300px' });
  const [visibleRef, visible] = useInView({ once: false, threshold: 0.3 });
  const load = eager || near;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load || reduced) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [load, visible, reduced]);

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
    </div>
  );
}
