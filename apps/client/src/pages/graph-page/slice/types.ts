import { IQuote } from '../../quotesPage/slice/types';

export interface GraphState {
  quotes: IQuote[];
  loading: boolean;
  key: string;
  start: Date;
  end: Date;
  symbol: string;
}
