import React from 'react';
import ReactDOM from 'react-dom';

import { Top } from './components/Top';

ReactDOM.render(
  <Top feature="Flag" firstAction="ctrl" secondAction="click">
    Minesweeper
  </Top>,
  document.getElementById('root')
);
