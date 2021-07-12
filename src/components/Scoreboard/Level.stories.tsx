import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Level, LevelProps } from './Level';

export default {
  title: 'Scoreboard/Level',
  component: Level,
} as Meta;

const Template: Story<LevelProps> = (args) => <Level {...args} />;

export const LevelExample = Template.bind({});
LevelExample.args = {
  children: ['beginner', 'intermediate', 'expert'],
};
