import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketingLayout from './components/MarketingLayout.jsx';
import AppEntry from './pages/AppEntry.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/:role" element={<AppEntry />} />
        <Route path="/*" element={<MarketingLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
