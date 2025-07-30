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
      response.data.sort((a,b)=>a.name.localeCompare(b.name));
      console.log(response.data,response);
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
          <h1>Hello {username},Your Attendance</h1>
          <div className="header-actions">
            <button onClick={logout} title="Logout">Logout</button>
            <button onClick={() => navigate('/add')} title="Add Subject">+</button>
          </div>
        </div>
      </div>
      
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
      
      <div className="bottom-nav">
        <div className="nav-item active">
          <span>🎓</span>
          <label>Attendance</label>
        </div>
      </div>
    </>
  );
};

export default Dashboard;