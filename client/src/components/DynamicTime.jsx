import React, { useState, useEffect } from 'react';

const DynamicTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
      {formatTime(time)}
    </div>
  );
};

export default DynamicTime;
