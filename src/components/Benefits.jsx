const BENEFITS = [
  { icon: '📚', text: 'מבוסס על באנדים של משרד החינוך' },
  { icon: '📈', text: 'מעקב התקדמות בזמן אמת' },
  { icon: '📱', text: 'עובד בכל מכשיר' },
  { icon: '⚙️', text: 'ניתן להתאמה לכל כיתה' },
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
            <div className="text-3xl mb-3">{b.icon}</div>
            <p className="text-brand-text font-medium">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
