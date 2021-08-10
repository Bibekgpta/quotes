import { createSlice } from '../../../utils/@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import { graphSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { GraphState } from './types';
import { IQuote } from '../../quotesPage/slice/types';
import { IFilter } from '../../../components';

export const initialState: GraphState = {
  quotes: [],
  key: '',
  loading: false,
  end: new Date(),
  start: new Date(2021, 5, 1),
  symbol: 'adjClose',
};

const slice = createSlice({
  name: 'graphState',
  initialState,
  reducers: {
    setKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    loadData(state) {
      state.loading = true;
    },
    dataLoaded(
      state,
      action: PayloadAction<{ total: number; items: IQuote[] }>
    ) {
      state.loading = true;
      state.quotes = action.payload.items;
    },
    setFilter(state, action: PayloadAction<IFilter>) {
      state.start = action.payload.start;
      state.end = action.payload.end;
      state.symbol = action.payload.symbol as string;
    },
  },
});

export const { actions: graphActions } = slice;

export const useGraphSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: graphSaga });
  return { actions: slice.actions };
};
