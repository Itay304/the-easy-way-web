import { isIOS } from '../pwaInstall.js';

const ANDROID_STEPS = [
  'ודא שאתה בכרום',
  'לחץ על 3 הנקודות (⋮) בפינה הימנית העליונה',
  'בחר "הוסף למסך הבית"',
  'לחץ "הוסף" — האפליקציה מותקנת!',
];

const IOS_STEPS = [
  'ודא שאתה בספארי (לא כרום!)',
  'לחץ על כפתור השיתוף (□↑) בתחתית המסך',
  'גלול מטה ← בחר "הוסף למסך הבית"',
  'לחץ "הוסף" — האפליקציה מותקנת!',
];

export default function InstallInstructions() {
  const steps = isIOS() ? IOS_STEPS : ANDROID_STEPS;

  return (
    <section className="mx-auto max-w-md px-4 sm:px-6 py-16">
      <h1 className="text-xl font-bold text-brand-text text-center mb-6">
        עוד צעד אחד קטן — התקנת האפליקציה
      </h1>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-green/10 text-brand-green font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-brand-grey-text pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
