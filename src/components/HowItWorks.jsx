const STEPS = [
  'מורה יוצר כיתה ומקבל קוד',
  'תלמידים מצטרפים עם הקוד',
  'מורה שולח משימות',
  'תלמידים מתרגלים ומתקדמים',
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-grey-light py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-brand-text mb-10">איך זה עובד</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step} className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-brand-green text-white font-bold text-xl flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-brand-text font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
