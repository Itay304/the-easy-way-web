// ספרי The Easy Way — נתונים לעמוד /books ול-JSON-LD שלו (scripts/prerender.mjs). בלי מחיר בשום מקום.
// accent = צבע הכריכה (פס דק בכרטיס ומספר השלב; לבן עליהם ≥ 4.5:1).
export const BOOKS = [
  {
    id: 'pre-band-1',
    name: 'PRE-Band I · The Easy Way',
    line: 'לפני התיכון: כל המילים הבסיסיות. נקודת פתיחה מצוינת לכל הרמות.',
    pages: 64,
    url: 'https://bookpod.co.il/book/pre-band-i:-the-easy-way-24719',
    accent: '#9b1c1c',
  },
  {
    id: 'band-1',
    name: 'Band I · The Easy Way',
    line: 'הבסיס לכל רמות הבגרות.',
    pages: 218,
    url: 'https://bookpod.co.il/book/band-i:-the-easy-way-24718',
    accent: '#1f1f1f',
  },
  {
    id: 'band-2',
    name: 'Band II · The Easy Way',
    line: "אוצר המילים שתלמידים צריכים לשלוט בו עד סוף כיתה ט' — הבסיס לתיכון, וחובה למי שמכוון ל-4 ו-5 יחידות.",
    pages: 224,
    url: 'https://bookpod.co.il/book/band-ii:-the-easy-way-1726',
    accent: '#2f4a2e',
  },
  {
    id: 'band-3',
    name: 'Band III · The Easy Way',
    line: 'אוצר המילים של 5 יחידות — נדרש בבחינת הבגרות (מודול E).',
    pages: 218,
    url: 'https://bookpod.co.il/book/band-iii:-the-easy-way-388',
    accent: '#10284f',
  },
];

export const BOOKS_META = {
  title: 'ספרי The Easy Way — הדרך שלך לבגרות באנגלית | Easylex',
  description:
    'ארבעה ספרי אוצר מילים באנגלית, מ-PRE-Band I ועד Band III (5 יחידות). כל מילה מרשימות משרד החינוך — במשפט אמיתי, עם תרגום מלא לעברית.',
  url: 'https://theeasywayapp.co.il/books',
  image: 'https://theeasywayapp.co.il/media/books/band-2-720.webp',
};

// schema.org ItemList של ספרים — בלי offers (אין מחיר באתר)
export function booksJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ספרי The Easy Way',
    itemListElement: BOOKS.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Book',
        name: b.name,
        bookFormat: 'https://schema.org/Paperback',
        numberOfPages: b.pages,
        publisher: { '@type': 'Organization', name: 'Silver Quill Editions' },
        inLanguage: ['en', 'he'],
        url: b.url,
        image: `https://theeasywayapp.co.il/media/books/${b.id}-720.webp`,
      },
    })),
  };
}
