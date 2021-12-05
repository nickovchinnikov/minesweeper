import { configureStore } from '@reduxjs/toolkit';

import { gameSlice } from '@/modules/GameWithRedux';
import { automationSlice } from '@/modules/CellularAutomation';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    automation: automationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
