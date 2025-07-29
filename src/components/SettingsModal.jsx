import React from 'react';

const SettingsModal = ({ isOpen, onClose, onLogout, stats }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        
        <div className="overall-stats">
          <h3>Overall Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{stats.attended}</span>
              <span className="stat-label">Attended</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.missed}</span>
              <span className="stat-label">Missed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.percentage}%</span>
              <span className="stat-label">Overall</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;