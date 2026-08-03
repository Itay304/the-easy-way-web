import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export default function useIsNarrow() {
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    function onResize() {
      setIsNarrow(window.innerWidth < MOBILE_BREAKPOINT);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isNarrow;
}
