import { useEffect } from 'react';
import { DevicesSection, PrincipalsSection, StudentsSection, TeacherSection } from './StorySections.jsx';
import ContactForm from '../ContactForm.jsx';
import InstallFaq from '../InstallFaq.jsx';

// כל מה שמתחת לפתיחה — בחבילת JS נפרדת (React.lazy ב-Home.jsx), כדי שהפתיחה תצויר מהר יותר.
export default function BelowFold() {
  // כניסה ישירה ל-/#contact (למשל מהקישור בתחתית עמוד הנגישות): העוגן נוצר רק עכשיו, אז גוללים אליו כאן
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <StudentsSection />
      <TeacherSection />
      <DevicesSection />
      <PrincipalsSection />
      <ContactForm />
      <InstallFaq />
    </>
  );
}
