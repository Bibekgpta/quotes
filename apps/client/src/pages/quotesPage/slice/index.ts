import { createSlice } from '../../../utils/@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import { quoteSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { IQuote, QuoteState } from './types';
import { IFilter } from '../../../components';

export const initialState: QuoteState = {
  quotes: [],
  page: 0,
  pageSize: 25,
  key: '',
  total: 0,
  hasMore: true,
  loading: false,
  keys: [],
  end: new Date(),
  start: new Date(2021, 5, 1),
  showGrid: false,
  showPagination: false,
};

const slice = createSlice({
  name: 'quoteState',
  initialState,
  reducers: {
    loadkey(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    keysLoaded(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.keys = action.payload;
    },
    loadData(state, action: PayloadAction<string>) {
      state.loading = true;
      state.key = action.payload;
    },
    dataLoaded(
      state,
      action: PayloadAction<{ total: number; items: IQuote[] }>
    ) {
      state.loading = false;
      state.quotes = action.payload.items;
      state.total = action.payload.total;
    },
    loadMore(state) {
      state.loading = true;
      state.page += 1;
    },
    moreLoaded(
      state,
      action: PayloadAction<{ total: number; items: IQuote[] }>
    ) {
      state.loading = false;
      state.quotes = state.quotes.concat(action.payload.items);
      state.hasMore = action.payload.items.length > 0;
    },

    setGrid(state, action: PayloadAction<boolean>) {
      state.showGrid = action.payload;
    },

    setPagination(state, action: PayloadAction<boolean>) {
      state.showPagination = action.payload;
      state.page = 0;
      state.hasMore = !action.payload;
    },

    setPage(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.page = action.payload;
    },

    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.page = 0;
    },

    setFilters(state, action: PayloadAction<IFilter>) {
      state.start = action.payload.start;
      state.end = action.payload.end;
      state.page = 0;
    },
  },
});

export const { actions: quoteActions } = slice;

export const useQuoteSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: quoteSaga });
  return { actions: slice.actions };
};
