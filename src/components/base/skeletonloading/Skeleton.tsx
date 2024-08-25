import React from 'react';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-300 rounded-md ${className}`}></div>
  );
};

export default Skeleton;
