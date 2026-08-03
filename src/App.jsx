import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Teacher from './pages/Teacher.jsx';
import Student from './pages/Student.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/student" element={<Student />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
