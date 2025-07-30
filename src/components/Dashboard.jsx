import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import SubjectCard from './SubjectCard.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

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
            <> {/* Fragment to hold multiple elements if subjects exist */}
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

              {/* Bottom Bar with Welcome Message - only visible when subjects exist */}
              <div className="bottom-nav">
                <div className="nav-item welcome-message-bar"> {/* New class for specific styling */}
                  <label>Welcome to BunkSy! 📚 💓</label>
                  <p className="tagline">Track. Skip. Bunk.</p>
                </div>
              </div>
            </>
        )}
      </>
  );
};

export default Dashboard;