import React, { FC, Suspense } from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

const MinesweeperWithHooks = React.lazy(() =>
  import('@/pages/MinesweeperWithHooks').then(({ MinesweeperWithHooks }) => ({
    default: MinesweeperWithHooks,
  }))
);

const MinesweeperWithUseReducer = React.lazy(() =>
  import('@/pages/MinesweeperWithUseReducer').then(
    ({ MinesweeperWithUseReducer }) => ({
      default: MinesweeperWithUseReducer,
    })
  )
);

const MinesweeperWithReactRedux = React.lazy(() =>
  import('@/pages/MinesweeperWithReactRedux').then(
    ({ MinesweeperWithReactRedux }) => ({
      default: MinesweeperWithReactRedux,
    })
  )
);

import { store } from '@/store';

export const App: FC = () => (
  <Provider store={store}>
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
        <Route path="/game-with-hooks/:username?">
          <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
            <MinesweeperWithHooks />
          </Suspense>
        </Route>
        <Route path="/game-with-usereducer">
          <Suspense
            fallback={<div>Loading minesweeper with useReducer...</div>}
          >
            <MinesweeperWithUseReducer />
          </Suspense>
        </Route>
        <Route path="/game-with-reactredux">
          <Suspense
            fallback={<div>Loading minesweeper with ReactRedux...</div>}
          >
            <MinesweeperWithReactRedux />
          </Suspense>
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>;
