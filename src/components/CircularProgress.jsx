import React from 'react';

const CircularProgress = ({ percentage }) => {
  const radius = 55;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? '#28a745' : '#dc3545';

  return (
      <div className="progress-circle-container">
        <svg
            height={radius * 2 + stroke} // Add stroke to height
            width={radius * 2 + stroke}  // Add stroke to width
            viewBox={`0 0 ${radius * 2 + stroke} ${radius * 2 + stroke}`}
        >
          {/* Background Circle */}
          <circle
              className="progress-circle-bg"
              stroke="#333"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius + stroke / 2} // Center the circle
              cy={radius + stroke / 2} // Center the circle
          />
          {/* Foreground (Progress) Circle */}
          <circle
              className="progress-circle-progress"
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius + stroke / 2} // Center the circle
              cy={radius + stroke / 2} // Center the circle
          />
        </svg>
        <span className="progress-circle-text">
        {Math.round(percentage)}%
      </span>
      </div>
  );
};

export default CircularProgress;
