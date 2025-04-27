import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import InterviewScheduler from './pages/InterviewScheduler';
import PlacementTimeline from './pages/PlacementTimeline';
import Mentorship from './pages/Mentorship';
import JobApplication from './pages/JobApplication';
import JobPostings from './pages/JobPostings';
import Profile from './pages/Profile';
import Modal from './components/Modal';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [modalContent, setModalContent] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`pt-20 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-6`}>
          <Routes>
            <Route path="/" element={<Dashboard setModalContent={setModalContent} />} />
            <Route path="/jobs" element={<JobPostings setModalContent={setModalContent} />} />
            <Route path="/scheduler" element={<InterviewScheduler setModalContent={setModalContent} />} />
            <Route path="/timeline" element={<PlacementTimeline />} />
            <Route path="/mentorship" element={<Mentorship setModalContent={setModalContent} />} />
            <Route path="/apply/:jobId" element={<JobApplication />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {modalContent && (
          <Modal onClose={closeModal}>
            {modalContent}
          </Modal>
        )}
      </div>
    </Router>
  );
}

export default App;