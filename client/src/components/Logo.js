import React from 'react';

const Logo = ({ width = 150, height = 150 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle representing a clock */}
      <circle cx="100" cy="100" r="90" stroke="#4A90E2" strokeWidth="8" fill="white"/>
      
      {/* Circuit lines representing AI/technology */}
      <path 
        d="M50 100 H80 M120 100 H150" 
        stroke="#4A90E2" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <path 
        d="M100 50 V80 M100 120 V150" 
        stroke="#4A90E2" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      
      {/* Central gear representing scheduling */}
      <circle cx="100" cy="100" r="30" fill="#4A90E2"/>
      <circle cx="100" cy="100" r="15" fill="white"/>
      
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="95"
          y="65"
          width="10"
          height="20"
          fill="#4A90E2"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      
      {/* Dots representing nodes/tasks */}
      {[45, 135, 225, 315].map((angle) => (
        <circle
          key={angle}
          cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          r="8"
          fill="#4A90E2"
        />
      ))}
    </svg>
  );
};

export default Logo; 