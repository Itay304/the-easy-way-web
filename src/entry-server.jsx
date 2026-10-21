// oxlint-disable react/only-export-components -- כניסת SSR ל-build בלבד, לא קובץ רכיבים (אין כאן Fast Refresh)
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import MarketingLayout from './components/MarketingLayout.jsx';

// רינדור מוקדם של עמודים ל-HTML בזמן ה-build (scripts/prerender.mjs) — התוכן מצויר מיד, לפני שה-JS רץ,
// ו-main.jsx "מחייה" אותו (hydrateRoot). חלקים ב-lazy מגיעים כ-placeholder.
export function render(url = '/') {
  return renderToString(
    <StaticRouter location={url}>
      <MarketingLayout />
    </StaticRouter>,
  );
}

export { BOOKS_META, booksJsonLd } from './content/books.js';
