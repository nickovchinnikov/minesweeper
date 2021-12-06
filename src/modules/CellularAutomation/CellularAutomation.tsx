import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { RootState } from '@/store';
import { Toggle } from '@/components/Toggle';
import { Switch } from '@/components/Switch';

import { Field } from './Field';

import { runGeneration, actions, Speed, Size } from './automation';
import { Rules } from './types';

export const CellularAutomation = () => {
  const dispatch = useDispatch();
  const { field, size } = useSelector(
    ({ automation: { field, size } }: RootState) => ({
      field,
      size,
    })
  );

  const toggleAutomationProgress = () => {
    dispatch(actions.isPlayingToggle());
    dispatch(runGeneration());
  };

  useEffect(() => {
    toggleAutomationProgress();
  }, []);

  return (
    <>
      <TopSection>
        <Toggle onClick={toggleAutomationProgress}>Start/Pause</Toggle>
        <Toggle onClick={() => dispatch(actions.reset())}>Reset</Toggle>
      </TopSection>
      <Field field={field} width={size} height={size} />
      <BottomSection>
        <Switch
          label="Size"
          options={['50', '100', '120']}
          value={String(size)}
          onChange={({
            target: { value: size },
          }: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(actions.changeSize(Number(size) as Size))
          }
        />
        <Switch
          label="Speed"
          options={['fast', 'normal', 'slow']}
          onChange={({
            target: { value: speed },
          }: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(actions.changeSpeed(speed as Speed))
          }
        />
        <Switch
          label="Rule"
          options={['Hash', 'Demons', 'Venus']}
          onChange={({
            target: { value: rule },
          }: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(actions.changeRule(rule as Rules))
          }
        />
      </BottomSection>
    </>
  );
};

const TopSection = styled.section`
  margin: 1rem auto 0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #1b1d20;
  border-radius: 0.7rem 0.7rem 0 0;
`;

const BottomSection = styled.section`
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #1b1d20;
  border-radius: 0 0 0.7rem 0.7rem;
  text-align: center;
`;
