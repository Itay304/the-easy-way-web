import { useRef, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, CaseSensitive, Contrast, Link2, Type, PauseCircle, RotateCcw, X, FileText } from 'lucide-react';
import { getPrefs, getServerPrefs, setPrefs, subscribe, TEXT_STEPS } from '../lib/a11yPrefs.js';

// תפריט נגישות שלנו — בלי סקריפט חיצוני. כפתור קבוע בפינה השמאלית-תחתונה (ב-RTL), 52px.
// החלון הוא <dialog> מודאלי: הדפדפן לוכד את הפוקוס בתוכו, Esc סוגר, והפוקוס חוזר לכפתור.
const TEXT_LABELS = ['רגיל', 'גדול', 'גדול יותר', 'גדול מאוד'];

function Toggle({ icon: Icon, label, pressed, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex min-h-12 w-full items-center gap-3 rounded-xl border-2 px-3 text-right font-semibold ${
        pressed ? 'border-ink bg-ink text-white' : 'border-ink/20 bg-white text-ink hover:border-ink'
      }`}
    >
      <Icon size={20} aria-hidden="true" className="shrink-0" />
      <span className="flex-1">{label}</span>
      <span className="text-caption font-bold">{pressed ? 'פעיל' : 'כבוי'}</span>
    </button>
  );
}

export default function A11yMenu() {
  const dialogRef = useRef(null);
  const prefs = useSyncExternalStore(subscribe, getPrefs, getServerPrefs);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="תפריט נגישות"
        aria-haspopup="dialog"
        className="fixed bottom-4 left-4 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-ink text-white shadow-[0_8px_24px_-8px_rgba(10,46,58,0.7)] ring-2 ring-white hover:bg-cover"
      >
        <Accessibility size={28} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="a11y-menu-title"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="fixed inset-auto bottom-20 left-4 m-0 w-[min(calc(100vw-2rem),22rem)] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/40"
      >
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="a11y-menu-title" className="text-h3 font-extrabold">
              תפריט נגישות
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="סגירת תפריט הנגישות"
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-mist"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <fieldset className="mb-3">
            <legend className="mb-2 flex items-center gap-2 font-bold">
              <Type size={20} aria-hidden="true" />
              הגדלת טקסט
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {TEXT_STEPS.map((_, i) => (
                <button
                  key={TEXT_LABELS[i]}
                  type="button"
                  aria-pressed={prefs.textStep === i}
                  onClick={() => setPrefs({ textStep: i })}
                  className={`min-h-11 rounded-xl border-2 px-2 font-semibold ${
                    prefs.textStep === i ? 'border-ink bg-ink text-white' : 'border-ink/20 bg-white text-ink hover:border-ink'
                  }`}
                >
                  {TEXT_LABELS[i]}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Toggle icon={Contrast} label="ניגודיות גבוהה" pressed={prefs.contrast} onClick={() => setPrefs({ contrast: !prefs.contrast })} />
            <Toggle icon={Link2} label="הדגשת קישורים" pressed={prefs.links} onClick={() => setPrefs({ links: !prefs.links })} />
            <Toggle icon={CaseSensitive} label="גופן קריא" pressed={prefs.readable} onClick={() => setPrefs({ readable: !prefs.readable })} />
            <Toggle
              icon={PauseCircle}
              label="עצירת אנימציות וסרטונים"
              pressed={prefs.stopMotion}
              onClick={() => setPrefs({ stopMotion: !prefs.stopMotion })}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-4">
            <button
              type="button"
              onClick={() => setPrefs(null)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-ink font-bold text-ink hover:bg-mist"
            >
              <RotateCcw size={18} aria-hidden="true" />
              איפוס הגדרות
            </button>
            <Link
              to="/accessibility"
              onClick={close}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold text-ink underline underline-offset-4 hover:bg-mist"
            >
              <FileText size={18} aria-hidden="true" />
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
