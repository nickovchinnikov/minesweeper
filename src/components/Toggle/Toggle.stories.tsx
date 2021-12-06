import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Toggle, ToggleProps } from './Toggle';

export default {
  component: Toggle,
  title: 'Control Panel/Button',
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const ButtonExample = Template.bind({});

ButtonExample.args = {
  children: 'Stop/Start',
};
