import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Library from './pages/Library';
import History from './pages/History';
import Spaces from './pages/Spaces';
import HelpTools from './pages/HelpTools';
import Feedback from './pages/Feedback';
import QuickGuide from './pages/QuickGuide';
import SpaceDetail from './pages/SpaceDetail';
import ContentDetail from './pages/ContentDetail';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/library" element={<Library />} />
          <Route path="/history" element={<History />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/space/:spaceId" element={<SpaceDetail />} />
          <Route path="/content/:contentId" element={<ContentDetail />} />
          <Route path="/help" element={<HelpTools />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/guide" element={<QuickGuide />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
