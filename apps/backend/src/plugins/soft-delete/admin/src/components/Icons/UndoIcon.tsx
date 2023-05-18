import React from 'react';

const Undo: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ fill: `${color}` }}
        d="M8 1a7.979 7.979 0 0 0-5.657 2.343L0 1v6h6L3.757 4.757a6 6 0 1 1 8.211 8.743l1.323 1.5A8 8 0 0 0 8 1z"
      ></path>
    </svg>
  );
};

export default Undo;
