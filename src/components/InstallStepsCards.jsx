import { Smartphone } from 'lucide-react';

const ANDROID_STEPS = [
  'פתח את האתר בכרום',
  'לחץ על 3 הנקודות (⋮) בפינה הימנית העליונה',
  'בחר "הוסף למסך הבית"',
  'לחץ "הוסף" — האפליקציה מותקנת!',
];

const IOS_STEPS = [
  'פתח את האתר בספארי (לא כרום!)',
  'לחץ על כפתור השיתוף (□↑) בתחתית המסך',
  'גלול מטה ← בחר "הוסף למסך הבית"',
  'לחץ "הוסף" — האפליקציה מותקנת!',
];

function DeviceGuide({ title, warning, steps }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-8 text-right">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center shrink-0">
          <Smartphone size={20} strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold text-brand-text">{title}</h3>
      </div>
      {warning && <p className="text-sm font-semibold text-brand-turquoise mb-4">{warning}</p>}
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-turquoise/10 text-brand-turquoise font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-brand-grey-text pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function InstallStepsCards({ className = '' }) {
  return (
    <div className={`grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto ${className}`}>
      <DeviceGuide title="אנדרואיד (Chrome)" steps={ANDROID_STEPS} />
      <DeviceGuide title="אייפון" warning="Safari בלבד!" steps={IOS_STEPS} />
    </div>
  );
}
