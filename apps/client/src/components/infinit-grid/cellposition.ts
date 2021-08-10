/** @flow */
import type { CellMeasurerCache, Positioner } from 'react-virtualized';
import { containerMargin } from './helper';

type createCellPositionerParams = {
  cellMeasurerCache: CellMeasurerCache;
  columnCount: number;
  columnWidth: number;
  spacer?: number;
  containerWidth: number;
};

type resetParams = {
  columnCount: number;
  columnWidth: number;
  spacer?: number;
  containerWidth?: number;
};

export default function createCellPositioner({
  cellMeasurerCache,
  columnCount,
  columnWidth,
  spacer = 20,
  containerWidth,
}: createCellPositionerParams): Positioner {
  let columnHeights: number[] = [];

  initOrResetDerivedValues();
  function cellPositioner(index: number) {
    const normalization = (containerWidth - 2 * containerMargin - columnCount * (columnWidth + spacer)) / (columnCount - 1);
    let columnIndex = 0;
    for (let i = 1; i < columnHeights.length; i++) {
      if (columnHeights[i] < columnHeights[columnIndex]) {
        columnIndex = i;
      }
    }
    let left = columnIndex * (columnWidth + spacer) + (columnIndex === 0 ? containerMargin : 0);
    left += columnIndex * normalization;
    let top = columnHeights[columnIndex] || 0;
    top += containerMargin;
    columnHeights[columnIndex] = top + cellMeasurerCache.getHeight(index, columnIndex) + spacer;

    return {
      left,
      top,
    };
  }

  function initOrResetDerivedValues(): void {
    // Track the height of each column.
    // Layout algorithm below always inserts into the shortest column.
    columnHeights = [];
    for (let i = 0; i < columnCount; i++) {
      columnHeights[i] = 0;
    }
  }

  function reset(params: resetParams): void {
    columnCount = params.columnCount;
    columnWidth = params.columnWidth;
    spacer = params.spacer as number;
    containerWidth = params.containerWidth as number;
    initOrResetDerivedValues();
  }

  cellPositioner.reset = reset;

  return cellPositioner;
}
