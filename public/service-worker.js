// v4: עיצוב מחדש של האתר (קליפים, גופן מקומי) — מנקה את ה-cache הקודם
const CACHE_NAME = 'the-easy-way-v4';
const APP_SHELL = ['/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // וידאו (/media/*.mp4|webm) ובקשות טווח (Range → 206) — ישירות מהרשת. Cache API לא שומר תשובות
  // חלקיות, והדפדפן מנהל את הטעינה ההדרגתית של הסרטון בעצמו.
  const url = new URL(event.request.url);
  if (event.request.headers.has('range') || /\.(mp4|webm)$/.test(url.pathname)) return;

  // בקשות ניווט (טעינת index.html) — network-first: תמיד לנסות רשת קודם.
  // קאש-first על ה-HTML היה תוקע את ה-PWA המותקן על גרסה ישנה של האתר
  // לצמיתות (הבאג שדווח: header/footer ישנים במסך /app/*). נופלים
  // לקאש רק כשאין רשת בכלל.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // שאר הבקשות (JS/CSS/תמונות עם hash בשם הקובץ) — cache-first בטוח,
  // כי כל build מייצר שם קובץ חדש; אין סיכון להישאר תקוע על גרסה ישנה.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
