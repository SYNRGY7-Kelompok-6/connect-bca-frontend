import { useState, useEffect } from 'react';

export const useTimeout = (expiresAt: number | null) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (expiresAt === null) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = expiresAt - now;

      if (distance < 0) {
        setTimeLeft('Expired');
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};
