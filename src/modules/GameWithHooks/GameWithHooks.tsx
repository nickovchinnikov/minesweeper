import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';

import { Grid } from '@/components/Grid';
import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { GameArea, Wrapper, GameOver } from '@/components/Game';

import {
  generateFieldWithDefaultState,
  fieldGenerator,
  CellState,
  Coords,
  Field,
  LvlNames,
  LvlMapper,
} from '@/helpers/Field';
import { openCell } from '@/helpers/OpenCell';
import { setFlag } from '@/helpers/SetFlag';

export interface GameWithUseStateProps {
  defaultField?: Field;
  level?: LvlNames;
}

export const GameWithHooks: FC<GameWithUseStateProps> = ({
  defaultField,
  level = 'beginner',
}) => {
  const [lvl, setLvl] = useState<LvlNames>(level);

  const [playerField, setPlayerField] = useState<Field>();

  const [gameField, setGameField] = useState<Field>();

  const [isGameStarted, setIsGameStarted] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);

  const [isWin, setIsWin] = useState(false);

  const [time, setTime] = useState(0);

  const [size, bombs] = useMemo(() => LvlMapper[lvl], [lvl]);

  const [bombsCounter, setBombsCounter] = useState(bombs);

  const onReset = () => {
    const gameField = defaultField
      ? defaultField
      : fieldGenerator(size, bombs / (size * size));

    setIsGameOver(false);
    setTime(0);
    setBombsCounter(bombs);
    setGameField([...gameField]);

    const playerField = generateFieldWithDefaultState(
      gameField.length,
      CellState.hidden
    );

    setPlayerField([...playerField]);

    return playerField;
  };

  useMemo(onReset, [size, bombs, defaultField]);

  const onClick = useCallback(
    (coords: Coords) => {
      !isGameStarted && setIsGameStarted(true);

      try {
        const newPlayerField = openCell(
          coords,
          playerField as Field,
          gameField as Field
        );
        setPlayerField([...newPlayerField]);

        if (newPlayerField === gameField) {
          setIsWin(true);
          setIsGameOver(true);
        }
      } catch (error) {
        setIsWin(false);
        setIsGameOver(true);
        setPlayerField([...(gameField as Field)]);
      }
    },
    [playerField, gameField, isGameStarted]
  );

  const onContextMenu = useCallback(
    (coords: Coords) => {
      !isGameStarted && setIsGameStarted(true);

      const [newPlayerField, flagCounter] = setFlag(
        coords,
        playerField as Field,
        gameField as Field
      );

      setBombsCounter(bombs - flagCounter);
      setPlayerField([...newPlayerField]);

      if (newPlayerField === gameField) {
        setIsWin(true);
        setIsGameOver(true);
      }
    },
    [playerField, gameField, bombs, isGameStarted]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      if (isGameOver) {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameStarted, isGameOver, time]);

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time={String(time)}
          bombs={String(bombsCounter)}
          levels={['beginner', 'intermediate', 'expert']}
          onReset={onReset}
          onChange={({ target: { value } }) => setLvl(value as LvlNames)}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        {playerField && (
          <Grid onClick={onClick} onContextMenu={onContextMenu}>
            {playerField}
          </Grid>
        )}
      </GameArea>
    </Wrapper>
  );
};
