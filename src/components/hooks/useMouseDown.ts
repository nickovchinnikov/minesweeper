import { useState, useDebugValue, useCallback } from 'react';

export type SetMouseDownStatus = () => void;
export type SetMouseUpStatus = () => void;

export const useMouseDown = (): [
  boolean,
  SetMouseDownStatus,
  SetMouseUpStatus
] => {
  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = useCallback(() => setMouseDown(true), []);
  const onMouseUp = useCallback(() => setMouseDown(false), []);

  return [mouseDown, onMouseDown, onMouseUp];
};
