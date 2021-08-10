import { FilterBar, Graph } from '../../components';
import { useGraphSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectGraphState } from './slice/selectors';
import { memo, useEffect } from 'react';

interface GrapePageProps {
  secret: string;
}
export const GraphPage = memo(({ secret }: GrapePageProps) => {
  const { actions } = useGraphSlice();
  const dispatch = useDispatch();
  const state = useSelector(selectGraphState);
  useEffect(() => {
    if (secret) {
      dispatch(actions.setKey(secret));
      dispatch(actions.loadData());
    }
  }, [actions, dispatch, secret]);
  return (
    <>
      <FilterBar
        showSymbol
        start={state.start}
        end={state.end}
        symbol={state.symbol}
        disabled={!state.key}
        onChange={(filter) => {
          dispatch(actions.setFilter(filter));
          dispatch(actions.loadData());
        }}
      />
      {state.quotes.length && (
        <Graph
          data={state.quotes}
          symbol={state.symbol}
          minDate={state.start}
        />
      )}
    </>
  );
});

export default GraphPage;
