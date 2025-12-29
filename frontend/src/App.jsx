import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserCrud from './page/UserCrud';

// Landing Page Component
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <h1 className="hero-title">Frontend Ready</h1>
      <p className="hero-subtitle">
        Your high-performance React + Vite environment is successfully set up and ready to code.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="cta-button" onClick={() => alert("Let's build something amazing!")}>
          Get Started
        </button>
        <button className="cta-button" style={{ background: 'rgba(255,255,255,0.1)', boxShadow: 'none' }} onClick={() => navigate('/site')}>
          Go to User CRUD
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/site" element={<UserCrud />} />
      </Routes>
    </Router>
  )
}

export default App
