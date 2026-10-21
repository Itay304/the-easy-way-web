import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import A11yMenu from './A11yMenu.jsx';
import Home from '../pages/Home.jsx';
const Accessibility = lazy(() => import('../pages/Accessibility.jsx'));
const LegalPage = lazy(() => import('../pages/LegalPage.jsx'));

// מעבר בין עמודים מתחיל מראש העמוד (חוץ מקישור לעוגן, למשל /#contact)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        דילוג לתוכן
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/accessibility"
            element={
              <Suspense fallback={null}>
                <Accessibility />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={null}>
                <LegalPage page="terms" />
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={null}>
                <LegalPage page="privacy" />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <A11yMenu />
    </div>
  );
}
