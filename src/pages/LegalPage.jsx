import { useEffect } from 'react';

// שלד לעמודים המשפטיים (/terms, /privacy). הנוסח המלא יגיע מבעל האתר — עד אז מוצגת הודעה ברורה.
const PAGES = {
  terms: { title: 'תקנון ותנאי שימוש' },
  privacy: { title: 'מדיניות פרטיות' },
};

export default function LegalPage({ page }) {
  const { title } = PAGES[page];

  useEffect(() => {
    document.title = `${title} | Easylex`;
    return () => {
      document.title = 'The Easy Way | לימוד אנגלית לבתי ספר';
    };
  }, [title]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-ink sm:px-6 sm:py-16">
      <h1 className="text-section font-extrabold">{title}</h1>
      <p role="note" className="mt-8 rounded-2xl border-2 border-dashed border-ink/40 bg-mist p-6 text-body-lg font-bold">
        הנוסח המלא יעודכן בקרוב
      </p>
    </article>
  );
}
