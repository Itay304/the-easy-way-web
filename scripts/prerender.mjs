// אחרי `vite build` ו-`vite build --ssr`: מרנדר את דף הבית ל-HTML ומכניס אותו ל-dist/index.html
// בתוך <div id="root">. main.jsx עושה hydrateRoot כשהדף הוא "/" (בשאר הנתיבים — createRoot רגיל).
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const file = resolve('dist/index.html');
const html = readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
writeFileSync(file, html.replace(marker, `<div id="root">${render('/')}</div>`));
console.log('prerender: dist/index.html — home page rendered into #root');
