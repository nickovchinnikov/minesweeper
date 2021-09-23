import React, { FC, useState, useEffect } from 'react';

interface Props {
  defaultCount?: number;
  documentClickHandler: () => void;
}

export const ClickCounter: FC<Props> = ({
  defaultCount = 0,
  documentClickHandler,
}) => {
  const [count, setCount] = useState(defaultCount);

  useEffect(() => {
    document.title = `Counter: ${count}`;

    document.addEventListener('click', documentClickHandler);
    return () => {
      document.removeEventListener('click', documentClickHandler);
    };
  });

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
};
