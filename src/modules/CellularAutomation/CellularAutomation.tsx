import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';

import { Field } from './Field';

export const CellularAutomation = () => {
  const { field, width, height } = useSelector(
    ({ automation: { field, width, height } }: RootState) => ({
      field,
      width,
      height,
    })
  );

  return <Field field={field} width={width} height={height} />;
};
