import React, { FC } from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { MinesweeperWithHooks } from '@/pages/MinesweeperWithHooks';
import { MinesweeperWithUseReducer } from '@/pages/MinesweeperWithUseReducer';
import { MinesweeperWithReactRedux } from '@/pages/MinesweeperWithReactRedux';

import { store } from '@/store';

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
          <Link to="/game-with-usereducer">Game With useReducer</Link>
        </li>
        <li>
          <Link to="/game-with-reactredux">Game With ReactRedux</Link>
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
      <Route path="/game-with-usereducer">
        <MinesweeperWithUseReducer />
      </Route>
      <Route path="/game-with-reactredux">
        <Provider store={store}>
          <MinesweeperWithReactRedux />
        </Provider>
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>;
