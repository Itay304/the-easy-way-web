import Reveal from '../ui/Reveal.jsx';

// מבנה אחיד לקטעי הסיפור: טקסט (כותרת + שורת משנה + כפתור) ותמונה. במובייל זה מתחת לזה —
// קודם הטקסט; מ-lg זה לצד זה (ב-RTL הטקסט מימין), ו-flip הופך את הצד לגיוון.
export default function Section({ title, sub, cta, visual, flip = false, tone = 'white', titleId }) {
  const bg = tone === 'mist' ? 'bg-mist' : 'bg-white';
  return (
    <section aria-labelledby={titleId} className={`${bg} overflow-hidden`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal className={`text-center lg:text-right ${flip ? 'lg:order-2' : ''}`}>
          <h2 id={titleId} className="text-section font-extrabold text-ink text-balance">
            {/* רווח לא-שביר לפני המקף — שהמקף לא ייפתח שורה חדשה בגלישה */}
            {title.replace(' — ', ' — ')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink/80 text-pretty lg:mx-0">{sub}</p>
          {cta && <div className="mt-8 flex justify-center lg:justify-start">{cta}</div>}
        </Reveal>
        <Reveal delay={120} className="flex justify-center">
          {visual}
        </Reveal>
      </div>
    </section>
  );
}
