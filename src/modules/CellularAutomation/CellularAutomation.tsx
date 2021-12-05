import React, { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';

import { Field } from './Field';

import { runGeneration, actions } from './automation';

export const CellularAutomation = () => {
  const dispatch = useDispatch();
  const { field, width, height } = useSelector(
    ({ automation: { field, width, height } }: RootState) => ({
      field,
      width,
      height,
    })
  );

  useEffect(() => {
    dispatch(actions.isPlayingToggle());
    dispatch(runGeneration());
  }, []);

  return <Field field={field} width={width} height={height} />;
};
