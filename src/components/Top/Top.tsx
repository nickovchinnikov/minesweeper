import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

import { Legend, LegendProps } from './Legend';
import { GameName } from './GameName';

export const Top: FC<LegendProps> = memo(({ children, ...legendProps }) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...legendProps} />
  </Header>
));

// Stryker disable next-line StringLiteral
Top.displayName = 'Top';

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
