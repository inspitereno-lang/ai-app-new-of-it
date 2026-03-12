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
import Contact from './pages/Contact';
import ExamList from './pages/ExamList';
import ExamConfig from './pages/ExamConfig';
import ExamTaking from './pages/ExamTaking';
import ExamResults from './pages/ExamResults';
import ExamReview from './pages/ExamReview';
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpTools />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/guide" element={<QuickGuide />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exam/config" element={<ExamConfig />} />
          <Route path="/exam/:examId/take" element={<ExamTaking />} />
          <Route path="/exam/:examId/results/:attemptId" element={<ExamResults />} />
          <Route path="/exam/:examId/review/:attemptId" element={<ExamReview />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
