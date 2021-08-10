import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state ? state.quoteState || initialState : initialState;

export const selectQuoteState = createSelector([selectSlice], (state) => state);
export const selectNextPage = createSelector([selectSlice], (state) => ({
  page: state.page,
  pageSize: state.pageSize,
  key: state.key,
  start: state.start,
  end: state.end,
}));
