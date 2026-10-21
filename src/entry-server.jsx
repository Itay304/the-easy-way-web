import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import MarketingLayout from './components/MarketingLayout.jsx';

// רינדור מוקדם של דף הבית ל-HTML בזמן ה-build (scripts/prerender.mjs) — הפתיחה מצוירת מיד,
// לפני שה-JS רץ, ו-main.jsx "מחייה" אותה (hydrateRoot). מה שמתחת לפתיחה (lazy) מגיע כ-placeholder.
export function render(url = '/') {
  return renderToString(
    <StaticRouter location={url}>
      <MarketingLayout />
    </StaticRouter>,
  );
}
