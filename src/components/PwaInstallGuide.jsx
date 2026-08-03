import InstallStepsCards from './InstallStepsCards.jsx';

export default function PwaInstallGuide() {
  return (
    <section className="bg-brand-grey-light py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-brand-text mb-2">
          התקן את האפליקציה בחינם
        </h2>
        <p className="text-center text-brand-grey-text mb-10">
          ללא הורדה מחנות אפליקציות — ישירות מהדפדפן
        </p>
        <InstallStepsCards />
      </div>
    </section>
  );
}
