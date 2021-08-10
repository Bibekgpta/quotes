/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useRef } from 'react';
import { Table, AutoSizer, Column, IndexRange } from 'react-virtualized';
import { useStyles } from './style';
import { HeaderCellRenderer, CellRenderer } from './cell';
import { AnyObject, ICololumnConfig } from './type';

interface InfiniteTableProps {
  items: AnyObject[];
  rowHeight?: number;
  columns: ICololumnConfig[];
  loadMore?: null | (() => void);
}

export const InfiniteTable = memo(
  ({ items, rowHeight = 50, loadMore, columns }: InfiniteTableProps) => {
    const classes = useStyles();

    const moreRef = useRef<{ more: boolean; count: number }>({
      more: !!loadMore,
      count: items.length,
    });
    moreRef.current =
      items.length !== moreRef.current.count
        ? { more: !!loadMore, count: items.length }
        : moreRef.current;

    const checkForMore = ({ stopIndex }: IndexRange) => {
      if (!moreRef.current.more || !loadMore || !items.length) return;
      const requestLoadMore = items.length - stopIndex < 10;
      if (requestLoadMore) {
        moreRef.current.more = false;
        loadMore();
      }
    };

    const headerRenderer = (column: ICololumnConfig) => {
      const { isNumeric } = column;
      return <HeaderCellRenderer column={column} />;
    };
    const cellRenderer = (column: ICololumnConfig, item: AnyObject) => {
      return <CellRenderer column={column} item={item} />;
    };
    return (
      <AutoSizer>
        {({ width, height }) => (
          <Table
            headerHeight={rowHeight}
            width={width}
            height={height}
            className={classes.table}
            rowHeight={rowHeight}
            rowCount={items.length}
            rowGetter={({ index }) => items[index]}
            onRowsRendered={checkForMore}
          >
            {columns.map(({ key, ...other }, index) => {
              return (
                <Column
                  key={key}
                  headerRenderer={() => headerRenderer(columns[index])}
                  cellRenderer={({ columnIndex, rowData }) =>
                    cellRenderer(columns[columnIndex], rowData)
                  }
                  dataKey={key as string}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
);
