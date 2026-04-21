import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LogEntry from './pages/LogEntry';
import Insights from './pages/Insights';
import AIChat from './pages/AIChat';

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-neuro-darker text-white">
      <ParticleBackground />
      {!isLanding && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<LogEntry />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/chat" element={<AIChat />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
