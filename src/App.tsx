import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { MinesweeperWithHooks } from '@/pages/MinesweeperWithHooks';

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
      </ul>
    </nav>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/game-with-hooks/:username?">
        <MinesweeperWithHooks />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

const Home: FC = () => <h2>Minesweeper game Forever!</h2>;
