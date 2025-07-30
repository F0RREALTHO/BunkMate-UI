import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

// A simple SVG arrow component for the stepper buttons
const ArrowIcon = ({ direction = 'up' }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: direction === 'down' ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M12 8L18 14H6L12 8Z" fill="currentColor"/>
    </svg>
);


const AddSubject = () => {
  const [name, setName] = useState('');
  const [attended, setAttended] = useState(0);
  const [missed, setMissed] = useState(0);
  const [requirement, setRequirement] = useState(75);
  const { username } = useAuth();
  const navigate = useNavigate();

  const handleRequirementChange = (amount) => {
    setRequirement(prev => {
      const newValue = prev + amount;
      // Clamp the value between 5 and 95
      return Math.max(5, Math.min(95, newValue));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a subject name.');
      return;
    }
    const newSubject = {
      name,
      attendedClasses: attended,
      missedClasses: missed,
      requiredPercentage: requirement,
    };

    try {
      await api.post(`/student/${username}/subject`, newSubject);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add subject.');
      console.error(err);
    }
  };

  return (
      <div className="add-subject-page">
        <header className="add-subject-header">
          <button onClick={() => navigate('/')} className="back-btn">←</button>
          <h2>Subject Name</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <input
              type="text"
              className="subject-name-input"
              placeholder="Ex. Biology"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />

          <div className="stepper-grid">
            {/* Attended Stepper */}
            <div className="stepper">
              <button type="button" onClick={() => setAttended(p => p + 1)}>
                <ArrowIcon direction="up" />
              </button>
              <div className="stepper-value">{attended}</div>
              <label>Attended</label>
              <button
                  type="button"
                  onClick={() => setAttended(p => p - 1)}
                  disabled={attended === 0}
              >
                <ArrowIcon direction="down" />
              </button>
            </div>

            {/* Missed Stepper */}
            <div className="stepper">
              <button type="button" onClick={() => setMissed(p => p + 1)}>
                <ArrowIcon direction="up" />
              </button>
              <div className="stepper-value">{missed}</div>
              <label>Missed</label>
              <button
                  type="button"
                  onClick={() => setMissed(p => p - 1)}
                  disabled={missed === 0}
              >
                <ArrowIcon direction="down" />
              </button>
            </div>

            {/* Requirement Stepper */}
            <div className="stepper">
              <button
                  type="button"
                  onClick={() => handleRequirementChange(5)}
                  disabled={requirement === 95}
              >
                <ArrowIcon direction="up" />
              </button>
              <div className="stepper-value">{requirement}%</div>
              <label>Requirement</label>
              <button
                  type="button"
                  onClick={() => handleRequirementChange(-5)}
                  disabled={requirement === 5}
              >
                <ArrowIcon direction="down" />
              </button>
            </div>
          </div>

          <button type="submit" className="add-btn-primary">Add</button>
        </form>
      </div>
  );
};

export default AddSubject;
