import { useEffect, useRef, useState } from 'react';

// true מהרגע שהאלמנט נכנס למסך (once) — או, עם once=false, כל עוד הוא במסך.
// rootMargin חיובי = "כמעט במסך" (לטעינה מוקדמת של וידאו).
export default function useInView({ once = true, rootMargin = '0px', threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
