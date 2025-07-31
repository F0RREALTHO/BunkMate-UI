import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import SubjectCard from './SubjectCard.jsx';
import DeleteAccountModal from './DeleteAccountModal.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options).toUpperCase());
  }, []);

  const fetchSubjects = useCallback(async () => {
    if (!username) return;
    try {
      const response = await api.get(`/student/${username}`);
      response.data.sort((a, b) => a.name.localeCompare(b.name));
      setSubjects(response.data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    }
  }, [username]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/student/${username}`);
      logout();
      navigate('/login'); // Navigate to login page after deletion
    } catch (err) {
      console.error('Failed to delete account:', err);
      // You could add user-facing error feedback here
    }
  };

  return (
      <>
        <div className="dashboard-header">
          <p className="date-display">{currentDate}</p>
          <div className="header-main">
            <h1>Hello {username}, Your Attendance</h1>
            <div className="header-actions">
              <button onClick={logout} title="Logout">Logout</button>
              <button
                  onClick={() => navigate('/add')}
                  title="Add Subject"
                  className={subjects.length > 0 ? 'glowing-plus' : ''}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {subjects.length === 0 ? (
            <div className="onboarding-container">
              <div className="onboarding-message">
                <h2>Welcome to BunkSy! 📚 💓</h2>
                <p className="tagline">Track. Skip. Bunk.</p>
                <p>Add your first subject to get started.</p>
              </div>
              <button
                  className="onboarding-add-button"
                  onClick={() => navigate('/add')}
              >
                ✨ Click here to add your first subject
              </button>
            </div>
        ) : (
            <>
              <div className="subject-list">
                {subjects.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        username={username}
                        onUpdate={fetchSubjects}
                    />
                ))}
              </div>

              {/* Bottom Bar with Welcome Message and Trash Button */}
              <div className="bottom-nav">
                <div className="nav-item welcome-message-bar">
                  <label>Welcome to BunkSy! 📚 💓</label>
                  <p className="tagline">Track. Skip. Bunk.</p>
                </div>
                <button
                    className="trash-btn"
                    onClick={() => setIsDeleteModalOpen(true)}
                    title="Delete Account"
                >
                  🗑️
                </button>
              </div>
            </>
        )}

        {/* Delete Account Modal */}
        <DeleteAccountModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
            username={username}
        />
      </>
  );
};

export default Dashboard;