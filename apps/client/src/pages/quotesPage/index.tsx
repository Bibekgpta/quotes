import {
  SearchBar,
  InfinitGrid,
  InfiniteTable,
  AnyObject,
  FilterBar,
  IFilter,
} from '../../components';
import { useQuoteSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuoteState } from './slice/selectors';
import { makeStyles, Typography } from '@material-ui/core';
import { GraphPage } from '../graph-page';
import { quotesCulumns } from './column.config';
import ToolBarProps from './toolbar';
const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  toolbar: {
    position: 'absolute',
    right: theme.spacing(2),
    top: -50,
    display: 'flex',
  },
}));

export function Quotes() {
  const { actions } = useQuoteSlice();
  const dispatch = useDispatch();
  const state = useSelector(selectQuoteState);
  const classes = useStyles();

  const filterChangeHandler = (filter: IFilter) => {
    dispatch(actions.setFilters(filter));
  };

  return (
    <>
      <SearchBar
        keys={state.keys}
        onChange={(term) => dispatch(actions.loadkey(term))}
        onSearch={(secret) => dispatch(actions.loadData(secret))}
      />
      <GraphPage secret={state.key} />
      <FilterBar
        start={state.start}
        end={state.end}
        onChange={filterChangeHandler}
      />

      <div className={classes.table}>
        <ToolBarProps
          className={classes.toolbar}
          page={state.page}
          pageSize={state.pageSize}
          count={state.total}
          grid={state.showGrid}
          pagination={state.showPagination}
          onGridChange={(event) => dispatch(actions.setGrid(event))}
          onPaginationChange={(event) => dispatch(actions.setPagination(event))}
          onPageChange={(event) => dispatch(actions.setPage(event))}
          onRowsPerPageChange={(event) => dispatch(actions.setPageSize(event))}
        />
        {state.showGrid ? (
          <InfinitGrid
            items={state.quotes as AnyObject[]}
            loadMore={state.hasMore ? () => dispatch(actions.loadMore()) : null}
          />
        ) : (
          <InfiniteTable
            items={state.quotes as AnyObject[]}
            loadMore={state.hasMore ? () => dispatch(actions.loadMore()) : null}
            rowHeight={50}
            columns={quotesCulumns}
          />
        )}
      </div>
    </>
  );
}

export default Quotes;
