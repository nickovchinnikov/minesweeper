import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Field, Props } from './Field';
import { randomFill } from './filling';

export default {
  component: Field,
  title: 'Display/Display',
} as Meta;

const Template: Story<Props> = (args) => <Field {...args} />;

export const DisplayExample = Template.bind({});
DisplayExample.args = {
  width: 300,
  height: 300,
  cellsState: randomFill(300, 300),
};
