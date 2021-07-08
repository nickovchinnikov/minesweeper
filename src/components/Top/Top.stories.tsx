import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Top, TopComponentType } from './Top';

export default {
  title: 'Top/Top',
  component: Top,
} as Meta;

const Template: Story<TopComponentType> = (args) => <Top {...args} />;

export const TopPanel = Template.bind({});
TopPanel.args = {
  children: 'minesweeper',
  feature: 'Flag',
  firstAction: 'ctrl',
  secondAction: 'click',
};
