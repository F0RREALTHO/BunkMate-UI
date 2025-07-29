import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

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
        if (newValue >= 0 && newValue <= 100) return newValue;
        return prev;
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
          <div className="stepper">
            <button type="button" onClick={() => setAttended(p => p + 1)}>&#9650;</button>
            <div className="stepper-value">{attended}</div>
            <label>Attended</label>
            <button type="button" onClick={() => setAttended(p => Math.max(0, p - 1))}>&#9660;</button>
          </div>
          <div className="stepper">
            <button type="button" onClick={() => setMissed(p => p + 1)}>&#9650;</button>
            <div className="stepper-value">{missed}</div>
            <label>Missed</label>
            <button type="button" onClick={() => setMissed(p => Math.max(0, p - 1))}>&#9660;</button>
          </div>
          <div className="stepper">
            <button type="button" onClick={() => handleRequirementChange(5)}>&#9650;</button>
            <div className="stepper-value">{requirement}%</div>
            <label>Requirement</label>
            <button type="button" onClick={() => handleRequirementChange(-5)}>&#9660;</button>
          </div>
        </div>

        <button type="submit" className="add-btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddSubject;