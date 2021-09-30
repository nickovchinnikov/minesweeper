import { useState, useEffect, useCallback } from 'react';

export const useTime = (
  isGameStarted: boolean,
  isGameOver: boolean
): [number, () => void] => {
  const [time, setTime] = useState(0);

  const onReset = useCallback(
    () => setTime(0),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setInterval(() => {
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
