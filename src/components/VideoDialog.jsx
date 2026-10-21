import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// הסרטון המלא (1:30, 720p, עם מוזיקה) — נטען רק כשפותחים את החלון. <dialog> מטפל במלכודת הפוקוס
// וב-Esc; כשסוגרים, הסרטון נעצר והפוקוס חוזר לכפתור שפתח אותו.
export default function VideoDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open) videoRef.current?.pause();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-label="סרטון Easylex"
      className="m-auto w-[min(92vw,1100px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80"
    >
      <div className="relative rounded-2xl bg-ink p-2 sm:p-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="סגירה"
          className="absolute -top-14 left-0 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink hover:bg-mist"
        >
          <X size={22} aria-hidden="true" />
        </button>
        {open && (
          <video
            ref={videoRef}
            className="block aspect-video w-full rounded-xl bg-black"
            src="/media/promo-he-v1.mp4"
            poster="/media/promo-he-v1-poster.webp"
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
    </dialog>
  );
}
