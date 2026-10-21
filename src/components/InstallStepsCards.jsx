import { Smartphone } from 'lucide-react';
import Card from './ui/Card.jsx';

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
    <Card padding="p-8" className="text-right">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-mist text-cover flex items-center justify-center shrink-0">
          <Smartphone size={20} strokeWidth={2} />
        </div>
        <h3 className="text-h3 font-bold text-ink">{title}</h3>
      </div>
      {warning && <p className="text-caption font-semibold text-ink mb-4">{warning}</p>}
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex-shrink-0 h-7 w-7 rounded-full bg-mist text-ink font-bold text-caption flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-ink/80 pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </Card>
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
