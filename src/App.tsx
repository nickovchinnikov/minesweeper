import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { MinesweeperWithHooks } from '@/pages/MinesweeperWithHooks';
import { MinesweeperWithRedux } from '@/pages/MinesweeperWithRedux';

export const App: FC = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game-with-hooks">Game With Hooks</Link>
        </li>
        <li>
          <Link to="/game-with-redux">Game With Redux</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/game-with-hooks/:username?">
        <MinesweeperWithHooks />
      </Route>
      <Route path="/game-with-redux">
        <MinesweeperWithRedux />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

const Home: FC = () => <h2>Minesweeper game Forever!</h2>;
