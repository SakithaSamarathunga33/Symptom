import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import SymptomInput from './pages/SymptomInput';
import Results from './pages/Results';
import GeoRiskMap from './pages/GeoRiskMap';
import UserCrud from './page/UserCrud'; // Keeping the legacy admin page for now

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-input" element={<SymptomInput />} />
          <Route path="/results" element={<Results />} />
          <Route path="/geo-risk" element={<GeoRiskMap />} />

          {/* Legacy/Admin Route */}
          <Route path="/admin/users" element={<UserCrud />} />

          {/* Fallbacks */}
          <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
