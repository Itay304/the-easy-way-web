import { useEffect } from 'react';
import privacyText from '../content/privacy.md?raw';
import termsText from '../content/terms.md?raw';

// העמודים המשפטיים (/privacy, /terms). הנוסח ב-src/content/*.md (מתוך Brand/legal-texts.md) —
// לעדכן שם, כולל "עדכון אחרון". כאן רק מציגים: כותרות ##, פסקאות, רשימות (- / 1.) עם רשימה פנימית,
// **הדגשה**, ואימייל/טלפון כקישורים. בלי HTML גולמי.
const PAGES = {
  privacy: { title: 'מדיניות פרטיות', text: privacyText },
  terms: { title: 'תקנון ותנאי שימוש', text: termsText },
};

const LINK = 'font-semibold text-ink underline underline-offset-4 [overflow-wrap:anywhere]';
// דומיין בלי נקודה בסוף — כדי שנקודת סוף משפט ("...gmail.com. נענה") לא תיכנס לקישור
const INLINE = /(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|0\d{2}-\d{3}-\d{4})/g;

function inline(text) {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^[\w.+-]+@/.test(part)) return <a key={i} href={`mailto:${part}`} dir="ltr" className={LINK}>{part}</a>;
    if (/^0\d{2}-/.test(part)) return <a key={i} href={`tel:+972${part.slice(1).replace(/-/g, '')}`} dir="ltr" className={LINK}>{part}</a>;
    return part;
  });
}

// שורות → בלוקים: { h2 } | { p } | { list: ordered?, items: [{ text, children: [blocks] }] }
function parse(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let list = null;
  for (const raw of lines) {
    if (!raw.trim()) continue;
    const indented = /^ {2,}/.test(raw);
    const line = raw.trim();
    const bullet = line.match(/^(-|\d+\.)\s+(.*)$/);
    if (indented && list) {
      const item = list.items[list.items.length - 1];
      if (bullet) {
        const last = item.children[item.children.length - 1];
        if (last?.list) last.items.push({ text: bullet[2], children: [] });
        else item.children.push({ list: true, ordered: bullet[1] !== '-', items: [{ text: bullet[2], children: [] }] });
      } else item.children.push({ p: line });
      continue;
    }
    if (line.startsWith('## ')) {
      list = null;
      blocks.push({ h2: line.slice(3) });
    } else if (bullet) {
      const ordered = bullet[1] !== '-';
      if (!list || list.ordered !== ordered) {
        list = { list: true, ordered, items: [] };
        blocks.push(list);
      }
      list.items.push({ text: bullet[2], children: [] });
    } else {
      list = null;
      blocks.push({ p: line });
    }
  }
  return blocks;
}

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.h2) return <h2 key={i} className="mt-10 text-h3 font-bold text-ink">{b.h2}</h2>;
    if (b.p) return <p key={i} className="mt-3">{inline(b.p)}</p>;
    const L = b.ordered ? 'ol' : 'ul';
    return (
      <L key={i} className={`mt-3 space-y-2 pr-6 ${b.ordered ? 'list-decimal' : 'list-disc'}`}>
        {b.items.map((it, j) => (
          <li key={j}>
            {inline(it.text)}
            {it.children.length > 0 && <Blocks blocks={it.children} />}
          </li>
        ))}
      </L>
    );
  });
}

export default function LegalPage({ page }) {
  const { title, text } = PAGES[page];

  useEffect(() => {
    document.title = `${title} | Easylex`;
    return () => {
      document.title = 'The Easy Way | לימוד אנגלית לבתי ספר';
    };
  }, [title]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-ink sm:px-6 sm:py-16">
      <h1 className="text-section font-extrabold">{title}</h1>
      <div className="mt-6 text-body-lg leading-relaxed text-ink/90">
        <Blocks blocks={parse(text)} />
      </div>
    </article>
  );
}
