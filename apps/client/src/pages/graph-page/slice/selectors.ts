import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state ? state.graphState || initialState : initialState;

export const selectGraphState = createSelector([selectSlice], (state) => state);
export const selectNextPage = createSelector([selectSlice], (state) => ({
  key: state.key,
  start: state.start,
  end: state.end,
}));
