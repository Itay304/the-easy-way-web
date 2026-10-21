import Hero from '../components/Hero.jsx';
import AudienceCards from '../components/AudienceCards.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Benefits from '../components/Benefits.jsx';
import PwaInstallGuide from '../components/PwaInstallGuide.jsx';
import PilotPricing from '../components/PilotPricing.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceCards />
      <HowItWorks />
      <Benefits />

      <div className="hidden md:block">
        <PwaInstallGuide />
      </div>
      <section className="md:hidden bg-brand-grey-light py-16 text-center px-4">
        <h2 className="text-h2 font-bold text-center text-brand-text mb-2">התקן את Easylex בחינם</h2>
        <p className="text-brand-grey-text max-w-sm mx-auto">
          לחץ על הכפתור המתאים ← עקוב אחרי ההוראות ← האפליקציה מותקנת!
        </p>
      </section>

      <PilotPricing />

      <ContactForm />
    </>
  );
}
