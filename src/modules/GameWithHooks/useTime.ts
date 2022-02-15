import { useState, useEffect } from 'react';

export const useTime = (
  isGameStarted: boolean,
  isGameOver: boolean
): [number, () => void] => {
  const [time, setTime] = useState(0);

  const onReset = () => setTime(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setTimeout(() => {
        setTime(time + 1);
      }, 1000);

      if (isGameOver) {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameOver, isGameStarted, time]);

  return [time, onReset];
};
