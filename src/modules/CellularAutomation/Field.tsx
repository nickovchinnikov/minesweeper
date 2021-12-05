import React, { FC, useEffect, useRef } from 'react';

import { getStateColors } from './filling';
import { Cell } from './types';

export interface Props {
  field: Cell[][];
  width: number;
  height: number;
}

export const Field: FC<Props> = ({ field, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const imageData = context.createImageData(width, height);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const state = field[y][x];

            const offset = (height * y + x) * 4;

            const stateColors = getStateColors(state);

            imageData.data[offset] = stateColors[0];
            imageData.data[offset + 1] = stateColors[1];
            imageData.data[offset + 2] = stateColors[2];
            imageData.data[offset + 3] = stateColors[3];
          }
        }
        context.putImageData(imageData, 0, 0);
      }
    }
  }, [field, width, height]);

  return (
    <section>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </section>
  );
};
