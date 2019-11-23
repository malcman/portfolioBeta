import React from 'react';

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <svg viewBox="0 0 300 300">
        <polygon points="75,25 225,25 150,125" />
        <text x="110" y="155">Loading</text>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
