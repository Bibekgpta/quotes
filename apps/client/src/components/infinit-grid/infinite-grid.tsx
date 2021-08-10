/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AutoSizer, Masonry } from 'react-virtualized';
import { AnyObject } from '../infinite-table';
import {
  GridItem,
  InfinitGridStaticState,
  initStaticState,
  onResize,
  resetAll,
} from './helper';
import { MasnoryGrid } from './masonary';

interface InfinitGridProps {
  items?: AnyObject[];
  loadMore?: null | (() => void);
  cellRenderer?: (value: unknown, item: unknown, key: string) => JSX.Element;
}

export const InfinitGrid = memo(
  ({ items = [], loadMore, cellRenderer }: InfinitGridProps) => {
    const staticState = useRef<InfinitGridStaticState>();
    const masonryRef = useRef<React.ReactNode>();
    const countRef = useRef<number>(items.length);
    const [aa, setA] = useState(false);

    useEffect(() => {
      resetAll(
        staticState as React.MutableRefObject<InfinitGridStaticState>,
        masonryRef as React.MutableRefObject<Masonry>
      );
      setA(false);
    }, [aa]);

    if (countRef.current !== items.length) {
      countRef.current = items.length;
      staticState.current = undefined;
      setA(true);
    }

    const setMasonryRef = useCallback(
      (ref: React.ReactNode) => (masonryRef.current = ref),
      []
    );
    const callLo = useCallback(() => loadMore && loadMore(), [loadMore]);

    const calloncellRenderer = useCallback(
      (value: unknown, item: unknown, key: string) =>
        cellRenderer && cellRenderer(value, item, key),
      []
    );
    return (
      <AutoSizer
        onResize={onResize(
          staticState as React.MutableRefObject<InfinitGridStaticState>,
          masonryRef as React.MutableRefObject<Masonry>
        )}
      >
        {({ width, height }) => {
          if (width) {
            staticState.current = staticState.current || initStaticState(width);
          }
          if (!staticState.current || aa) {
            return <span>loading...</span>;
          }
          return (
            <MasnoryGrid
              height={height}
              width={width}
              setRef={setMasonryRef}
              items={items}
              staticState={
                staticState.current || ({} as InfinitGridStaticState)
              }
              loadMore={callLo}
              cellRenderer={calloncellRenderer as any}
            />
          );
        }}
      </AutoSizer>
    );
  }
);
