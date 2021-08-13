import React from 'react';
import { Story, Meta } from '@storybook/react';

import { CellState, Field } from '@/helpers/Field';

import { Grid } from '@/components/Grid';
import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';

import { GameArea } from './GameArea';
import { Wrapper, WrapperProps } from './Wrapper';
import { GameOver } from './GameOver';

export default {
  title: 'Game/Example',
  component: Wrapper,
} as Meta;

const Template: Story<WrapperProps> = (args) => <Wrapper {...args} />;

export const GameExample = Template.bind({});

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const defautGameField: Field = [
  [f, f, h, h, h],
  [b, 3, 1, e, e],
  [1, 1, h, 1, 1],
  [1, e, e, 1, b],
  [2, 1, e, 1, e],
];

GameExample.args = {
  children: (
    <>
      <Top feature="Flag" firstAction="right click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="000"
          bombs="000"
          levels={['beginner', 'intermediate', 'expert']}
          onReset={() => null}
          onChangeLevel={() => null}
        />
        <GameOver onClick={() => null} isWin={true} />
        <Grid onClick={() => null} onContextMenu={() => null}>
          {defautGameField}
        </Grid>
      </GameArea>
    </>
  ),
};
