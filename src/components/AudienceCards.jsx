import { GraduationCap, Presentation, Building2 } from 'lucide-react';

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: 'תלמיד',
    text: 'תרגל את המילים שהמורה קבע, עקוב אחרי ההתקדמות שלך.',
  },
  {
    icon: Presentation,
    title: 'מורה',
    text: 'עקוב אחרי כל תלמיד, שלח משימות, ראה מי מתקדם.',
  },
  {
    icon: Building2,
    title: 'בית ספר',
    text: 'פלטפורמה מלאה לכל הכיתות, מבוססת על באנדים של משרד החינוך.',
  },
];

export default function AudienceCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-brand-text mb-10">למי זה מיועד</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {AUDIENCES.map((a) => (
          <div
            key={a.title}
            className="rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition p-8 text-center"
          >
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center">
              <a.icon size={28} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-brand-text mb-2">{a.title}</h3>
            <p className="text-brand-grey-text">{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
