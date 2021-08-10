export interface IQuote {
  id: string;
  key: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}

export interface QuoteState {
  quotes: IQuote[];
  total: number;
  hasMore: boolean;
  loading: boolean;
  page: number;
  pageSize: number;
  key: string;
  keys: string[];
  start: Date;
  end: Date;
  showGrid: boolean;
  showPagination: boolean;
}
