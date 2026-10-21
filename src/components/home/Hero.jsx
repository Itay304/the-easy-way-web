import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { PhoneFrame } from '../ui/DeviceFrames.jsx';
import LazyVideo from '../ui/LazyVideo.jsx';

// 1 — פתיחה. הכותרת (h1) היא טקסט אמיתי כדי שתצויר מיד (LCP); תמונת הפתיחה של הקליפ נטענת
// מראש ב-index.html. הקליפ: תרגול אמיתי בטלפון (מוסד ההדגמה), שקט ובלופ.
export default function Hero({ onWatch }) {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-gradient-to-b from-mist to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="text-center lg:text-right">
          <h1 id="hero-title" className="text-display font-extrabold tracking-tight text-ink text-balance">
            לא משננים. מנצחים.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lead text-ink/80 text-pretty lg:mx-0">
            <bdi>Easylex</bdi> — תרגול אוצר מילים באנגלית שתלמידים באמת רוצים לעשות, והמורה רואה בו הכול.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button as="a" href="#contact">
              תאמו הדגמה
            </Button>
            <Button type="button" variant="secondary" onClick={onWatch}>
              <Play size={20} aria-hidden="true" className="fill-current" />
              צפו בסרטון (1:30)
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <PhoneFrame className="w-[min(72vw,300px)] lg:w-[320px]">
            <LazyVideo
              eager
              name="practice-v1"
              poster="/media/practice-v1-poster.webp"
              label="תלמיד מתרגל ב-Easylex בטלפון: כרטיסיות, מבחן, טעות וניסיון חוזר, ומסך סיכום"
            />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
