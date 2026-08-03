import Hero from '../components/Hero.jsx';
import AudienceCards from '../components/AudienceCards.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Benefits from '../components/Benefits.jsx';
import PwaInstallGuide from '../components/PwaInstallGuide.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceCards />
      <HowItWorks />
      <Benefits />
      <PwaInstallGuide />
      <ContactForm />
    </>
  );
}
