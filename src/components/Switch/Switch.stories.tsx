import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Switch, SwitchProps } from './Switch';

export default {
  component: Switch,
  title: 'Control Panel/Select',
} as Meta;

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const SelectExample = Template.bind({});

SelectExample.args = {
  label: 'Label',
  options: ['option1', 'option2', 'option3'],
};
