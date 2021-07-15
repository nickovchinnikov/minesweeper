import { useState } from 'react';

export type SetMouseDownStatus = () => void;
export type SetMouseUpStatus = () => void;

export const useMouseDown = (): [
  boolean,
  SetMouseDownStatus,
  SetMouseUpStatus
] => {
  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = () => setMouseDown(true);
  const onMouseUp = () => setMouseDown(false);

  return [mouseDown, onMouseDown, onMouseUp];
};
