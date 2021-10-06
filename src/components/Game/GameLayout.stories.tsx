import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Field } from '@/core/Field';
import { fieldGenerator } from '@/core/__mocks__/Field';

import { Grid } from '@/components/Grid';
import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';

import { GameOver } from '@/components/Game';

import { GameLayout, Props } from './GameLayout';

export default {
  title: 'Game/Layout',
  component: GameLayout,
} as Meta;

const Template: Story<Props> = (args) => <GameLayout {...args} />;

export const LayoutExample = Template.bind({});
LayoutExample.args = {
  top: (
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
  ),
  children: (
    <>
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
    </>
  ),
};
