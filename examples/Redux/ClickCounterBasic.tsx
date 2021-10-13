import React, { FC, useReducer } from 'react';

import { reducer, initialState, increment, decrement } from './counter';

export const ClickCounterBasic: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div data-testid="count">Count: {state}</div>
      <button data-testid="dec" onClick={() => dispatch(decrement())}>
        -
      </button>
      <button data-testid="inc" onClick={() => dispatch(increment())}>
        +
      </button>
    </>
  );
};
