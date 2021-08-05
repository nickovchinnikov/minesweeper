import React from 'react';
import { Story, Meta } from '@storybook/react';

import { GameOver, GameOverProps } from './GameOver';

export default {
  title: 'Game/GameOver',
  component: GameOver,
} as Meta;

const Template: Story<GameOverProps> = (args) => <GameOver {...args} />;

export const GameOverWinExample = Template.bind({});
GameOverWinExample.args = {
  isWin: true,
};

export const GameOverLooseExample = Template.bind({});
GameOverLooseExample.args = {
  isWin: false,
};
