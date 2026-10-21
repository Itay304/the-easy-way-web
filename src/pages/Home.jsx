import { useState } from 'react';
import Hero from '../components/home/Hero.jsx';
import { DevicesSection, PrincipalsSection, StudentsSection, TeacherSection } from '../components/home/StorySections.jsx';
import ContactForm from '../components/ContactForm.jsx';
import InstallFaq from '../components/InstallFaq.jsx';
import VideoDialog from '../components/VideoDialog.jsx';

// סיפור בגלילה, רעיון אחד בכל קטע: פתיחה → תלמידים → מורה → טלפון/מחשב → מנהלים → יצירת קשר,
// ובסוף שאלה נפתחת על ההתקנה.
export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = () => setVideoOpen(true);

  return (
    <>
      <Hero onWatch={openVideo} />
      <StudentsSection onWatch={openVideo} />
      <TeacherSection />
      <DevicesSection onWatch={openVideo} />
      <PrincipalsSection />
      <ContactForm />
      <InstallFaq />
      <VideoDialog open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
