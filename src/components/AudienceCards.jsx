const AUDIENCES = [
  {
    icon: '🎓',
    title: 'תלמיד',
    text: 'תרגל את המילים שהמורה קבע, עקוב אחרי ההתקדמות שלך.',
  },
  {
    icon: '🧑‍🏫',
    title: 'מורה',
    text: 'עקוב אחרי כל תלמיד, שלח משימות, ראה מי מתקדם.',
  },
  {
    icon: '🏫',
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
            <div className="text-4xl mb-4">{a.icon}</div>
            <h3 className="text-xl font-bold text-brand-text mb-2">{a.title}</h3>
            <p className="text-brand-grey-text">{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
