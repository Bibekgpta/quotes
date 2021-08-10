import React, { memo } from 'react';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';
import { AnyObject } from '../infinite-table/type';
import { useMasnoryGridStyles } from './style';
import { format } from 'date-fns';

interface GridCellProp {
  cache: CellMeasurerCache;
  index: number;
  parent: MeasuredCellParent;
  item: AnyObject;
  style?: React.CSSProperties;
  cellRenderer?: (value: unknown, item: unknown, key: string) => JSX.Element;
}
export const GridCell = memo(
  ({ cache, index, parent, item, style, cellRenderer }: GridCellProp) => {
    const classes = useMasnoryGridStyles();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      <CellMeasurer
        cache={cache}
        index={index}
        key={item.id as string}
        parent={parent}
      >
        <div style={style} className={classes.cell}>
          <div style={{ color: 'grey' }}>
            {format(new Date(item.date as string), 'MMM dd, yyyy')}
          </div>
          <div>
            <div>Open: {item.open}</div>
            <div>High: {item.high}</div>
            <div>Low: {item.low}</div>
            <div>Close: {item.close}</div>
            <div>Adj Close: {item.adjClose}</div>
            <div>Volume: {item.volume}</div>
          </div>
        </div>
      </CellMeasurer>
    );
  }
);
