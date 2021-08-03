import React, { FC, useState, useMemo, useCallback } from 'react';

import { Grid } from '@/components/Grid';
import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';

import {
  generateFieldWithDefaultState,
  fieldGenerator,
  CellState,
  Coords,
  Field,
} from '@/helpers/Field';
import { openCell } from '@/helpers/OpenCell';
import { setFlag } from '@/helpers/SetFlag';

type LvlName = 'beginner' | 'intermediate' | 'expert';

type Size = number;
type Bombs = number;

type LvlSettings = [Size, Bombs];

export const LvlMapper: Record<LvlName, LvlSettings> = {
  beginner: [9, 10],
  intermediate: [16, 44],
  expert: [22, 99],
};

export interface GameWithUseStateProps {
  defaultField?: Field;
  level?: LvlName;
}

export const GameWithHooks: FC<GameWithUseStateProps> = ({
  defaultField,
  level = 'beginner',
}) => {
  const [lvl, setLvl] = useState<LvlName>(level);

  const [playerField, setPlayerField] = useState<Field>();

  const [gameField, setGameField] = useState<Field>();

  const [size, bombs] = useMemo(() => LvlMapper[lvl], [lvl]);

  const onReset = () => {
    const gameField = defaultField
      ? defaultField
      : fieldGenerator(size, bombs / (size * size));

    setGameField([...gameField]);

    const playerField = generateFieldWithDefaultState(size, CellState.hidden);

    setPlayerField([...playerField]);

    return playerField;
  };

  useMemo(onReset, [size, bombs, defaultField]);

  const onClick = useCallback(
    (coords: Coords) => {
      const newPlayerField = openCell(
        coords,
        playerField as Field,
        gameField as Field
      );
      setPlayerField([...newPlayerField]);
    },
    [playerField, gameField]
  );

  const onContextMenu = useCallback(
    (coords: Coords) => {
      const newPlayerField = setFlag(
        coords,
        playerField as Field,
        gameField as Field
      );
      setPlayerField([...newPlayerField]);
    },
    [playerField, gameField]
  );

  return (
    <>
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <Scoreboard
        time="000"
        levels={['beginner', 'intermediate', 'expert']}
        mines="010"
        onReset={onReset}
        onChange={({ target: { value } }) => setLvl(value as LvlName)}
      />
      {playerField && (
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      )}
    </>
  );
};
