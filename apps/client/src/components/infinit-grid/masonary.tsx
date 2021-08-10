import React, { memo, useCallback, useRef } from 'react';
import { IndexRange, Masonry } from 'react-virtualized';
import { AnyObject } from '../infinite-table';
import { GridCell } from './cell';
import { GridItem, InfinitGridStaticState } from './helper';
import { useMasnoryGridStyles } from './style';

interface MasnoryGridProp {
  items: AnyObject[];
  height: number;
  setRef: (node: React.ReactNode) => void;
  width: number;
  staticState: InfinitGridStaticState;
  loadMore?: null | (() => void);
  cellRenderer?: (value: unknown, item: unknown, key: string) => JSX.Element;
}
export const MasnoryGrid = memo(
  ({
    items,
    height,
    width,
    setRef,
    staticState,
    cellRenderer,
    loadMore,
  }: MasnoryGridProp) => {
    const classes = useMasnoryGridStyles();
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
      const requestLoadMore =
        items.length - stopIndex < staticState.columnCount * 2;
      if (requestLoadMore) {
        moreRef.current.more = false;
        loadMore();
      }
    };
    const geridCellRenderer = useCallback(
      ({ index, parent, style }) => {
        return (
          <GridCell
            key={items[index] ? items[index].id : index}
            item={items[index]}
            cache={staticState.cache}
            index={index}
            parent={parent}
            cellRenderer={cellRenderer}
            style={style}
          />
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [cellRenderer, items, staticState.cache]
    );

    return (
      <Masonry
        className={classes.root}
        autoHeight={false}
        cellCount={items.length}
        cellMeasurerCache={staticState.cache}
        cellPositioner={staticState.cellPositioner}
        onCellsRendered={checkForMore}
        cellRenderer={geridCellRenderer}
        height={height}
        ref={setRef}
        width={width}
        keyMapper={(index) => items[index].id}
      />
    );
  }
);
