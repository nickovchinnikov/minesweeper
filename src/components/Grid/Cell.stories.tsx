import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Cell, CellProps } from './Cell';

export default {
  title: 'Grid/Cell',
  component: Cell,
  argTypes: {
    coords: { defaultValue: [1, 1] },
  },
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: 10,
};

export const CellIsEmpty = Template.bind({});
CellIsEmpty.args = {
  children: 0,
};

export const CellWithBomb = Template.bind({});
CellWithBomb.args = {
  children: 9,
};

export const CellWithFlag = Template.bind({});
CellWithFlag.args = {
  children: 11,
};

export const CellWeakFlag = Template.bind({});
CellWeakFlag.args = {
  children: 12,
};

export const CellWith1 = Template.bind({});
CellWith1.args = {
  children: 1,
};

export const CellWith3 = Template.bind({});
CellWith3.args = {
  children: 3,
};

export const CellWith5 = Template.bind({});
CellWith5.args = {
  children: 5,
};

export const CellWith8 = Template.bind({});
CellWith8.args = {
  children: 8,
};
