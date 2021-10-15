import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Coords } from '@/core/Field';
import { RootState } from '@/store';
import { Grid as GridComponent } from '@/components/Grid';

import { actions, runTimer } from '@/modules/GameWithRedux/game';

export const Grid: FC = () => {
  const { playerField } = useSelector(
    ({ game: { playerField } }: RootState) => ({
      playerField,
    })
  );

  const dispatch = useDispatch();

  const onClick = useCallback(
    (coords: Coords) => {
      dispatch(actions.openCell(coords));
      dispatch(runTimer());
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onContextMenu = useCallback(
    (coords: Coords) => {
      dispatch(actions.setFlag(coords));
      dispatch(runTimer());
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return (
    <GridComponent onClick={onClick} onContextMenu={onContextMenu}>
      {playerField}
    </GridComponent>
  );
};
