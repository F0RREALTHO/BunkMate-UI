import React, { useState } from 'react';
import api from '../services/api.js';
import CircularProgress from './CircularProgress.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const SubjectCard = ({ subject, onUpdate }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { username } = useAuth();

  const handleUpdate = async (type, operation) => {
    try {
      await api.put(`/student/${username}/subject/${subject.name}/${type}/${operation}`);
      onUpdate();
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleDelete = async () => {
    // We are replacing window.confirm with a custom modal later
    if (window.confirm(`Are you sure you want to delete ${subject.name}?`)) {
      try {
        await api.delete(`/student/${username}/subject/${subject.name}`);
        onUpdate();
      } catch (err) {
        console.error('Failed to delete subject:', err);
      }
    }
  };

  const totalClasses = subject.attendedClasses + subject.missedClasses;
  const statusMessage =
      subject.currentAttendancePercentage < subject.requiredPercentage
          ? `Must Attend ${subject.classesNeededToReachRequirements} more classes`
          : `Can skip ${subject.classesCanBeMissed} classes`;

  return (
      <div className="subject-card">
        <div className="card-top">
          <div className="card-top-left">
            <h2>{subject.name}</h2>
            <div className="stats">
              <p><span className="number">{subject.attendedClasses}</span> Attended</p>
              <p><span className="number">{subject.missedClasses}</span> Missed</p>
              <p><span className="number">{totalClasses}</span> Total</p>
            </div>
            <p className="status">{statusMessage}</p>
            <p className="requirement">Requirement: {subject.requiredPercentage}%</p>
          </div>

          <div className="card-top-right">
            <CircularProgress percentage={subject.currentAttendancePercentage} />
          </div>
        </div>

        {/* --- THIS IS THE UPDATED SECTION --- */}
        <div className="card-controls">
          <div className="control-group">
            <label>Attended</label>
            <div className="buttons">
              <button
                  onClick={() => handleUpdate('attended', 'dec')}
                  disabled={subject.attendedClasses === 0}
                  className={`btn-dec ${subject.attendedClasses === 0 ? 'disabled-btn' : ''}`}
              >
                -
              </button>
              <button
                  onClick={() => handleUpdate('attended', 'inc')}
                  className="btn-inc"
              >
                +
              </button>
            </div>
          </div>

          <button onClick={handleDelete} className="delete-btn">Delete</button>

          <div className="control-group">
            <label>Missed</label>
            <div className="buttons">
              <button
                  onClick={() => handleUpdate('missed', 'dec')}
                  disabled={subject.missedClasses === 0}
                  className={`btn-dec ${subject.missedClasses === 0 ? 'disabled-btn' : ''}`}
              >
                -
              </button>
              <button
                  onClick={() => handleUpdate('missed', 'inc')}
                  className="btn-inc"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SubjectCard;
