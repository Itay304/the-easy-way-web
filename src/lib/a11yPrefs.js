// הגדרות תפריט הנגישות: נשמרות ב-localStorage (בתוך try/catch) ומוחלות כ-classes על <html>.
// סקריפט קטן ב-index.html מחיל אותן עוד לפני הציור הראשון (בלי הבהוב) — לשמור את שניהם מסונכרנים.
export const A11Y_KEY = 'easylex-a11y';

// גודל טקסט: 0 = רגיל, 1–3 = הגדלה (font-size של <html>; כל הטקסט באתר ב-rem)
export const TEXT_STEPS = ['100%', '112.5%', '125%', '140%'];

export const DEFAULT_PREFS = Object.freeze({
  textStep: 0,
  contrast: false,
  links: false,
  readable: false,
  stopMotion: false,
});

const CLASS_FOR = {
  contrast: 'a11y-contrast',
  links: 'a11y-links',
  readable: 'a11y-readable',
  stopMotion: 'a11y-stop-motion',
};

function read() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(A11Y_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...DEFAULT_PREFS, ...saved } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

let prefs = typeof window === 'undefined' ? DEFAULT_PREFS : read();
const listeners = new Set();

function apply(p) {
  const html = document.documentElement;
  for (const [key, cls] of Object.entries(CLASS_FOR)) html.classList.toggle(cls, !!p[key]);
  html.style.fontSize = p.textStep ? TEXT_STEPS[p.textStep] : '';
}

export function getPrefs() {
  return prefs;
}

export function getServerPrefs() {
  return DEFAULT_PREFS;
}

export function setPrefs(patch) {
  prefs = patch === null ? DEFAULT_PREFS : { ...prefs, ...patch };
  apply(prefs);
  try {
    if (patch === null) window.localStorage.removeItem(A11Y_KEY);
    else window.localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage חסום (גלישה פרטית וכו') — ההגדרות פשוט לא יישמרו לפעם הבאה
  }
  listeners.forEach((l) => l());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
