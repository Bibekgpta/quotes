import { GraphState } from '../pages/graph-page/slice/types';
import { QuoteState } from '../pages/quotesPage/slice/types';

export interface RootState {
  quoteState: QuoteState;
  graphState: GraphState;
}
