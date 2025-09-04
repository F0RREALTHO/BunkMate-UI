import React from 'react';

const CircularProgress = ({ percentage, requiredPercentage }) => {
    const radius = 55;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let color = '#dc3545';
    if (percentage >= requiredPercentage) {
        color = '#28a745';
    } else if (percentage >= requiredPercentage - 5) {
        color = '#ffc107';
    }

    return (
        <div className="progress-circle-container">
            <svg
                height={radius * 2 + stroke}
                width={radius * 2 + stroke}
                viewBox={`0 0 ${radius * 2 + stroke} ${radius * 2 + stroke}`}
            >
                <circle
                    className="progress-circle-bg"
                    stroke="#333"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius + stroke / 2}
                    cy={radius + stroke / 2}
                />
                <circle
                    className="progress-circle-progress"
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius + stroke / 2}
                    cy={radius + stroke / 2}
                />
            </svg>
            <span className="progress-circle-text">
        {Math.round(percentage)}%
      </span>
        </div>
    );
};

export default CircularProgress;