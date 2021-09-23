import React, { FC, useState } from 'react';

interface Props {
  defaultCount?: number;
}

export const ClickCounter: FC<Props> = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState(defaultCount);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
};
