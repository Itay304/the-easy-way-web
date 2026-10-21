import { lazy, Suspense, useState } from 'react';
import Hero from '../components/home/Hero.jsx';

// סיפור בגלילה, רעיון אחד בכל קטע: פתיחה → תלמידים → מורה → טלפון/מחשב → מנהלים → יצירת קשר,
// ובסוף שאלה נפתחת על ההתקנה. רק הפתיחה בחבילה הראשית; השאר (וחלון הסרטון) נטענים מיד אחריה.
const BelowFold = lazy(() => import('../components/home/BelowFold.jsx'));
const VideoDialog = lazy(() => import('../components/VideoDialog.jsx'));

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = () => setVideoOpen(true);

  return (
    <>
      <Hero onWatch={openVideo} />
      {/* placeholder בגובה מסך וחצי עד שהחבילה מגיעה — כדי שהכותרת התחתונה לא תקפוץ בתוך המסך (CLS) */}
      <Suspense fallback={<div className="min-h-[150vh]" aria-hidden="true" />}>
        <BelowFold onWatch={openVideo} />
      </Suspense>
      {videoOpen && (
        <Suspense fallback={null}>
          <VideoDialog open onClose={() => setVideoOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
