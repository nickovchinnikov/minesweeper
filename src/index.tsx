import React from 'react';
import ReactDOM from 'react-dom';

import { Top } from './components/Top';
import { Scoreboard } from './components/Scoreboard';
import { Grid } from './components/Grid';

ReactDOM.render(
  <>
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
    <Scoreboard
      time="000"
      levels={['beginner', 'intermediate', 'expert']}
      mines="010"
      onReset={() => null}
    />
    <Grid onClick={() => null} onContextMenu={() => null}>
      {[
        [9, 2, 9, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1, 0, 1, 9, 1, 1, 9, 1],
        [0, 0, 1, 9, 10, 0, 2, 2, 2, 1, 1, 1],
        [0, 0, 10, 10, 1, 0, 1, 9, 1, 2, 2, 2],
        [0, 1, 1, 2, 2, 9, 1, 1, 1, 0, 0, 0],
        [0, 1, 9, 3, 9, 2, 10, 0, 0, 2, 1, 1],
        [0, 2, 2, 4, 9, 2, 10, 1, 1, 1, 9, 1],
        [0, 1, 9, 2, 1, 1, 1, 9, 1, 2, 2, 2],
        [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
      ]}
    </Grid>
  </>,
  document.getElementById('root')
);
