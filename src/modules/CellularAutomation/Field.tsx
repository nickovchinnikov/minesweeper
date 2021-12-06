import React, { FC, useEffect, useRef } from 'react';

import { getColor } from './filling';
import { Cell } from './types';

export interface Props {
  field: Cell[][];
  cellSize?: number;
  width: number;
  height: number;
}

export const Field: FC<Props> = ({
  field,
  width,
  height,
  cellSize: cs = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const state = field[y][x];
            context.fillStyle = getColor(state);
            context.fillRect(x * cs, y * cs, cs, cs);
          }
        }
      }
    }
  }, [field, width, height, cs]);

  return (
    <CanvasSection
      canvasRef={canvasRef}
      width={width * cs}
      height={height * cs}
    />
  );
};

const CanvasSection: FC<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
}> = React.memo(({ canvasRef, width, height }) => {
  return (
    <section>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </section>
  );
});

CanvasSection.displayName = 'CanvasSection';
