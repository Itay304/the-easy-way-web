import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import RequireDesktop from './RequireDesktop.jsx';
import Home from '../pages/Home.jsx';
import Teacher from '../pages/Teacher.jsx';
import Student from '../pages/Student.jsx';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/teacher"
            element={
              <RequireDesktop>
                <Teacher />
              </RequireDesktop>
            }
          />
          <Route
            path="/student"
            element={
              <RequireDesktop>
                <Student />
              </RequireDesktop>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
