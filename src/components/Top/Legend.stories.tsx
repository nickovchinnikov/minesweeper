import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Legend, LegendProps } from './Legend';

export default {
  title: 'Top/Legend',
  component: Legend,
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

export const GameLegend = Template.bind({});
GameLegend.args = {
  feature: 'Flag',
  firstAction: 'ctrl',
  secondAction: 'click',
};
