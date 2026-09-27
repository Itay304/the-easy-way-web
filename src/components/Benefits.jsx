import { BookOpen, TrendingUp, Smartphone, Settings } from 'lucide-react';

const BENEFITS = [
  { icon: BookOpen, text: 'מבוסס על באנדים של משרד החינוך' },
  { icon: TrendingUp, text: 'מעקב התקדמות בזמן אמת' },
  { icon: Smartphone, text: 'עובד בכל מכשיר' },
  { icon: Settings, text: 'ניתן להתאמה לכל כיתה' },
];

export default function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-brand-text mb-10">יתרונות</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((b) => (
          <div
            key={b.text}
            className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 text-center"
          >
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center">
              <b.icon size={24} strokeWidth={2} />
            </div>
            <p className="text-brand-text font-medium">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
