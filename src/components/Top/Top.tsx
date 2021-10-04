import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

import { Legend, LegendProps } from './Legend';
import { GameName, GameNameProps } from './GameName';

export type TopComponentType = LegendProps & GameNameProps;

export const Top: FC<TopComponentType> = memo(
  ({ children, ...legendProps }) => (
    <Header>
      <GameName>{children}</GameName>
      <Legend {...legendProps} />
    </Header>
  )
);

Top.displayName = 'Top';

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
