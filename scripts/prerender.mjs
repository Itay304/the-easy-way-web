// אחרי `vite build` ו-`vite build --ssr`: מרנדר עמודים ל-HTML ומכניס אותם ל-<div id="root">.
//   /       → dist/index.html
//   /books  → dist/books.html (Firebase cleanUrls מגיש אותו ב-/books), עם title/description/og/canonical
//             ו-JSON-LD משלו (ItemList של ספרים, בלי מחיר).
// <html data-prerendered="..."> מסמן לאיזה נתיב שייך ה-HTML המוכן — main.jsx עושה hydrateRoot רק כשהנתיב תואם.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render, BOOKS_META, booksJsonLd } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const template = readFileSync(resolve('dist/index.html'), 'utf8');
const ROOT = '<div id="root"></div>';
if (!template.includes(ROOT)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function replaceOnce(html, re, value, what) {
  if (!re.test(html)) throw new Error(`prerender: ${what} not found`);
  return html.replace(re, value);
}

function page(path, transformHead = (h) => h) {
  let html = transformHead(template);
  html = html.replace('<html lang="he" dir="rtl">', `<html lang="he" dir="rtl" data-prerendered="${path}">`);
  return html.replace(ROOT, `<div id="root">${render(path)}</div>`);
}

writeFileSync(resolve('dist/index.html'), page('/'));

writeFileSync(
  resolve('dist/books.html'),
  page('/books', (h) => {
    const m = BOOKS_META;
    h = replaceOnce(h, /<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`, 'title');
    h = replaceOnce(h, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(m.description)}$2`, 'description');
    h = replaceOnce(h, /(<link rel="canonical" href=")[^"]*(")/, `$1${m.url}$2`, 'canonical');
    h = replaceOnce(h, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(m.title)}$2`, 'og:title');
    h = replaceOnce(h, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(m.description)}$2`, 'og:description');
    h = replaceOnce(h, /(<meta property="og:url" content=")[^"]*(")/, `$1${m.url}$2`, 'og:url');
    h = replaceOnce(h, /(<meta property="og:image" content=")[^"]*(")/, `$1${m.image}$2`, 'og:image');
    h = replaceOnce(h, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${m.image}$2`, 'twitter:image');
    h = h.replace(/\s*<meta property="og:image:width"[^>]*>\s*<meta property="og:image:height"[^>]*>/, '');
    // ה-JSON-LD של האפליקציה מוחלף ב-ItemList של הספרים
    h = replaceOnce(
      h,
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(booksJsonLd())}</script>`,
      'JSON-LD',
    );
    // preload של תמונות הפתיחה בדף הבית לא רלוונטי כאן
    return h.replace(/\s*<link rel="preload" href="\/media\/[^"]*" as="image"[^>]*>/g, '');
  }),
);
console.log('prerender: dist/index.html (/) + dist/books.html (/books)');
