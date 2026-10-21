import { ChevronDown } from 'lucide-react';
import InstallStepsCards from './InstallStepsCards.jsx';

// שאלה נפתחת בתחתית העמוד — הוראות ההתקנה (Android / iPhone) שהיו קטע שלם בעבר.
export default function InstallFaq() {
  return (
    <section aria-label="שאלות נפוצות" className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <details className="group rounded-2xl border border-ink/15 bg-white">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 text-body-lg font-bold text-ink hover:bg-mist [&::-webkit-details-marker]:hidden">
            איך מתקינים?
            <ChevronDown size={22} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-6 pt-2 sm:px-6">
            <p className="mb-6 text-center text-ink/80">ללא הורדה מחנות אפליקציות — ישירות מהדפדפן</p>
            <InstallStepsCards />
          </div>
        </details>
      </div>
    </section>
  );
}
