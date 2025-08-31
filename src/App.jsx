import './index.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { JobsPage } from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import RoleSelect from './pages/RoleSelect';
import { UserNavigate } from './components/UserNavigate';

import { Profile } from './pages/Profile';
import { SettingPage } from './pages/SettingPage';
import { SaveJobs } from './pages/SaveJobs';
import { MoreDetails } from './pages/MoreDetails';
import { JobPost } from './pages/JobPost';
import { MyApplication } from './pages/MyApplication';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminMoredetails } from './pages/AdminMoredetails';

// ✅ Chat
import { ChatProvider } from './context/ChatContext';
import CandidateChatBoard from './pages/CandidateChatBoard';

function App() {
  return (
    <ChatProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />

      <UserNavigate />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user/:name' element={<Profile />} />
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/save-jobs' element={<SaveJobs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/select-role" element={<RoleSelect />} />  
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<MoreDetails />} />
        <Route path="/post-job" element={<JobPost />} />
        <Route path="/myApplication" element={<MyApplication />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/adminjob' element={<AdminMoredetails />} />

        {/* Candidate chat route */}
        <Route path="/chat" element={<CandidateChatBoard />} />
      </Routes>
    </ChatProvider>
  );
}

export default App;
