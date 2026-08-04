import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketingLayout from './components/MarketingLayout.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MarketingLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
