import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Field } from '@/helpers/Field';
import { fieldGenerator } from '@/helpers/__mocks__/Field';

import { Grid } from '@/components/Grid';
import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';

import { GameArea } from './GameArea';
import { Wrapper } from './Wrapper';
import { GameOver } from './GameOver';

export default {
  title: 'Game/Example',
  component: Wrapper,
} as Meta;

const Template: Story = (args) => <Wrapper {...args} />;

export const GameExample = Template.bind({});

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
          {fieldGenerator(9) as Field}
        </Grid>
      </GameArea>
    </>
  ),
};
